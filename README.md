
# D3
<p align="center">
  <img src="src/assets/logo.svg">
</p>

## What is it?
This is admin panel for the D3 project - [D3](https://github.com/d3ledger/back-office)

Distributed Digital Depository is a service platform for decentralized safekeeping and settlements of tokenized crypto assets. Financial intermediaries, or custodians, directly participate in the maintenance of the system by auditing exchange process, and by voting during sidechain-to-D3 tokenization process.

[Hyperledger Iroha](https://github.com/hyperledger/iroha) is D3 ledger, which is used for voting (via multisignature accounts) and decentralized data storage.

## Getting started
To start use this application you should run this commands in terminal.
``` bash
$ git clone https://github.com/d3ledger/back-office-admin
$ cd back-office-admin
$ yarn
```

**IMPORTANT** in our application we use `yarn` for dependency management if you do not have it, you should install it - [Installation | Yarn](https://yarnpkg.com/en/docs/install)

#### ENV
1. `VUE_APP_NOTARY_URL=http://127.0.0.1:8083` - Used to connect to notary, provide IP of notary. Use this ENV when going to run or build application.
2. `VUE_APP_NOTARY_ACCOUNT=notary@notary` - Used to specify account that will be used for getting relays from.
3. `VUE_APP_RELAY_ACCOUNT_KEY=eth_registration_service@notary` - Used to specify key that will be used for getting relays from specified account.
4. `CYPRESS_IROHA=http://127.0.0.1:8081` - Used to run e2e tests, provide IP of gRPC IROHA.
5. `CYPRESS_baseUrl=http://127.0.0.1:8080` - Can be used in e2e tests, provide IP of D3 application

Also in `src/data/config.js` you can find several different parameters that can be configured.

### How to run
To run application
``` bash
$ yarn serve
```
This will serve application with hot reload.

### How to build
To build application for deployment
``` bash
$ yarn build
```

### How to test
To run tests all unit tests
``` bash
$ yarn test:unit
```

To run all e2e tests
``` bash
$ yarn test:e2e
```

**IMPORTANT** to run any e2e test need to provide `CYPRESS_IROHA`.

``` bash
$ CYPRESS_IROHA=http://127.0.0.1:8081 yarn test:e2e
```