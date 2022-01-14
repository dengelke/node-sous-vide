import { Characteristic, Peripheral, Service } from "@abandonware/noble";
import PQueue from 'p-queue';

import { sendDeviceCommand } from "./sendDeviceCommand";
import { DeviceConfig, IDevice } from "./types/Device";
import { SensorType, SensorValue, SensorValueList, UnitType } from "./proto/messages";
import { ReadCommandType, WriteCommandType } from "./types/Command";

// Create a 1 concurrency queue
const queue = new PQueue({concurrency: 1});

export class Device implements IDevice {
  config: DeviceConfig;
  peripheral: Peripheral;
  read: Characteristic;
  write: Characteristic;

  constructor(peripheral: Peripheral, read: Characteristic, write: Characteristic, config: DeviceConfig) {
    this.config = config;
    this.peripheral = peripheral;
    this.read = read;
    this.write = write;
  }

  static async findCharacteristics(service: Service, config: DeviceConfig) {
    const characteristics = await service.discoverCharacteristicsAsync();
    const write = characteristics.find(c => c.uuid === config.txCharacteristicUUID);
    const read = characteristics.find(c => c.uuid === config.rxCharacteristicUUID);
    if (!read || !write) {
      throw new Error('Missing read or write channels');
    }
    return { read, write };
  }

  static async findService(services: Service[], config: DeviceConfig) {
    const service = services.find(s => s.uuid === config.serviceUUID);
    if (!service) {
      throw new Error(`Service ${config.serviceUUID} was not found`);
    }
    return service;
  }
  // disconnect cooker
  async disconnect() {
    await this.peripheral.disconnectAsync();
  }
  // start the cooker
  async start() {
    return this.sendDeviceCommand(ReadCommandType.Start);
  }
  // stop the cooker
  async stop() {
    return this.sendDeviceCommand(ReadCommandType.Stop);
  }

  _getSensorValue(sensorValue: SensorValueList, sensorType: SensorType): SensorValue | undefined {
    // @ts-ignore
    return sensorValue.values.find((t: any) => t.sensorType === sensorType);
  }

  // get cooker status
  async getCookerStatus() {
      const response: SensorValueList = await this.sendDeviceCommand(ReadCommandType.GetSensorValues);
    
      // Get Boolean Values
      const isWaterLow = Boolean(this._getSensorValue(response, SensorType.WaterLow).value);
      const isWaterLeak = Boolean(this._getSensorValue(response, SensorType.WaterLeak).value);

      // Get Water Temp and Units
      const waterTempObject = this._getSensorValue(response, SensorType.WaterTemp);
      const waterTemp = waterTempObject.value / this.config.temperatureScale;
      const waterTempUnits = waterTempObject.units === UnitType.DEGREES_POINT_01C ? 'C' : 'F';

      // Get Heater Temp and Units
      const heaterTempObject = this._getSensorValue(response, SensorType.HeaterTemp);
      const heaterTemp = heaterTempObject.value;
      const heaterTempUnits = heaterTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Triac Temp and Units
      const triacTempObject = this._getSensorValue(response, SensorType.TriacTemp);
      const triacTemp = triacTempObject.value;
      const triacTempUnits = triacTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Internal Temp and Units
      const internalTempObject = this._getSensorValue(response, SensorType.InternalTemp);
      const internalTemp = internalTempObject.value;
      const internalTempUnits = internalTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Motor Speed
      const motorSpeed = Number(this._getSensorValue(response, SensorType.MotorSpeed).value);
      const isCooking = motorSpeed > 0;

      return {
        isCooking,
        isWaterLeak,
        isWaterLow,
        heaterTemp,
        heaterTempUnits,
        internalTemp,
        internalTempUnits,
        triacTemp,
        triacTempUnits,
        waterTemp,
        waterTempUnits,
        motorSpeed
      };
  }

  // get target temperature in degrees C or F
  async getTargetTemperature() {
    const targetTemperature = await this.sendDeviceCommand(ReadCommandType.ReadTargetTemp);
      return (targetTemperature.value / this.config.targetTemperatureScale)
  }
  // get temperature unit 'C' or 'F'
  async getTemperatureUnit() {
    const response = await this.sendDeviceCommand(ReadCommandType.ReadUnit);;
    return response.value === UnitType.DEGREES_POINT_1C ? 'C' : 'F';
  }
  // get timer in minutes
  async getTimer() {
    return this.sendDeviceCommand(ReadCommandType.ReadTimer);
  }
  // get firmware tagId
  async getFirmwareInfo() {
      return (await this.sendDeviceCommand(ReadCommandType.GetFirmwareInfo)).tagId
  }
  // set temperature unit 'C' or 'F'
  async setTemperatureUnit(unit: 'C' | 'F') {
      return this.sendDeviceCommand(WriteCommandType.SetUnit, unit)
  }
  // set temperature in degrees C or F
  async setTargetTemperature(temperature: number) {
      return this.sendDeviceCommand(WriteCommandType.SetTemp, temperature)
  }
  // set timer in minutes
  async setTimer(timer: number) {
      return this.sendDeviceCommand(WriteCommandType.SetTimer, timer)
  }

  async sendDeviceCommand(command: ReadCommandType)
  async sendDeviceCommand(command: WriteCommandType, value: number | string)
  async sendDeviceCommand(command: ReadCommandType | WriteCommandType, value?: number | string) {
    // todo: refactor this
    return queue.add(() => sendDeviceCommand(this.write, this.read, command, value));
  }


}