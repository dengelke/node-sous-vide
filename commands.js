const commands = require('./android-js/541').COMMANDS;
const { sendDeviceCommand } = require('./sendDeviceCommand');

module.exports = (txCharacteristic, rxCharacteristic) => ({
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
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.READ_TARGET_TEMP)
    },
    getTemperateUnit: async () => {
        const response = await sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.READ_TARGET_TEMP);
        return response;
    },
    getTimer: async () => {
        const response = await sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.READ_TIMER);
        return response;
    },
    getFirmwareInfo: async () => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.GET_FIRMWARE_INFO)
    },
    setTemperatureUnit: async (unit) => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.SET_UNIT(unit))
    },
    setTargetTemperature: async (temperature) => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.SET_TEMP(unit))
    },
    setTimer: async (timer) => {
        return sendDeviceCommand(txCharacteristic, rxCharacteristic, commands.SET_TIMER(timer))
    },
})