let n;
let o;
const module546 = require('./546');

const c = module546.Reader;
const u = module546.Writer;
const l = module546.util;
const p = module546.roots.Nano || (module546.roots.Nano = {});

exports.default = p;
p.DomainType =
  ((n = {}), ((o = Object.create(n))[(n[0] = 'ANOVA_DOMAIN_ID_CONFIG')] = 0), (o[(n[1] = 'ANOVA_DOMAIN_ID_BULK_TRANSFER')] = 1), (o[(n[2] = 'ANOVA_DOMAIN_ID_COUNT')] = 2), o);

p.BulkDomainMessageType = (function () {
  const t = {};
  const n = Object.create(t);
  n[(t[0] = 'MSG_TYPE_PAGE_GET')] = 0;
  n[(t[1] = 'MSG_TYPE_PAGE_PUT')] = 1;
  n[(t[2] = 'MSG_TYPE_FILE_ERASE')] = 2;
  n[(t[3] = 'MSG_TYPE_FILE_PROPS')] = 3;
  n[(t[4] = 'MSG_TYPE_SYSTEM_RESET')] = 4;
  n[(t[5] = 'MSG_TYPE_COUNT')] = 5;
  return n;
})();

p.UnitType = (function () {
  const t = {};
  const n = Object.create(t);
  n[(t[0] = 'DEGREES_POINT_1C')] = 0;
  n[(t[1] = 'DEGREES_POINT_1F')] = 1;
  n[(t[2] = 'MOTOR_SPEED')] = 2;
  n[(t[3] = 'BOOLEAN')] = 3;
  n[(t[4] = 'DEGREES_POINT_01C')] = 4;
  n[(t[5] = 'DEGREES_POINT_01F')] = 5;
  n[(t[6] = 'DEGREES_C')] = 6;
  n[(t[7] = 'DEGREES_F')] = 7;
  return n;
})();

p.MessageError = (function () {
  const t = {};
  const n = Object.create(t);
  n[(t[0] = 'MSG_ERR_NONE')] = 0;
  n[(t[1] = 'MSG_ERR_FAILED')] = 1;
  n[(t[2] = 'MSG_ERR_RESOURCE_IN_USE')] = 2;
  n[(t[3] = 'MSG_ERR_RX_OVERRUN')] = 3;
  n[(t[4] = 'MSG_ERR_TX_OVERRUN')] = 4;
  n[(t[5] = 'MSG_ERR_UNKNOWN_COMMAND')] = 5;
  n[(t[6] = 'MSG_ERR_LENGTH')] = 6;
  n[(t[7] = 'MSG_ERR_RESOURCE_INVALID')] = 7;
  n[(t[8] = 'MSG_ERR_OP_UNSUPPORTED')] = 8;
  return n;
})();

p.ConfigDomainMessageType = (function () {
  const t = {};
  const n = Object.create(t);
  n[(t[0] = 'LOOPBACK')] = 0;
  n[(t[1] = 'CLI_TEXT')] = 1;
  n[(t[2] = 'SAY_HELLO')] = 2;
  n[(t[3] = 'SET_TEMP_SETPOINT')] = 3;
  n[(t[4] = 'GET_TEMP_SETPOINT')] = 4;
  n[(t[5] = 'GET_SENSORS')] = 5;
  n[(t[6] = 'SET_TEMP_UNITS')] = 6;
  n[(t[7] = 'GET_TEMP_UNITS')] = 7;
  n[(t[8] = 'SET_COOKING_POWER_LEVEL')] = 8;
  n[(t[9] = 'GET_COOKING_POWER_LEVEL')] = 9;
  n[(t[10] = 'START_COOKING')] = 10;
  n[(t[11] = 'STOP_COOKING')] = 11;
  n[(t[12] = 'SET_SOUND_LEVEL')] = 12;
  n[(t[13] = 'GET_SOUND_LEVEL')] = 13;
  n[(t[14] = 'SET_DISPLAY_BRIGHTNESS')] = 14;
  n[(t[15] = 'GET_DISPLAY_BRIGHTNESS')] = 15;
  n[(t[16] = 'SET_COOKING_TIMER')] = 16;
  n[(t[17] = 'STOP_COOKING_TIMER')] = 17;
  n[(t[18] = 'GET_COOKING_TIMER')] = 18;
  n[(t[19] = 'CANCEL_COOKING_TIMER')] = 19;
  n[(t[20] = 'SET_CHANGE_POINT')] = 20;
  n[(t[22] = 'CHANGE_POINT')] = 22;
  n[(t[23] = 'SET_BLE_PARAMS')] = 23;
  n[(t[24] = 'BLE_PARAMS')] = 24;
  n[(t[25] = 'GET_DEVICE_INFO')] = 25;
  n[(t[26] = 'GET_FIRMWARE_INFO')] = 26;
  n[(t[27] = 'SYSTEM_ALERT_VECTOR')] = 27;
  n[(t[28] = 'RESERVED28')] = 28;
  n[(t[29] = 'MESSAGE_SPOOF')] = 29;
  return n;
})();

