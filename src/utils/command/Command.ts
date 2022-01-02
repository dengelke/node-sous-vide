import { CommandConfig, Commands, CommandType, ReadCommandType, WriteCommandType } from "../../types/Command";
import { DomainType, ConfigDomainMessageType } from "../../types/Sensor";
import { createCommandArray } from "./Instructions";
import { SensorValueList, IntegerValue, FirmwareInfo } from "./ReadInstructionsHelpers";
import { setTempInstructions, setTimerInstructions, setUnitInstructions } from "./WriteInstructionsHelpers";

const commandsArray: Array<[CommandType, CommandConfig]> = [
  [ReadCommandType.Start, { 
    instruction: createCommandArray(ConfigDomainMessageType.START_COOKING), 
    handler: SensorValueList
  }],
  [ReadCommandType.Stop, { 
    instruction: createCommandArray(ConfigDomainMessageType.STOP_COOKING), 
    handler: SensorValueList
  }],
  [ReadCommandType.GetSensorValues, { 
    instruction: createCommandArray(ConfigDomainMessageType.GET_SENSORS), 
    handler: SensorValueList
  }],
  [ReadCommandType.ReadTargetTemp, { 
    instruction: createCommandArray(ConfigDomainMessageType.GET_TEMP_SETPOINT), 
    handler: IntegerValue 
  }],
  [ReadCommandType.ReadUnit, { 
    instruction: createCommandArray(ConfigDomainMessageType.GET_TEMP_UNITS), 
    handler: IntegerValue
  }],
  [ReadCommandType.ReadTimer, { 
    instruction: createCommandArray(ConfigDomainMessageType.GET_COOKING_TIMER), 
    handler: IntegerValue
  }],
  [ReadCommandType.GetFirmwareInfo, { 
    instruction: createCommandArray(ConfigDomainMessageType.GET_FIRMWARE_INFO), 
    handler: FirmwareInfo
  }],
  [WriteCommandType.SetUnit, { setInstructions: setUnitInstructions }],
  [WriteCommandType.SetTemp, { setInstructions: setTempInstructions }],
  [WriteCommandType.SetTimer, { setInstructions: setTimerInstructions }],
];

export const CommandsMap: Commands = new Map(commandsArray);

