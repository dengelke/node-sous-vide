import noble from '@abandonware/noble';
import { config } from './config';
import { Device } from './types/Device';

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    await noble.startScanningAsync([config.serviceUUID], false);
  }
});

noble.on('discover', async (peripheral: noble.Peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const foundServices = await peripheral.discoverServicesAsync();
    if (!foundServices || !foundServices.length) {
      throw new Error('No services discovered');
    }
    const service = await Device.findService(foundServices, config);
    const { read, write } = await Device.findCharacteristics(service, config);
    const anova = new Device(read, write, config);

    const response = await anova.getCookerStatus();
    console.log({response})
    const temp = await anova.getTargetTemperate();
    console.log({ temp })
    await peripheral.disconnectAsync();
    process.exit(0)

});