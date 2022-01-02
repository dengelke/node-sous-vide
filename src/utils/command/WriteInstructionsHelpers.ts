import { config } from "../../config";
import { ConfigDomainMessageType, UnitType } from "../../types/Sensor";
import { createCommandArray } from "./Instructions";
import { IntegerValue } from "./ReadInstructionsHelpers";

export function setUnitInstructions(unit: 'C' | 'F') {
  const unitNormalized = unit.toLowerCase() === 'c' ? UnitType.DEGREES_POINT_1C : UnitType.DEGREES_POINT_1F;
  const unitValue = IntegerValue.create({
    value: unitNormalized,
  });
  const unitEncoded = IntegerValue.encode(unitValue).finish();
  return createCommandArray(ConfigDomainMessageType.SET_TEMP_UNITS, unitEncoded);
}

export function setTempInstructions(temp: number) {
  const tempValue = IntegerValue.create({
    value: temp * config.targetTemperatureScale,
  });
  const tempEncoded = IntegerValue.encode(tempValue).finish();
  return createCommandArray(ConfigDomainMessageType.SET_TEMP_SETPOINT, tempEncoded);
}

export function setTimerInstructions(timer: number) {
  const timerValue = IntegerValue.create({
    value: timer,
  });
  const timerEncoded = IntegerValue.encode(timerValue).finish();
  return createCommandArray(ConfigDomainMessageType.SET_COOKING_TIMER, timerEncoded);
}