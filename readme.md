# apn-test [![Build Status](http://img.shields.io/travis/matiassingers/apn-test.svg?style=flat-square)](https://travis-ci.org/matiassingers/apn-test) [![Dependency Status](http://img.shields.io/gemnasium/matiassingers/apn-test.svg?style=flat-square)](https://gemnasium.com/matiassingers/apn-test)  [![Coverage Status](http://img.shields.io/coveralls/matiassingers/apn-test.svg?style=flat-square)](https://coveralls.io/r/matiassingers/apn-test)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/matiassingers/apn-test?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
> easily send a test push notification


## Install

```sh
$ npm install --save apn-test
```


## Usage

```js
var apnTest = require('apn-test');

var message = 'Hello';
var options = {
  cert: '/path/to/pushCert.pem',
  key: '/path/to/pushKey.pem',
  token: 'uney4jcnvvw5bc2vlvazog4au1xa0zbcbsjwlfgaj1pi9blcdltgktncfxfwhs5'
};

apnTest(message, options);
```


## CLI

```sh
$ npm install --global apn-test
```

```sh
$ apn --help

  quickly test push notifications
    
  Usage
    apn <message> --options
    apn "Hello world" --token=uney4jcnvvw5bc2vlvazog4au1xa0zbcbsjwlfgaj1pi9blcdltgktncfxfwhs5
    
  Options
    --token
          (required)
          The device token you wish to send the notification to
          Takes a single token or a comma-separated list of tokens
```

### Debug
Enable debug messages by running the CLI with `DEBUG=apn`, like so:
```sh
$ DEBUG=apn apn <message> --options
```
See the [`node-apn`](https://github.com/argon/node-apn#debugging) documentation for more details.


## Options

Pass in args to the CLI with this syntax: `apn --foo=bar`.
- **cert** (default `cert.pem`)
- **key** (default `key.pem`)
- **token** (required) accepts single token or a comma-separated list of tokens
- **development**
- **badge** - (default `0`) The value to specify for `payload.aps.badge`
- **sound** - (default `ping.aiff`) The value to specify for `payload.aps.sound`
- **payload** - (default `{}`) JSON encoded extra payload values
- **expiry** - (default `1 hour`) The UNIX timestamp representing when the notification should expire. An expiry of 0 indicates that the notification expires immediately.


## Related
- [`grunt-xcode`](https://github.com/matiassingers/grunt-xcode)
- [`ipa-metadata`](https://github.com/matiassingers/ipa-metadata)
- [`entitlements`](https://github.com/matiassingers/entitlements)
- [`provisioning`](https://github.com/matiassingers/provisioning)


## License

MIT © [Matias Singers](http://mts.io)
