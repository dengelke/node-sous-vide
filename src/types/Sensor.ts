
export enum SensorType {
  WaterTemp = 0,
  HeaterTemp = 1,
  TriacTemp = 2,
  UnusedTemp = 3,
  InternalTemp = 4,
  WaterLow = 5,
  WaterLeak = 6,
  MotorSpeed = 7,
}

export enum UnitType {
  DEGREES_POINT_1C = 0,
  DEGREES_POINT_1F = 1,
  MOTOR_SPEED = 2,
  BOOLEAN = 3,
  DEGREES_POINT_01C = 4,
  DEGREES_POINT_01F = 5,
  DEGREES_C = 6,
  DEGREES_F = 7
}

export enum DomainType {
  ANOVA_DOMAIN_ID_CONFIG = 0,
  ANOVA_DOMAIN_ID_BULK_TRANSFER = 1,
  ANOVA_DOMAIN_ID_COUNT = 2
}

export enum ConfigDomainMessageType {
  LOOPBACK = 0,
  CLI_TEXT = 1,
  SAY_HELLO = 2,
  SET_TEMP_SETPOINT = 3,
  GET_TEMP_SETPOINT = 4,
  GET_SENSORS = 5,
  SET_TEMP_UNITS = 6,
  GET_TEMP_UNITS = 7,
  SET_COOKING_POWER_LEVEL = 8,
  GET_COOKING_POWER_LEVEL = 9,
  START_COOKING = 10,
  STOP_COOKING = 11,
  SET_SOUND_LEVEL = 12,
  GET_SOUND_LEVEL = 13,
  SET_DISPLAY_BRIGHTNESS = 14,
  GET_DISPLAY_BRIGHTNESS = 15,
  SET_COOKING_TIMER = 16,
  STOP_COOKING_TIMER = 17,
  GET_COOKING_TIMER = 18,
  CANCEL_COOKING_TIMER = 19,
  SET_CHANGE_POINT = 20,
  CHANGE_POINT = 22,
  SET_BLE_PARAMS = 23,
  BLE_PARAMS = 24,
  GET_DEVICE_INFO = 25,
  GET_FIRMWARE_INFO = 26,
  SYSTEM_ALERT_VECTOR = 27,
  RESERVED28 = 28,
  MESSAGE_SPOOF = 29
}

export type SensorValue = {
  sensorType: SensorType;
  value: any;
  units?: UnitType;
}

export type SensorValuesResponse = {
  values: SensorValue[]
}