import { connect } from '../src/index';
import { Device } from '../src/Device';

(async function() {
    const anova = await connect();
    console.log({anova})
    const response = await anova.getTargetTemperature();
    console.log({response})
})();