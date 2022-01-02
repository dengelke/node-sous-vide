import { ConfigDomainMessageType, DomainType } from "../../types/Sensor";

//todo: refactor
const encodeCommand = function (buffer: Buffer, I: boolean) {
  const T = [0];
  let lastValue = 0;
  let currentIndex = 1;

  function resetIndex(isEnd: boolean) {
    T[lastValue] = currentIndex;
    lastValue = T.length;
    if (isEnd === true) {
      T.push(0);
    }
    currentIndex = 1;
  }

  for (let u = 0; u < buffer.length; u += 1) {
    buffer[u] === 0 ? resetIndex(true) : (T.push(buffer[u]), (currentIndex += 1) === 255 && resetIndex(true));
  }

  resetIndex(false);
  if (I) {
    T.push(0);
  }
  return Buffer.from(T);
};

//todo: refactor
export function createCommandArray(messageType: ConfigDomainMessageType, value: any = null): number[] {
  const command: number[] = [DomainType.ANOVA_DOMAIN_ID_CONFIG, messageType];
  if (value) {
    command.push(...value);
  }
  let commandBuffer = Buffer.from(command);
  commandBuffer = encodeCommand(commandBuffer, true);
  // @ts-ignore
  return [...commandBuffer];
}