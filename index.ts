import noble from '@abandonware/noble';
import { sendCommand } from './commands';

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    await noble.startScanningAsync(['0e140000-0af1-4582-a242-773e63054c68'], false);
  }
});

noble.on('discover', async (peripheral: noble.Peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const foundServices = await peripheral.discoverServicesAsync();
    const service = foundServices[0];
    const characteristics = await service.discoverCharacteristicsAsync();

    // TODO look for Characteristic from config values
    // const txCharacteristicUUID = characteristics[0]; // use txCharacteristicUUID
    // const rxCharacteristicUUID = characteristics[1]; // use txCharacteristicUUID

    // const response = await sendDeviceCommand(characteristics[0], characteristics[1], commands.READ_TARGET_TEMP);
    const anova = sendCommand(characteristics[0], characteristics[1]);
    console.log(anova)
    const response = await anova.getCookerStatus();
    console.log({response})
    const temp = await anova.getTargetTemperate();
    console.log({ temp })
    await peripheral.disconnectAsync();
    process.exit(0)

});