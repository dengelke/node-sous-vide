export enum ReadCommandType {
  Start = 'START',
  Stop = 'STOP',
  GetSensorValues = 'GET_SENSORS_VALUES',
  ReadTargetTemp = 'READ_TARGET_TEMP',
  ReadUnit = 'READ_UNIT',
  ReadTimer = 'READ_TIMER',
  GetFirmwareInfo = 'GET_FIRMWARE_INFO',
}

export enum WriteCommandType {
  SetUnit = 'SET_UNIT',
  SetTemp = 'SET_TEMP',
  SetTimer = 'SET_TIMER'
}

export type CommandType = ReadCommandType | WriteCommandType;

export type CommandHandler = {
  create?: (data: any) => any;
  encode?: (data: any) => any;
  decode: (data: any) => any;
};

export type ReadCommandConfig = {
  instruction: number[]; // buffer, i.e. [ 1, 2, 26, 0 ]
  handler: CommandHandler;
} 

export type WriteCommandConfig = {
  setInstructions: (value: string | number) => number[];
}

export type CommandConfig = ReadCommandConfig | WriteCommandConfig;

export type Commands = Map<CommandType, CommandConfig>;