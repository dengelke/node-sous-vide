import { Characteristic, Service } from "@abandonware/noble";
import { sendDeviceCommand } from "./sendDeviceCommand";
import { DeviceConfig, IDevice } from "./types/Device";
import { SensorType, SensorValue, SensorValuesResponse, UnitType } from "./types/Sensor";
import { CommandType, ReadCommandType, WriteCommandType } from "./types/Command";
// TODO: remove
// const commands = require('../android-js/541').COMMANDS;

export class Device implements IDevice {
  config: DeviceConfig;
  read: Characteristic;
  write: Characteristic;

  constructor(read: Characteristic, write: Characteristic, config: DeviceConfig) {
    this.config = config;
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
  // start the cooker
  async start() {
    return this.sendDeviceCommand(ReadCommandType.Start);
  }
  // stop the cooker
  async stop() {
    return this.sendDeviceCommand(ReadCommandType.Stop);
  }

  _getSensorValue(sensorValues: SensorValue[], sensorType: SensorType): SensorValue | undefined {
    return sensorValues.find((t: any) => t.sensorType === sensorType);
  }

  // get cooker status
  async getCookerStatus() {
      const response: SensorValuesResponse = await this.sendDeviceCommand(ReadCommandType.GetSensorValues);
    
      // Get Boolean Values
      const isWaterLow = Boolean(this._getSensorValue(response.values, SensorType.WaterLow).value);
      const isWaterLeak = Boolean(this._getSensorValue(response.values, SensorType.WaterLeak).value);

      // Get Water Temp and Units
      const waterTempObject = this._getSensorValue(response.values, SensorType.WaterTemp);
      const waterTemp = waterTempObject.value / this.config.temperatureScale;
      const waterTempUnits = waterTempObject.units === UnitType.DEGREES_POINT_01C ? 'C' : 'F';

      // Get Heater Temp and Units
      const heaterTempObject = this._getSensorValue(response.values, SensorType.HeaterTemp);
      const heaterTemp = heaterTempObject.value;
      const heaterTempUnits = heaterTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Triac Temp and Units
      const triacTempObject = this._getSensorValue(response.values, SensorType.TriacTemp);
      const triacTemp = triacTempObject.value;
      const triacTempUnits = triacTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Internal Temp and Units
      const internalTempObject = this._getSensorValue(response.values, SensorType.InternalTemp);
      const internalTemp = internalTempObject.value;
      const internalTempUnits = internalTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Motor Speed
      const motorSpeed = Number(this._getSensorValue(response.values, SensorType.MotorSpeed).value);
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
  async setTemperatureUnit(unit: string) {
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
    return sendDeviceCommand(this.write, this.read, command, value);
  }


}