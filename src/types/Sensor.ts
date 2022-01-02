
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

export type SensorValue = {
  sensorType: SensorType;
  value: any;
  units?: UnitType;
}

export type SensorValuesResponse = {
  values: SensorValue[]
}