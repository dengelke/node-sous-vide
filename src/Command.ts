import { config } from "./config";
import { CommandConfig, Commands, CommandType, ReadCommandType, WriteCommandType } from "./types/Command";
import { ConfigDomainMessageType, DomainType, UnitType } from "./types/Sensor";

const { SensorValueList, IntegerValue, FirmwareInfo } = require('../android-js/544');

const commandsArray: Array<[CommandType, CommandConfig]> = [
  [ReadCommandType.Start, { instruction: [1, 2, 10, 0], handler: SensorValueList}],
  [ReadCommandType.Stop, { instruction: [1, 2, 11, 0], handler: SensorValueList}],
  [ReadCommandType.GetSensorValues, { instruction: [1, 2, 5, 0], handler: SensorValueList}],
  [ReadCommandType.ReadTargetTemp, { instruction: [1, 2, 4, 0], handler: IntegerValue }],
  [ReadCommandType.ReadUnit, { instruction: [1, 2, 7, 0], handler: IntegerValue}],
  [ReadCommandType.ReadTimer, { instruction: [1, 2, 18, 0], handler: IntegerValue}],
  [ReadCommandType.GetFirmwareInfo, { instruction: [1, 2, 26, 0], handler: FirmwareInfo}],
  [WriteCommandType.SetUnit, { setInstructions: setUnitInstructions }],
  [WriteCommandType.SetTemp, { setInstructions: setTempInstructions }],
  [WriteCommandType.SetTimer, { setInstructions: setTimerInstructions }],
];

//todo: refactor
const l = function (buffer, I: boolean) {
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
function createCommandArray(domainType: DomainType, messageType: ConfigDomainMessageType, value: any): number[] {
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

function setUnitInstructions(unit: 'c' | 'f') {
  const unitNormalized = unit.toLowerCase() === 'c' ? UnitType.DEGREES_POINT_1C : UnitType.DEGREES_POINT_1F;
  const unitValue = IntegerValue.create({
    value: unitNormalized,
  });
  const unitEncoded = IntegerValue.encode(unitValue).finish();
  return createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.SET_TEMP_UNITS, unitEncoded);
}

function setTempInstructions(temp: number) {
  const tempValue = IntegerValue.create({
    value: temp * config.targetTemperatureScale,
  });
  const tempEncoded = IntegerValue.encode(tempValue).finish();
  return createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.SET_TEMP_SETPOINT, tempEncoded);
}

function setTimerInstructions(timer: number) {
  const timerValue = IntegerValue.create({
    value: timer,
  });
  const timerEncoded = IntegerValue.encode(timerValue).finish();
  return createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.SET_COOKING_TIMER, timerEncoded);
}

export const CommandsMap: Commands = new Map(commandsArray);