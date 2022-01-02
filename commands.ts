import { Characteristic } from '@abandonware/noble';
import { config } from './config';
import { sendDeviceCommand } from './sendDeviceCommand';


const module544 = require('./android-js/544');
const UnitType = module544.default.UnitType;
const commands = require('./android-js/541').COMMANDS;


export const sendCommand = (txCharacteristic: Characteristic, rxCharacteristic: Characteristic) => ({
    start: async () => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.START)
    },
    stop: async () => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.STOP)
    },
    getCookerStatus: async () => {
        const response = await sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.GET_SENSORS_VALUES);
        console.log({response})
        return response;
    },
    getTargetTemperate: async () => {
        const targetTemperature = await sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.READ_TARGET_TEMP);
        return (targetTemperature.value / config.targetTemperatureScale)
    },
    getTemperateUnit: async () => {
        const response = await sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.READ_UNIT);
        return response.value === UnitType.DEGREES_POINT_1C ? 'C' : 'F';
    },
    getTimer: async () => {
        const response = await sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.READ_TIMER);
        return response;
    },
    getFirmwareInfo: async () => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.GET_FIRMWARE_INFO)
    },
    setTemperatureUnit: async (unit: string) => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.SET_UNIT(unit))
    },
    setTargetTemperature: async (unit: number) => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.SET_TEMP(unit))
    },
    setTimer: async (timer: number) => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.SET_TIMER(timer))
    },
})