p.TransferStatusError = (function () {
  const t = {};
  const n = Object.create(t);
  n[(t[0] = 'TR_STATUS_OK')] = 0;
  n[(t[1] = 'TR_STATUS_PAGE_INVALID')] = 1;
  n[(t[2] = 'TR_STATUS_PAGE_IN_USE')] = 2;
  n[(t[3] = 'TR_STATUS_PAGE_CORRUPT')] = 3;
  n[(t[4] = 'TR_STATUS_INVALID_FILE_HANDLE')] = 4;
  n[(t[5] = 'TR_STATUS_FAILED')] = 5;
  return n;
})();

p.FileHandleType = (function () {
  const t = {};
  const n = Object.create(t);
  n[(t[0] = 'FILE_HANDLE_PSUDO')] = 0;
  n[(t[1] = 'FILE_HANDLE_LOG')] = 1;
  n[(t[2] = 'FILE_HANDLE_OTA')] = 2;
  return n;
})();

const f = (p.IntegerValue = (function () {
  function t(t) {
    if (t) {
      for (let n = Object.keys(t), o = 0; o < n.length; ++o) {
        t[n[o]] != null && (this[n[o]] = t[n[o]]);
      }
    }
  }

  t.prototype.value = 0;

  t.create = function (n) {
    return new t(n);
  };

  t.encode = function (t, n) {
    if (!n) {
      n = u.create();
    }
    n.uint32(8).int32(t.value);
    return n;
  };

  t.decode = function (t, n) {
    if (!(t instanceof c)) {
      t = c.create(t);
    }

    for (var o = undefined === n ? t.len : t.pos + n, s = new p.IntegerValue(); t.pos < o; ) {
      const u = t.uint32();

      switch (u >>> 3) {
        case 1:
          s.value = t.int32();
          break;

        default:
          t.skipType(7 & u);
      }
    }

    if (!s.hasOwnProperty('value')) {
      throw l.ProtocolError("missing required 'value'", {
        instance: s,
      });
    }
    return s;
  };

  t.fromObject = function (t) {
    if (t instanceof p.IntegerValue) {
      return t;
    }
    const n = new p.IntegerValue();
    if (t.value != null) {
      n.value = 0 | t.value;
    }
    return n;
  };

  t.toObject = function (t, n) {
    if (!n) {
      n = {};
    }
    const o = {};
    if (n.defaults) {
      o.value = 0;
    }
    if (t.value != null && t.hasOwnProperty('value')) {
      o.value = t.value;
    }
    return o;
  };

  t.prototype.toJSON = function () {
    return this.constructor.toObject(this, module546.util.toJSONOptions);
  };

  return t;
})());

exports.IntegerValue = f;

