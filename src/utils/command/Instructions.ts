import { ConfigDomainMessageType, DomainType } from "../../types/Sensor";

//todo: refactor
const l = function (buffer: Buffer, I: boolean) {
  const T = [0];
  let E = 0;
  let O = 1;

  function N(bool: boolean) {
    T[E] = O;
    E = T.length;
    if (bool === true) {
      T.push(0);
    }
    O = 1;
  }

  for (let u = 0; u < buffer.length; u += 1) {
    buffer[u] === 0 ? N(true) : (T.push(buffer[u]), (O += 1) === 255 && N(true));
  }

  N(false);
  if (I) {
    T.push(0);
  }
  return Buffer.from(T);
};

//todo: refactor
export function createCommandArray(domainType: DomainType, messageType: ConfigDomainMessageType, value: any): number[] {
  let O;
  let numbers: number[] = [domainType, messageType];
  if (value) {
    numbers = (O = numbers).concat.apply(O, [...value]);
  }
  let u = Buffer.from(numbers);
  u = l(u, true);
  // @ts-ignore
  numbers = [...u];
  return numbers;
}