import { Characteristic } from '@abandonware/noble';
// import * as slicedToArray from '@babel/runtime/helpers/slicedToArray';

const module565 = require('./android-js/565');

export const sendDeviceCommand = async function (txCharacteristic: Characteristic, rxCharacteristic: Characteristic, command: any[]) {
  // let slicedArray = slicedToArray.default(command, 3);
  // let slicedArray = command.slice();
  let commandArray = command[0];
  let handles = command[1];
  let commandName = command[2];

  const data = await new Promise((resolve, reject) => {
    // Each time data arrives push onto result
    // on(event: "data", listener: (data: Buffer, isNotification: boolean) => void): this;
    const getData = () => {
      let result: number[] = [];
      return (data: Buffer) => {
        // Push received data onto result
        result.push(...data);
        // Wait for more date if result array contains undefined
        if (module565(result).includes(undefined)) {
          return
        } else {
          // Remove data listener
          rxCharacteristic.removeListener('data', getData);
          // Convert result into array format used by application logic
          resolve(module565(result) as any);
        }
      };
    }
    rxCharacteristic.on('data', getData())
    rxCharacteristic.subscribe(error => {
      if (error != null) {
        console.log({ error });
        reject(error);
      }
    });
    txCharacteristic.write(
      Buffer.from(commandArray),
      false,
      error => {
        if (error != null) {
          console.log({ error });
          reject(error);
        }
      }
    );
  })
  if (handles) {
    try {
      console.log('has handles!', commandArray);
      return handles.decode(data);
    } catch (error) {
      console.log('error while decoding protobuf message', error);
    }
  } else {
    return 'blank response - as expected';
  }
}