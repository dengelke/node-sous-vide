import * as noble from '@abandonware/noble';
import * as assert from 'assert';
import { discoverService } from '../src/index';
import { config } from '../src/config';

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    await noble.startScanningAsync([config.serviceUUID], false);
  }
}); 

noble.on('discover', async (peripheral: noble.Peripheral) => {
  try {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const foundServices = await peripheral.discoverServicesAsync();
    if (!foundServices || !foundServices.length) {
      throw new Error('No services discovered');
    }
    const anova = await discoverService(foundServices);
    await anova.setTargetTemperature(75);
    const temp = await anova.getTargetTemperature();
    assert.strictEqual(temp, 75);
  }
  catch (err) {
    console.error(err);
  }
  finally {
    await peripheral.disconnectAsync();
    process.exit(0);
  }
});