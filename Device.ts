import { Characteristic, Service } from "@abandonware/noble";
import { sendDeviceCommand } from "./sendDeviceCommand";
import { DeviceConfig, IDevice } from "./types/Device";

// TODO: remove
const commands = require('./android-js/541').COMMANDS;
const module544 = require('./android-js/544');
const UnitType = module544.default.UnitType;

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

  async start() {
    return this.sendDeviceCommand(commands.START);
  }
  async stop() {
      return this.sendDeviceCommand(commands.STOP);
  }
  async getCookerStatus() {
      const response = await this.sendDeviceCommand(commands.GET_SENSORS_VALUES);
      // Get Boolean Values
      const isWaterLow = response.values.find((t: any) => t.sensorType === module544.SensorValue.SensorType.WaterLow).value === 1;
      const isWaterLeak = response.values.find((t: any) => t.sensorType === module544.SensorValue.SensorType.WaterLeak).value === 1;

      // Get Water Temp and Units
      const waterTempObject = response.values.find((t: any) => t.sensorType === module544.SensorValue.SensorType.WaterTemp);
      const waterTemp = waterTempObject.value / this.config.temperatureScale;
      const waterTempUnits = waterTempObject.units === UnitType.DEGREES_POINT_01C ? 'C' : 'F';

      // Get Heater Temp and Units
      const heaterTempObject = response.values.find((t: any) => t.sensorType === module544.SensorValue.SensorType.HeaterTemp);
      const heaterTemp = heaterTempObject.value;
      const heaterTempUnits = heaterTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Triac Temp and Units
      const triacTempObject = response.values.find((t: any) => t.sensorType === module544.SensorValue.SensorType.TriacTemp);
      const triacTemp = triacTempObject.value;
      const triacTempUnits = triacTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Internal Temp and Units
      const internalTempObject = response.values.find((t: any) => t.sensorType === module544.SensorValue.SensorType.InternalTemp);
      const internalTemp = internalTempObject.value;
      const internalTempUnits = internalTempObject.units === UnitType.DEGREES_C ? 'C' : 'F';

      // Get Motor Speed
      const motorSpeed = response.values.find((t: any) => t.sensorType === module544.SensorValue.SensorType.MotorSpeed).value;
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
  async getTargetTemperate() {
      const targetTemperature = await this.sendDeviceCommand(commands.READ_TARGET_TEMP);
      return (targetTemperature.value / this.config.targetTemperatureScale)
  }
  async getTemperateUnit() {
    const response = await this.sendDeviceCommand(commands.READ_UNIT);
    return response.value === UnitType.DEGREES_POINT_1C ? 'C' : 'F';
  }
  async getTimer() {
    return this.sendDeviceCommand(commands.READ_TIMER);
  }
  async getFirmwareInfo() {
      return this.sendDeviceCommand(commands.GET_FIRMWARE_INFO)
  }
  async setTemperatureUnit(unit: string) {
      return this.sendDeviceCommand(commands.SET_UNIT(unit))
  }
  async setTargetTemperature(temperature: number) {
      return this.sendDeviceCommand(commands.SET_TEMP(temperature))
  }
  async setTimer(timer: number) {
      return this.sendDeviceCommand(commands.SET_TIMER(timer))
  }

  async sendDeviceCommand(command: any[]) {
    // todo: refactor this
    return sendDeviceCommand(this.write, this.read, command);
  }


}