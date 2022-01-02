const slicedToArray = require('@babel/runtime/helpers/slicedToArray');

const module565 = require('./android-js/565');

exports.sendDeviceCommand = async function (txCharacteristic, rxCharacteristic, command) {
  slicedArray = slicedToArray.default(command, 3);
  commandArray = slicedArray[0];
  handles = slicedArray[1];

  const data = await new Promise((resolve, reject) => {
    // Each time data arrives push onto result
    const getData = () => {
      let result = [];
      return data => {
        // Push received data onto result
        result.push(...data);
        // Wait for more date if result array contains undefined
        if (module565(result).includes(undefined)) {
          return
        } else {
          // Remove data listener
          rxCharacteristic.removeListener('data', getData);
          // Convert result into array format used by application logic
          resolve(module565(result));
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
      return handles.decode(data);
    } catch (error) {
      console.log('error while decoding protobuf message', error);
    }
  } else {
    return 'blank response - as expected';
  }
}