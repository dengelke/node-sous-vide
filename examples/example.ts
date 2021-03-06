import { connect } from '../src/index';

(async function() {
    // Connect the Anova
    const anova = await connect();
    // Get target temperature
    const targetTemp = await anova.getTargetTemperature();
    console.log({targetTemp});
    // Get cooker status
    const status = await anova.getCookerStatus();
    console.log({status});
    // Disconnect and exit
    await anova.disconnect();
    process.exit(0);
})();