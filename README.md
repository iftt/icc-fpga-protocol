# icc-fpga-protocol [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[travis-image]: https://travis-ci.org/iftt/icc-fpga-protocol.svg?branch=master
[travis-url]: https://travis-ci.org/iftt/icc-fpga-protocol
[npm-image]: https://img.shields.io/npm/v/@iftt/icc-fpga-protocol.svg
[npm-url]: https://npmjs.org/package/@iftt/icc-fpga-protocol
[downloads-image]: https://img.shields.io/npm/dm/@iftt/icc-fpga-protocol.svg
[downloads-url]: https://www.npmjs.com/package/@iftt/icc-fpga-protocol

## About
The IOTA Crypto Core FPGA protocol was design and created by [Thomas Pototschnig](https://microengineer.eu). You can learn more about his work [on his blog](https://medium.com/@punpck), [the iota ecosystem](https://ecosystem.iota.org/users/microengineer/profile), and [all the pertaining git repos](https://gitlab.com/iccfpga/iccfpga-core/wikis/home).

The original repo I used in this project to build the device and implement this protocol is [here](https://gitlab.com/iccfpga/iccfpga-core).

FPGA is an abbreviation for `Field Programmable Gate Array` and allows a user to program ASIC like devices. In other words, this device can find the appropriate nonce (do the Proof of Work) within an appropriate/realistic timeframe for a small IoT device to post transactions on the IOTA ledger.

Communication with the device is over USB via a serial port.

Thomas Pototschnig has created an even better (and smaller) version, which you can find [here](https://gitlab.com/iccfpga/iccfpga-module), [and a blog about it here](https://medium.com/@punpck/iota-crypto-core-fpga-4th-progress-report-e83363d2ea8d)

## Debug
If you need to debug this module use the string `icc-fpga-protocol`
```sh
DEBUG=icc-fpga-protocol node x
```

## Install
```sh
# npm
npm install --save @iftt/icc-fpga-protocol

# yarn
yarn add @iftt/icc-fpga-protocol
```

## How to use
Assuming you have the device plugged in and it is appropriately programmed first find the portLocation

```sh
# mac and linux
ls /dev/tty*
```

then creat the module

```js
// ES6
import FpgaProtocol from '@iftt/icc-fpga-protocol'
// ES5
const FpgaProtocol = require('@iftt/icc-fpga-protocol').default

const fpgaProtocol = new FpgaProtocol('/dev/ttyUSB1') // using the default 115200 baud rate

fpga._onPortOpen = function () {
  console.log('the fpgaProtocol is ready.')
}
// ask the device to do POW for you:
fpgaProtocol.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback)
```

## Using with the standard iota library or MAM
The standard format with the iota tangle is to push the `attachToTangle` forward like so:

```js
// create IOTA instance
const IOTA = require('iota.lib.js')
const iota = new IOTA({ provider: 'https://testnet.iota.com:443' })
// create FpgaProtocol instance
const FpgaProtocol = require('iftt/icc-fpga-protocol').default
const fpgaProtocol = new FpgaProtocol('/dev/ttyUSB1')
// link the 'attachToTangle' function
iota.api.attachToTangle = (trunkTransaction, branchTransaction, minWeight, trytes, callback) => {
  fpgaProtocol.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback)
}

// .. do stuff
```

That's it! Your device will spit out the POW to the iota api and all is well with the world. Obviously, you need to manage the queue system yourself to ensure that multiple transactions aren't trying to use either the device or the provider while another transaction is trying to go through.

## API

### new FpgaProtocol (portLocation: string, baudRate?: number = 115200)
* portLocation: string `where to look for the device`
* [baudRate]: number `defaults to 115200; the rate at which the device talks/listens`

### \_onPortOpen (): void
* null: void `edit this function to know when the device is ready`

### attachToTangle (trunkTransaction: string, branchTransaction: string, minWeightMagnitude: number, trytes: [string], callback: Function): Promise<string>
* trunkTransaction: Hash (string)
* branchTransaction: Hash (string)
* minWeightMagnitude: number `9 for testnet; 14 for mainnet`
* trytes: [string]
* callback: Function

## Gen a random seed
```sh
# Linux
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
# OS X
cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1
```

If you are using windows, ensure python is installed and run the examples file `genRandomSeed.py` OR if nodejs is installed just run the examples file `keygen.js`

---

## ISC License (ISC)

Copyright 2019 <IFTT>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
