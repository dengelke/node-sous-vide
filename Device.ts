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
      console.log({response})
      return response;
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
      const response = await this.sendDeviceCommand(commands.READ_TIMER);
      return response;
  }
  async getFirmwareInfo() {
      return this.sendDeviceCommand(commands.GET_FIRMWARE_INFO)
  }
  async setTemperatureUnit(unit: string) {
      return this.sendDeviceCommand(commands.SET_UNIT(unit))
  }
  async setTargetTemperature(unit: number) {
      return this.sendDeviceCommand(commands.SET_TEMP(unit))
  }
  async setTimer(timer: number) {
      return this.sendDeviceCommand(commands.SET_TIMER(timer))
  }

  async sendDeviceCommand(command: any[]) {
    // todo: refactor this
    return sendDeviceCommand(this.write, this.read, command);
  }


}