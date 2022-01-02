import { Characteristic } from "@abandonware/noble";
import { CommandType } from "./Command";

export type DeviceConfig = {
  serviceUUID: string;
  txCharacteristicUUID: string;
  rxCharacteristicUUID: string;
  asyncCharacteristicUUID: string;
  targetTemperatureScale: number;
  temperatureScale: number;
  sensorTemperatureScale: number;
};

type CookerStatus = {
  isCooking: boolean;
  isWaterLeak: boolean;
  isWaterLow: boolean;
  heaterTemp: any;
  heaterTempUnits: string;
  internalTemp: any;
  internalTempUnits: string;
  triacTemp: any;
  triacTempUnits: string;
  waterTemp: number;
  waterTempUnits: string;
  motorSpeed: any;
}

export interface IDevice {
  config: DeviceConfig;
  read: Characteristic;
  write: Characteristic;

  start(): Promise<void>;
  stop(): Promise<void>;
  getCookerStatus(): Promise<any>;
  getTargetTemperature(): Promise<any>;
  getTemperatureUnit(): Promise<any>;
  getTimer(): Promise<any>;
  getFirmwareInfo(): Promise<any>;
  setTemperatureUnit(unit: string): Promise<any>;
  setTargetTemperature(unit: number): Promise<any>;
  setTimer(timer: number): Promise<any>;
  sendDeviceCommand(command: CommandType, value?: number | string): Promise<any>;
}
