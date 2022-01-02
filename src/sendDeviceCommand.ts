import { Characteristic } from '@abandonware/noble';
type RawResponseBuffer = number[];
type ResponseBuffer = Array<number | undefined>;

export const convertBuffer = function (rawData: RawResponseBuffer): ResponseBuffer {
  const results = [];
  // remove last element - why?
  const data = rawData.slice(0, rawData.length - 1);
  let i = 0;
  while (i < data.length - 1) {
    const currentValue = data[i];
    i++;

    for (let k = 1; k < currentValue; k++ ) {
      results.push(data[i]);
      i++;
    }

    if (currentValue < 255 && i < data.length) {
      results.push(0); // looks like a separator between fields
    }
  }
  return results;
};

type ReadHandle = {
  decode: (handle: ResponseBuffer) => any;
}

export const sendDeviceCommand = async function (write: Characteristic, read: Characteristic, command: any[]) {
  let commandArray = command[0];
  let handles: ReadHandle | undefined = command[1];
  let commandName = command[2];

  const data: ResponseBuffer = await new Promise((resolve, reject) => {
    // Each time data arrives push onto result
    const getData = () => {
      let result: RawResponseBuffer = [];
      return (data: Buffer) => {
        // Push received data onto result
        // @ts-ignore
        result.push(...data);
        // Wait for more date if result array contains undefined
        if (convertBuffer(result).includes(undefined)) {
          return
        } else {
          // Remove data listener
          read.removeListener('data', getData);
          // Convert result into array format used by application logic
          resolve(convertBuffer(result));
        }
      };
    }
    read.on('data', getData())
    read.subscribe(error => {
      if (error != null) {
        console.log({ error });
        reject(error);
      }
    });
    write.write(
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