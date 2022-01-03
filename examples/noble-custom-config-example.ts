import * as noble from '@abandonware/noble';
import * as assert from 'assert';
import { discoverService } from '../src/index';
import { DeviceConfig } from '../src/types/Device';

const customConfig: DeviceConfig = {
  serviceUUID: 'serviceUUID',
  txCharacteristicUUID: 'txCharacteristicUUID',
  rxCharacteristicUUID: 'rxCharacteristicUUID',
  asyncCharacteristicUUID: 'asyncCharacteristicUUID',
  targetTemperatureScale: 1,
  temperatureScale: 1,
  sensorTemperatureScale: 1,
};

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    await noble.startScanningAsync([customConfig.serviceUUID], false);
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
    const anova = await discoverService(foundServices, customConfig);
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