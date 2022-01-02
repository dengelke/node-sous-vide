## Notes

### Node.js notes

## Bluetooth

Use `@abandonware/noble` as `noble` is no longer supported

## NPM packages

t.LongBits = require('./556');
https://protobufjs.github.io/protobuf.js/util.LongBits.html

## Supported Commands

```
  START
  STOP
  GET_SENSORS_VALUES // Broken
  READ_TARGET_TEMP // Needs logic
  READ_UNIT // Needs logic/testing
  READ_TIMER
  GET_FIRMWARE_INFO // Broken
  SET_UNIT // Needs logic/testing
  SET_TEMP
  SET_TIMER // Needs testing
```

### Anova Command notes

563.js contains device constats for Anova Nano
564.js contains functions to send commands to device

```
exports.default = {
  serviceUUID: '0e140000-0af1-4582-a242-773e63054c68',
  txCharacteristicUUID: '0e140001-0af1-4582-a242-773e63054c68',
  rxCharacteristicUUID: '0e140002-0af1-4582-a242-773e63054c68',
  asyncCharacteristicUUID: '0e140003-0af1-4582-a242-773e63054c68',
  targetTemperatureScale: 10,
  temperatureScale: 100,
  sensorTemperatureScale: 1,
};
```

The characteristics match from the Noble output logs

```
{
  characteristic: 'txCharacteristicUUID'
  uuid: '0e1400010af14582a242773e63054c68', 
  properties: [ 'write' ] 
},
{
  characteristic: 'rxCharacteristicUUID'
  uuid: '0e1400020af14582a242773e63054c68',
  properties: [ 'notify' ]
},
{
  characteristic: 'asyncCharacteristicUUID'
  uuid: '0e1400030af14582a242773e63054c68',
  properties: [ 'notify' ]
}
```


Nano Device UUID is

```
C060D1CD-3923-4E04-8702-F9FEBF875DA4
``` 
or
```
c060d1cd39234e048702f9febf875da4
```

498.js contains bluetooth events

```
exports.BleEvents = {
  DidUpdateValueForCharacteristic: 'BleManagerDidUpdateValueForCharacteristic',
  DidUpdateState: 'BleManagerDidUpdateState',
  DidStopScanning: 'BleManagerStopScan',
  PeripheralDiscovered: 'BleManagerDiscoverPeripheral',
  PeripheralConnected: 'BleManagerConnectPeripheral',
  PeripheralDisconnected: 'BleManagerDisconnectPeripheral',
};
```

540.js contains commands

541.js

## Old Anova

Command used by Anova original (used in npm sous-vide) in 506.js
```
            return regeneratorRuntime.default.awrap(
              module497.default.writeWithoutResponse(t, module508.default.serviceUUID, module508.default.rxTxCharacteristicUUID, module22, 20, 200)
            );
```
Where module22 (data) is
```
module22 = p(n);
```

And
```
var p = function (t) {
  n = `${t}\r`;
  return module22.default(n).map((t) => t.charCodeAt(0));
  let n;
};
```

Call in 502.js where module14 is `module14 = l.peripheralID;`
```
return module507.sendDeviceCommand(module14, module509.COMMANDS.READ_UNIT);
```

Commands in 509.js
```
exports.COMMANDS = {
  START: 'start',
  STOP: 'stop',
  READ_TARGET_TEMP: 'read set temp',
  READ_TEMP: 'read temp',
  READ_UNIT: 'read unit',
  READ_TIMER: 'read timer',
  START_TIMER: 'start time',
  STOP_TIMER: 'stop time',
  CLEAR_ALARM: 'clear alarm',
  GET_COOKER_ID: 'get id card',
  STATUS: 'status',
  FIRMWARE_VERSION: 'version',
  SMARTLINK_START: 'smartlink start',
  SEND_SERVER_ADDRESS: 'server para pc.anovaculinary.com 8080',
  SET_TIMER(t) {
    return `set timer ${t}`;
  },
  SET_UNIT(t) {
    return `set unit ${t.toLowerCase()}`;
  },
  SET_TEMP(t) {
    return `set temp ${t}`;
  },
  SET_WIFI_CREDS(t, E) {
    return `wifi para 2 ${t} ${E} WPA2PSK AES`;
  },
  SET_COOKER_SECRET(t) {
    return `set number ${t}`;
  },
  SET_SPEAKER(t) {
    return `set speaker ${t}`;
  },
};
```

Command used by Anova Nano (564.js)
```
            return regeneratorRuntime.default.awrap(module497.default.write(t, module563.default.serviceUUID, module563.default.txCharacteristicUUID, module565, 20));
```

Command used in 540.js where t = o.peripheralID;
```
return module564.sendDeviceCommand(t, module541.COMMANDS.READ_UNIT);
```

