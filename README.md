# Node-Sous-Vide

Node.js API to control the Anova Nano Cooker via Bluetooth

> Note: only tested on the Anova Precision Nano Cooker, the Anova Pro has a similar Bluetooth interface but a different set of commands so will not work with this library.

## Quick start example

```js
const { connect } = require('../lib/index.js');

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
```

## Installation

To setup run 

### Prerequisits

Follow guide for [abandonware/noble](https://github.com/abandonware/noble#installation) to setup required tools and utilities for your specific environment (OSX, Linux, FreeBSD, Windows or Docker).

## Disclaimer

This software may harm your device. Use it at your own risk.

`
THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
`