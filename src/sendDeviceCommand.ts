import { Characteristic } from '@abandonware/noble';
import { CommandsMap } from './Command';
import { CommandConfig, ReadCommandType, WriteCommandType } from './types/Command';
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

function getCommandInfo(commandConfig: CommandConfig, value?: string | number) {
  if ('instruction' in commandConfig) {
    // read instruction
    return {
      commandArray: commandConfig.instruction,
      handles: commandConfig.handler,
    }
  }
  else {
    // set instruction
    return {
      commandArray: commandConfig.setInstructions(value),
      handles: undefined,
    };
  }
}

export async function sendDeviceCommand(write: Characteristic, read: Characteristic, command: ReadCommandType | WriteCommandType, value?: number | string) {
  let commandConfig = CommandsMap.get(command);
  let { commandArray, handles } = getCommandInfo(commandConfig, value);
  
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