const v = (p.SensorValue = (function () {
  function t(t) {
    if (t) {
      for (let n = Object.keys(t), o = 0; o < n.length; ++o) {
        t[n[o]] != null && (this[n[o]] = t[n[o]]);
      }
    }
  }

  let n;
  let o;
  t.prototype.value = 0;
  t.prototype.units = 0;
  t.prototype.sensorType = 0;

  t.create = function (n) {
    return new t(n);
  };

  t.encode = function (t, n) {
    if (!n) {
      n = u.create();
    }
    n.uint32(8).int32(t.value);
    n.uint32(16).int32(t.units);
    n.uint32(24).int32(t.sensorType);
    return n;
  };

  t.decode = function (t, n) {
    if (!(t instanceof c)) {
      t = c.create(t);
    }

    for (var o = undefined === n ? t.len : t.pos + n, s = new p.SensorValue(); t.pos < o; ) {
      const u = t.uint32();

      switch (u >>> 3) {
        case 1:
          s.value = t.int32();
          break;

        case 2:
          s.units = t.int32();
          break;

        case 3:
          s.sensorType = t.int32();
          break;

        default:
          t.skipType(7 & u);
      }
    }

    if (!s.hasOwnProperty('value')) {
      throw l.ProtocolError("missing required 'value'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('units')) {
      throw l.ProtocolError("missing required 'units'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('sensorType')) {
      throw l.ProtocolError("missing required 'sensorType'", {
        instance: s,
      });
    }
    return s;
  };

  t.fromObject = function (t) {
    if (t instanceof p.SensorValue) {
      return t;
    }
    const n = new p.SensorValue();

    switch ((t.value != null && (n.value = 0 | t.value), t.units)) {
      case 'DEGREES_POINT_1C':
      case 0:
        n.units = 0;
        break;

      case 'DEGREES_POINT_1F':
      case 1:
        n.units = 1;
        break;

      case 'MOTOR_SPEED':
      case 2:
        n.units = 2;
        break;

      case 'BOOLEAN':
      case 3:
        n.units = 3;
        break;

      case 'DEGREES_POINT_01C':
      case 4:
        n.units = 4;
        break;

      case 'DEGREES_POINT_01F':
      case 5:
        n.units = 5;
        break;

      case 'DEGREES_C':
      case 6:
        n.units = 6;
        break;

      case 'DEGREES_F':
      case 7:
        n.units = 7;
    }

    switch (t.sensorType) {
      case 'WaterTemp':
      case 0:
        n.sensorType = 0;
        break;

      case 'HeaterTemp':
      case 1:
        n.sensorType = 1;
        break;

      case 'TriacTemp':
      case 2:
        n.sensorType = 2;
        break;

      case 'UnusedTemp':
      case 3:
        n.sensorType = 3;
        break;

      case 'InternalTemp':
      case 4:
        n.sensorType = 4;
        break;

      case 'WaterLow':
      case 5:
        n.sensorType = 5;
        break;

      case 'WaterLeak':
      case 6:
        n.sensorType = 6;
        break;

      case 'MotorSpeed':
      case 7:
        n.sensorType = 7;
    }

    return n;
  };

  t.toObject = function (t, n) {
    if (!n) {
      n = {};
    }
    const o = {};

    if (n.defaults) {
      o.value = 0;
      o.units = n.enums === String ? 'DEGREES_POINT_1C' : 0;
      o.sensorType = n.enums === String ? 'WaterTemp' : 0;
    }

    if (t.value != null && t.hasOwnProperty('value')) {
      o.value = t.value;
    }
    if (t.units != null && t.hasOwnProperty('units')) {
      o.units = n.enums === String ? p.UnitType[t.units] : t.units;
    }
    if (t.sensorType != null && t.hasOwnProperty('sensorType')) {
      o.sensorType = n.enums === String ? p.SensorValue.SensorType[t.sensorType] : t.sensorType;
    }
    return o;
  };

  t.prototype.toJSON = function () {
    return this.constructor.toObject(this, module546.util.toJSONOptions);
  };

  t.SensorType =
    ((n = {}),
    ((o = Object.create(n))[(n[0] = 'WaterTemp')] = 0),
    (o[(n[1] = 'HeaterTemp')] = 1),
    (o[(n[2] = 'TriacTemp')] = 2),
    (o[(n[3] = 'UnusedTemp')] = 3),
    (o[(n[4] = 'InternalTemp')] = 4),
    (o[(n[5] = 'WaterLow')] = 5),
    (o[(n[6] = 'WaterLeak')] = 6),
    (o[(n[7] = 'MotorSpeed')] = 7),
    o);
  return t;
})());

exports.SensorValue = v;

const E = (p.SensorValueList = (function () {
  function t(t) {
    if (((this.values = []), t)) {
      for (let n = Object.keys(t), o = 0; o < n.length; ++o) {
        t[n[o]] != null && (this[n[o]] = t[n[o]]);
      }
    }
  }

  t.prototype.values = l.emptyArray;

  t.create = function (n) {
    return new t(n);
  };

  t.encode = function (t, n) {
    if ((n || (n = u.create()), t.values != null && t.values.length)) {
      for (let o = 0; o < t.values.length; ++o) {
        p.SensorValue.encode(t.values[o], n.uint32(10).fork()).ldelim();
      }
    }
    return n;
  };

  t.decode = function (t, n) {
    if (!(t instanceof c)) {
      t = c.create(t);
    }

    for (var o = undefined === n ? t.len : t.pos + n, s = new p.SensorValueList(); t.pos < o; ) {
      const u = t.uint32();

      switch (u >>> 3) {
        case 1:
          if (!(s.values && s.values.length)) {
            s.values = [];
          }
          s.values.push(p.SensorValue.decode(t, t.uint32()));
          break;

        default:
          t.skipType(7 & u);
      }
    }
    return s;
  };

  t.fromObject = function (t) {
    if (t instanceof p.SensorValueList) {
      return t;
    }
    const n = new p.SensorValueList();

    if (t.values) {
      if (!Array.isArray(t.values)) {
        throw TypeError('.SensorValueList.values: array expected');
      }
      n.values = [];

      for (let o = 0; o < t.values.length; ++o) {
        if (typeof t.values[o] !== 'object') {
          throw TypeError('.SensorValueList.values: object expected');
        }
        n.values[o] = p.SensorValue.fromObject(t.values[o]);
      }
    }

    return n;
  };

  t.toObject = function (t, n) {
    console.log({t, n})
    if (!n) {
      n = {};
    }
    const o = {};

    if (((n.arrays || n.defaults) && (o.values = []), t.values && t.values.length)) {
      o.values = [];

      for (let s = 0; s < t.values.length; ++s) {
        o.values[s] = p.SensorValue.toObject(t.values[s], n);
      }
    }
    console.log(o.values)

    return o;
  };

  t.prototype.toJSON = function () {
    return this.constructor.toObject(this, module546.util.toJSONOptions);
  };

  return t;
})());

exports.SensorValueList = E;

const O = (p.SysAlertBitVector = (function () {
  function t(t) {
    if (t) {
      for (let n = Object.keys(t), o = 0; o < n.length; ++o) {
        t[n[o]] != null && (this[n[o]] = t[n[o]]);
      }
    }
  }

  let n;
  let o;
  t.prototype.prevSetVector = 0;
  t.prototype.currVector = 0;

  t.create = function (n) {
    return new t(n);
  };

  t.encode = function (t, n) {
    if (!n) {
      n = u.create();
    }
    n.uint32(8).uint32(t.prevSetVector);
    n.uint32(16).uint32(t.currVector);
    return n;
  };

  t.decode = function (t, n) {
    if (!(t instanceof c)) {
      t = c.create(t);
    }

    for (var o = undefined === n ? t.len : t.pos + n, s = new p.SysAlertBitVector(); t.pos < o; ) {
      const u = t.uint32();

      switch (u >>> 3) {
        case 1:
          s.prevSetVector = t.uint32();
          break;

        case 2:
          s.currVector = t.uint32();
          break;

        default:
          t.skipType(7 & u);
      }
    }

    if (!s.hasOwnProperty('prevSetVector')) {
      throw l.ProtocolError("missing required 'prevSetVector'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('currVector')) {
      throw l.ProtocolError("missing required 'currVector'", {
        instance: s,
      });
    }
    return s;
  };

  t.fromObject = function (t) {
    if (t instanceof p.SysAlertBitVector) {
      return t;
    }
    const n = new p.SysAlertBitVector();
    if (t.prevSetVector != null) {
      n.prevSetVector = t.prevSetVector >>> 0;
    }
    if (t.currVector != null) {
      n.currVector = t.currVector >>> 0;
    }
    return n;
  };

  t.toObject = function (t, n) {
    if (!n) {
      n = {};
    }
    const o = {};

    if (n.defaults) {
      o.prevSetVector = 0;
      o.currVector = 0;
    }

    if (t.prevSetVector != null && t.hasOwnProperty('prevSetVector')) {
      o.prevSetVector = t.prevSetVector;
    }
    if (t.currVector != null && t.hasOwnProperty('currVector')) {
      o.currVector = t.currVector;
    }
    return o;
  };

  t.prototype.toJSON = function () {
    return this.constructor.toObject(this, module546.util.toJSONOptions);
  };

  t.Flag =
    ((n = {}),
    ((o = Object.create(n))[(n[0] = 'RESERVED0')] = 0),
    (o[(n[1] = 'HEATING_RATE_UPDATED')] = 1),
    (o[(n[2] = 'COOKING_STARTED')] = 2),
    (o[(n[4] = 'SET_POINT_REACHED')] = 4),
    (o[(n[8] = 'EVENT_LOG_FULL')] = 8),
    (o[(n[16] = 'WATER_LEAK')] = 16),
    (o[(n[32] = 'WATER_LOW')] = 32),
    (o[(n[64] = 'MOTOR_STUCK')] = 64),
    (o[(n[128] = 'HEATER_OVER_TEMP')] = 128),
    (o[(n[256] = 'TRIAC_OVER_TEMP')] = 256),
    (o[(n[512] = 'COOKING_TIMER_STARTED')] = 512),
    (o[(n[1024] = 'SETPOINT_CHANGED')] = 1024),
    (o[(n[2048] = 'UNITS_CHANGED')] = 2048),
    (o[(n[4096] = 'RESET')] = 4096),
    (o[(n[8192] = 'COOKING_TIMER_EXPIRED')] = 8192),
    (o[(n[16384] = 'DELTA_TEMP')] = 16384),
    o);
  return t;
})());

exports.SysAlertBitVector = O;

const T = (p.BleConnectionParams = (function () {
  function t(t) {
    if (t) {
      for (let n = Object.keys(t), o = 0; o < n.length; ++o) {
        t[n[o]] != null && (this[n[o]] = t[n[o]]);
      }
    }
  }

  t.prototype.slaveLatencyMs = 0;
  t.prototype.connectionIntervalMinMs = 0;
  t.prototype.connectionIntervalMaxMs = 0;

  t.create = function (n) {
    return new t(n);
  };

  t.encode = function (t, n) {
    if (!n) {
      n = u.create();
    }
    n.uint32(8).uint32(t.slaveLatencyMs);
    n.uint32(16).uint32(t.connectionIntervalMinMs);
    n.uint32(24).uint32(t.connectionIntervalMaxMs);
    return n;
  };

  t.decode = function (t, n) {
    if (!(t instanceof c)) {
      t = c.create(t);
    }

    for (var o = undefined === n ? t.len : t.pos + n, s = new p.BleConnectionParams(); t.pos < o; ) {
      const u = t.uint32();

      switch (u >>> 3) {
        case 1:
          s.slaveLatencyMs = t.uint32();
          break;

        case 2:
          s.connectionIntervalMinMs = t.uint32();
          break;

        case 3:
          s.connectionIntervalMaxMs = t.uint32();
          break;

        default:
          t.skipType(7 & u);
      }
    }

    if (!s.hasOwnProperty('slaveLatencyMs')) {
      throw l.ProtocolError("missing required 'slaveLatencyMs'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('connectionIntervalMinMs')) {
      throw l.ProtocolError("missing required 'connectionIntervalMinMs'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('connectionIntervalMaxMs')) {
      throw l.ProtocolError("missing required 'connectionIntervalMaxMs'", {
        instance: s,
      });
    }
    return s;
  };

  t.fromObject = function (t) {
    if (t instanceof p.BleConnectionParams) {
      return t;
    }
    const n = new p.BleConnectionParams();
    if (t.slaveLatencyMs != null) {
      n.slaveLatencyMs = t.slaveLatencyMs >>> 0;
    }
    if (t.connectionIntervalMinMs != null) {
      n.connectionIntervalMinMs = t.connectionIntervalMinMs >>> 0;
    }
    if (t.connectionIntervalMaxMs != null) {
      n.connectionIntervalMaxMs = t.connectionIntervalMaxMs >>> 0;
    }
    return n;
  };

  t.toObject = function (t, n) {
    if (!n) {
      n = {};
    }
    const o = {};

    if (n.defaults) {
      o.slaveLatencyMs = 0;
      o.connectionIntervalMinMs = 0;
      o.connectionIntervalMaxMs = 0;
    }

    if (t.slaveLatencyMs != null && t.hasOwnProperty('slaveLatencyMs')) {
      o.slaveLatencyMs = t.slaveLatencyMs;
    }
    if (t.connectionIntervalMinMs != null && t.hasOwnProperty('connectionIntervalMinMs')) {
      o.connectionIntervalMinMs = t.connectionIntervalMinMs;
    }
    if (t.connectionIntervalMaxMs != null && t.hasOwnProperty('connectionIntervalMaxMs')) {
      o.connectionIntervalMaxMs = t.connectionIntervalMaxMs;
    }
    return o;
  };

  t.prototype.toJSON = function () {
    return this.constructor.toObject(this, module546.util.toJSONOptions);
  };

  return t;
})());

exports.BleConnectionParams = T;

const S = (p.DeviceInfo = (function () {
  function t(t) {
    if (t) {
      for (let n = Object.keys(t), o = 0; o < n.length; ++o) {
        t[n[o]] != null && (this[n[o]] = t[n[o]]);
      }
    }
  }

  t.prototype.revision = 0;
  t.prototype.modelNumber = 0;
  t.prototype.boardRevision = 0;
  t.prototype.bom = 0;
  t.prototype.platform = 0;
  t.prototype.cmCode = 0;
  t.prototype.dateCode = 0;
  t.prototype.serialNumber = '';

  t.create = function (n) {
    return new t(n);
  };

  t.encode = function (t, n) {
    if (!n) {
      n = u.create();
    }
    n.uint32(8).uint32(t.revision);
    n.uint32(16).uint32(t.modelNumber);
    n.uint32(24).uint32(t.boardRevision);
    n.uint32(32).uint32(t.bom);
    n.uint32(40).uint32(t.platform);
    n.uint32(48).uint32(t.cmCode);
    n.uint32(56).uint32(t.dateCode);
    n.uint32(66).string(t.serialNumber);
    return n;
  };

  t.decode = function (t, n) {
    if (!(t instanceof c)) {
      t = c.create(t);
    }

    for (var o = undefined === n ? t.len : t.pos + n, s = new p.DeviceInfo(); t.pos < o; ) {
      const u = t.uint32();

      switch (u >>> 3) {
        case 1:
          s.revision = t.uint32();
          break;

        case 2:
          s.modelNumber = t.uint32();
          break;

        case 3:
          s.boardRevision = t.uint32();
          break;

        case 4:
          s.bom = t.uint32();
          break;

        case 5:
          s.platform = t.uint32();
          break;

        case 6:
          s.cmCode = t.uint32();
          break;

        case 7:
          s.dateCode = t.uint32();
          break;

        case 8:
          s.serialNumber = t.string();
          break;

        default:
          t.skipType(7 & u);
      }
    }

    if (!s.hasOwnProperty('revision')) {
      throw l.ProtocolError("missing required 'revision'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('modelNumber')) {
      throw l.ProtocolError("missing required 'modelNumber'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('boardRevision')) {
      throw l.ProtocolError("missing required 'boardRevision'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('bom')) {
      throw l.ProtocolError("missing required 'bom'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('platform')) {
      throw l.ProtocolError("missing required 'platform'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('cmCode')) {
      throw l.ProtocolError("missing required 'cmCode'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('dateCode')) {
      throw l.ProtocolError("missing required 'dateCode'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('serialNumber')) {
      throw l.ProtocolError("missing required 'serialNumber'", {
        instance: s,
      });
    }
    return s;
  };

  t.fromObject = function (t) {
    if (t instanceof p.DeviceInfo) {
      return t;
    }
    const n = new p.DeviceInfo();
    if (t.revision != null) {
      n.revision = t.revision >>> 0;
    }
    if (t.modelNumber != null) {
      n.modelNumber = t.modelNumber >>> 0;
    }
    if (t.boardRevision != null) {
      n.boardRevision = t.boardRevision >>> 0;
    }
    if (t.bom != null) {
      n.bom = t.bom >>> 0;
    }
    if (t.platform != null) {
      n.platform = t.platform >>> 0;
    }
    if (t.cmCode != null) {
      n.cmCode = t.cmCode >>> 0;
    }
    if (t.dateCode != null) {
      n.dateCode = t.dateCode >>> 0;
    }
    if (t.serialNumber != null) {
      n.serialNumber = String(t.serialNumber);
    }
    return n;
  };

  t.toObject = function (t, n) {
    if (!n) {
      n = {};
    }
    const o = {};

    if (n.defaults) {
      o.revision = 0;
      o.modelNumber = 0;
      o.boardRevision = 0;
      o.bom = 0;
      o.platform = 0;
      o.cmCode = 0;
      o.dateCode = 0;
      o.serialNumber = '';
    }

    if (t.revision != null && t.hasOwnProperty('revision')) {
      o.revision = t.revision;
    }
    if (t.modelNumber != null && t.hasOwnProperty('modelNumber')) {
      o.modelNumber = t.modelNumber;
    }
    if (t.boardRevision != null && t.hasOwnProperty('boardRevision')) {
      o.boardRevision = t.boardRevision;
    }
    if (t.bom != null && t.hasOwnProperty('bom')) {
      o.bom = t.bom;
    }
    if (t.platform != null && t.hasOwnProperty('platform')) {
      o.platform = t.platform;
    }
    if (t.cmCode != null && t.hasOwnProperty('cmCode')) {
      o.cmCode = t.cmCode;
    }
    if (t.dateCode != null && t.hasOwnProperty('dateCode')) {
      o.dateCode = t.dateCode;
    }
    if (t.serialNumber != null && t.hasOwnProperty('serialNumber')) {
      o.serialNumber = t.serialNumber;
    }
    return o;
  };

  t.prototype.toJSON = function () {
    return this.constructor.toObject(this, module546.util.toJSONOptions);
  };

  return t;
})());

exports.DeviceInfo = S;

const _ = (p.FirmwareInfo = (function () {
  function t(t) {
    if (t) {
      for (let n = Object.keys(t), o = 0; o < n.length; ++o) {
        t[n[o]] != null && (this[n[o]] = t[n[o]]);
      }
    }
  }

  t.prototype.commitId = '';
  t.prototype.tagId = '';
  t.prototype.dateCode = 0;

  t.create = function (n) {
    return new t(n);
  };

  t.encode = function (t, n) {
    if (!n) {
      n = u.create();
    }
    n.uint32(10).string(t.commitId);
    n.uint32(18).string(t.tagId);
    n.uint32(24).uint32(t.dateCode);
    return n;
  };

  t.decode = function (t, n) {
    if (!(t instanceof c)) {
      t = c.create(t);
    }

    for (var o = undefined === n ? t.len : t.pos + n, s = new p.FirmwareInfo(); t.pos < o; ) {
      const u = t.uint32();

      switch (u >>> 3) {
        case 1:
          s.commitId = t.string();
          break;

        case 2:
          s.tagId = t.string();
          break;

        case 3:
          s.dateCode = t.uint32();
          break;

        default:
          t.skipType(7 & u);
      }
    }

    if (!s.hasOwnProperty('commitId')) {
      throw l.ProtocolError("missing required 'commitId'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('tagId')) {
      throw l.ProtocolError("missing required 'tagId'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('dateCode')) {
      throw l.ProtocolError("missing required 'dateCode'", {
        instance: s,
      });
    }
    return s;
  };

  t.fromObject = function (t) {
    if (t instanceof p.FirmwareInfo) {
      return t;
    }
    const n = new p.FirmwareInfo();
    if (t.commitId != null) {
      n.commitId = String(t.commitId);
    }
    if (t.tagId != null) {
      n.tagId = String(t.tagId);
    }
    if (t.dateCode != null) {
      n.dateCode = t.dateCode >>> 0;
    }
    return n;
  };

  t.toObject = function (t, n) {
    if (!n) {
      n = {};
    }
    const o = {};

    if (n.defaults) {
      o.commitId = '';
      o.tagId = '';
      o.dateCode = 0;
    }

    if (t.commitId != null && t.hasOwnProperty('commitId')) {
      o.commitId = t.commitId;
    }
    if (t.tagId != null && t.hasOwnProperty('tagId')) {
      o.tagId = t.tagId;
    }
    if (t.dateCode != null && t.hasOwnProperty('dateCode')) {
      o.dateCode = t.dateCode;
    }
    return o;
  };

  t.prototype.toJSON = function () {
    return this.constructor.toObject(this, module546.util.toJSONOptions);
  };

  return t;
})());

exports.FirmwareInfo = _;

const y = (p.DeviceState = (function () {
  function t(t) {
    if (t) {
      for (let n = Object.keys(t), o = 0; o < n.length; ++o) {
        t[n[o]] != null && (this[n[o]] = t[n[o]]);
      }
    }
  }

  t.prototype.waterTemp = null;
  t.prototype.alerts = null;

  t.create = function (n) {
    return new t(n);
  };

  t.encode = function (t, n) {
    if (!n) {
      n = u.create();
    }
    p.SensorValue.encode(t.waterTemp, n.uint32(10).fork()).ldelim();
    p.SysAlertBitVector.encode(t.alerts, n.uint32(18).fork()).ldelim();
    return n;
  };

  t.decode = function (t, n) {
    if (!(t instanceof c)) {
      t = c.create(t);
    }

    for (var o = undefined === n ? t.len : t.pos + n, s = new p.DeviceState(); t.pos < o; ) {
      const u = t.uint32();

      switch (u >>> 3) {
        case 1:
          s.waterTemp = p.SensorValue.decode(t, t.uint32());
          break;

        case 2:
          s.alerts = p.SysAlertBitVector.decode(t, t.uint32());
          break;

        default:
          t.skipType(7 & u);
      }
    }

    if (!s.hasOwnProperty('waterTemp')) {
      throw l.ProtocolError("missing required 'waterTemp'", {
        instance: s,
      });
    }
    if (!s.hasOwnProperty('alerts')) {
      throw l.ProtocolError("missing required 'alerts'", {
        instance: s,
      });
    }
    return s;
  };

  t.fromObject = function (t) {
    if (t instanceof p.DeviceState) {
      return t;
    }
    const n = new p.DeviceState();

    if (t.waterTemp != null) {
      if (typeof t.waterTemp !== 'object') {
        throw TypeError('.DeviceState.waterTemp: object expected');
      }
      n.waterTemp = p.SensorValue.fromObject(t.waterTemp);
    }

    if (t.alerts != null) {
      if (typeof t.alerts !== 'object') {
        throw TypeError('.DeviceState.alerts: object expected');
      }
      n.alerts = p.SysAlertBitVector.fromObject(t.alerts);
    }

    return n;
  };

  t.toObject = function (t, n) {
    if (!n) {
      n = {};
    }
    const o = {};

    if (n.defaults) {
      o.waterTemp = null;
      o.alerts = null;
    }

    if (t.waterTemp != null && t.hasOwnProperty('waterTemp')) {
      o.waterTemp = p.SensorValue.toObject(t.waterTemp, n);
    }
    if (t.alerts != null && t.hasOwnProperty('alerts')) {
      o.alerts = p.SysAlertBitVector.toObject(t.alerts, n);
    }
    return o;
  };

  t.prototype.toJSON = function () {
    return this.constructor.toObject(this, module546.util.toJSONOptions);
  };

  return t;
})());

exports.DeviceState = y;
