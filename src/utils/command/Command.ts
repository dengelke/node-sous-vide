import { CommandConfig, Commands, CommandType, ReadCommandType, WriteCommandType } from "../../types/Command";
import { DomainType, ConfigDomainMessageType } from "../../types/Sensor";
import { createCommandArray } from "./Instructions";
import { SensorValueList, IntegerValue, FirmwareInfo } from "./ReadInstructionsHelpers";
import { setTempInstructions, setTimerInstructions, setUnitInstructions } from "./WriteInstructionsHelpers";

const commandsArray: Array<[CommandType, CommandConfig]> = [
  [ReadCommandType.Start, { 
    instruction: createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.START_COOKING, null), 
    handler: SensorValueList
  }],
  [ReadCommandType.Stop, { instruction: createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.STOP_COOKING, null), handler: SensorValueList}],
  [ReadCommandType.GetSensorValues, { instruction: createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.GET_SENSORS, null), handler: SensorValueList}],
  [ReadCommandType.ReadTargetTemp, { instruction: createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.GET_TEMP_SETPOINT, null), handler: IntegerValue }],
  [ReadCommandType.ReadUnit, { instruction: createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.GET_TEMP_UNITS, null), handler: IntegerValue}],
  [ReadCommandType.ReadTimer, { instruction: createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.GET_COOKING_TIMER, null), handler: IntegerValue}],
  [ReadCommandType.GetFirmwareInfo, { instruction: createCommandArray(DomainType.ANOVA_DOMAIN_ID_CONFIG, ConfigDomainMessageType.GET_FIRMWARE_INFO, null), handler: FirmwareInfo}],
  [WriteCommandType.SetUnit, { setInstructions: setUnitInstructions }],
  [WriteCommandType.SetTemp, { setInstructions: setTempInstructions }],
  [WriteCommandType.SetTimer, { setInstructions: setTimerInstructions }],
];

export const CommandsMap: Commands = new Map(commandsArray);

