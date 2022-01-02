const module544 = require('./544');
const module563 = require('./563');

const N = module544.default.ConfigDomainMessageType;
const u = module544.default.DomainType;
const A = module544.default.UnitType;
const l = function (_, I) {
  const T = [0];
  let E = 0;
  let O = 1;

  function N(_) {
    T[E] = O;
    E = T.length;
    if (_ === true) {
      T.push(0);
    }
    O = 1;
  }

  for (let u = 0; u < _.length; u += 1) {
    _[u] === 0 ? N(true) : (T.push(_[u]), (O += 1) === 255 && N(true));
  }

  N(false);
  if (I) {
    T.push(0);
  }
  return Buffer.from(T);
};
const t = function (_, I, E) {
  let O;
  let N = [_, I];
  if (E) {
    N = (O = N).concat.apply(O, [...E]);
  }
  let u = Buffer.from(N);
  u = l(u, true);
  N = [...u];
  return N;
};
const S = {
  START: [t(u.ANOVA_DOMAIN_ID_CONFIG, N.START_COOKING, null), module544.SensorValueList, 'START'],
  STOP: [t(u.ANOVA_DOMAIN_ID_CONFIG, N.STOP_COOKING, null), module544.SensorValueList, 'STOP'],
  GET_SENSORS_VALUES: [t(u.ANOVA_DOMAIN_ID_CONFIG, N.GET_SENSORS, null), module544.SensorValueList, 'GET_SENSORS_VALUES'],
  READ_TARGET_TEMP: [t(u.ANOVA_DOMAIN_ID_CONFIG, N.GET_TEMP_SETPOINT, null), module544.IntegerValue, 'READ_TARGET_TEMP'],
  READ_UNIT: [t(u.ANOVA_DOMAIN_ID_CONFIG, N.GET_TEMP_UNITS, null), module544.IntegerValue, 'READ_UNIT'],
  READ_TIMER: [t(u.ANOVA_DOMAIN_ID_CONFIG, N.GET_COOKING_TIMER, null), module544.IntegerValue, 'READ_TIMER'],
  GET_FIRMWARE_INFO: [t(u.ANOVA_DOMAIN_ID_CONFIG, N.GET_FIRMWARE_INFO, null), module544.FirmwareInfo, 'GET_FIRMWARE_INFO'],
  SET_UNIT(_) {
    const I = _.toLowerCase() === 'c' ? A.DEGREES_POINT_1C : A.DEGREES_POINT_1F;
    const T = module544.IntegerValue.create({
      value: I,
    });
    const n = module544.IntegerValue.encode(T).finish();
    return [t(u.ANOVA_DOMAIN_ID_CONFIG, N.SET_TEMP_UNITS, n), null, `SET_UNIT ${_}`];
  },
  SET_TEMP(_) {
    const I = module544.IntegerValue.create({
      value: _ * module563.default.targetTemperatureScale,
    });
    const T = module544.IntegerValue.encode(I).finish();
    return [t(u.ANOVA_DOMAIN_ID_CONFIG, N.SET_TEMP_SETPOINT, T), null, `SET_TEMP ${_}`];
  },
  SET_TIMER(_) {
    const I = module544.IntegerValue.create({
      value: _,
    });
    const T = module544.IntegerValue.encode(I).finish();
    return [t(u.ANOVA_DOMAIN_ID_CONFIG, N.SET_COOKING_TIMER, T), null, `SET_TIMER ${_}`];
  },
};

exports.COMMANDS = S;
