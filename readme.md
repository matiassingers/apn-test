# apn-test [![Build Status](http://img.shields.io/travis/matiassingers/apn-test.svg?style=flat-square)](https://travis-ci.org/matiassingers/apn-test) [![Dependency Status](http://img.shields.io/gemnasium/matiassingers/apn-test.svg?style=flat-square)](https://gemnasium.com/matiassingers/apn-test)
> quickly test push notifications


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
- **token** (required)
- **development**
- **badge** - (default `0`) The value to specify for `payload.aps.badge`
- **sound** - (default `ping.aiff`) The value to specify for `payload.aps.sound`
- **expiry** - (default `1 hour`) The UNIX timestamp representing when the notification should expire. An expiry of 0 indicates that the notification expires immediately.



## License

MIT © [Matias Singers](http://mts.io)
