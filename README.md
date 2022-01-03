# Node-Sous-Vide

Node.js API to control the Anova Nano Cooker via Bluetooth

> Note: only tested on the Anova Precision Nano Cooker, however this package should support the Anova Precision Cooker Pro as well without extensive modification.

## Quick start example

```js
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
```

## Installation

To setup run 

### Prerequisits

Follow guide for [abandonware/noble](https://github.com/abandonware/noble#installation) to setup required tools and utilities for your specific environment (OSX, Linux, FreeBSD, Windows or Docker).

### Installing the Package

```
npm install node-sous-vide
```
```
const cooker = require('node-sous-vide');
```