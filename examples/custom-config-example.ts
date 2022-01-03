import { connect } from '../src/index';

import { DeviceConfig } from '../src/types/Device';

const customConfig: DeviceConfig = {
    serviceUUID: '0e1400000af14582a242773e63054c68',
    txCharacteristicUUID: '0e1400010af14582a242773e63054c68',
    rxCharacteristicUUID: '0e1400020af14582a242773e63054c68',
    asyncCharacteristicUUID: '0e1400030af14582a242773e63054c68',
    targetTemperatureScale: 10,
    temperatureScale: 100,
    sensorTemperatureScale: 1,
};

(async function() {
    // Setup anova with custom config
    const anova = await connect(customConfig);
    console.log({anova});
    const response = await anova.getTargetTemperature();
    console.log({response});
    await anova.disconnect();
    process.exit(0);
})();