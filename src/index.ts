import * as noble from '@abandonware/noble';
import { Peripheral, Service } from '@abandonware/noble';
import { config } from './config';
import { Device } from './Device';
import { DeviceConfig } from './types/Device';

export { Device } from './Device';

export async function discoverService(availableServices: Service[], peripheral: Peripheral, _config: DeviceConfig = config) {
  try {
    const service = await Device.findService(availableServices, _config);
    const { read, write } = await Device.findCharacteristics(service, _config);
    const device = new Device(peripheral, read, write, _config);
    return device;
  }
  catch (err) {
    throw new Error(`Error connecting to device. More details: ${err.message}`);
  }
}

export async function connect(_config: DeviceConfig = config): Promise<Device> {
  return new Promise((resolve, reject) => {
    noble.on('stateChange', async (state) => {
      // Check bluetooth is on
      if (state === 'poweredOn') {
        // Timeout of 10s to find device
        Promise.race([
          setTimeout(() => reject(new Error('timeout')), 10000),
          await noble.startScanningAsync([config.serviceUUID], false),
        ]);
      } else {
        throw new Error('Bluetooth not poweredOn');
      }
    });
    noble.on('discover', async (peripheral: Peripheral) => {
      try {  
        await noble.stopScanningAsync();
        await peripheral.connectAsync();
        const foundServices = await peripheral.discoverServicesAsync();
        if (!foundServices || !foundServices.length) {
          throw new Error('No services discovered');
        }
        const anova = await discoverService(foundServices, peripheral, _config);
        resolve(anova);
      }
      catch (err) {
        reject(err);
      }
    });
  })
}