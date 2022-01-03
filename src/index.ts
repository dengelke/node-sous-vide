import { Service } from '@abandonware/noble';
import { config } from './config';
import { Device } from './Device';
import { DeviceConfig } from './types/Device';

export { Device } from './Device';
export async function discoverService(availableServices: Service[], _config: DeviceConfig = config) {
  try {
    const service = await Device.findService(availableServices, config);
    const { read, write } = await Device.findCharacteristics(service, config);
    const device = new Device(read, write, config);
    return device;
  }
  catch (err) {
    throw new Error(`Error connecting to device. More details: ${err.message}`);
  }
}

