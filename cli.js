#!/usr/bin/env node
'use strict';

var meow = require('meow');
var apnTest = require('./');

var cli = meow({
  help: [
    'Usage',
    '  apn <message> --options',
    '  apn "Hello world" --token=uney4jcnvvw5bc2vlvazog4au1xa0zbcbsjwlfgaj1pi9blcdltgktncfxfwhs5',
    '',
    'Options',
    '  --token',
    '        (required)',
    '        The device token you wish to send the notification to',
    '        Takes a single token or a comma-separated list of tokens',
    '',
    '  --cert',
    '        (default `cert.pem`)',
    '        The `.pem` file of the connection certificate',
    '',
    '  --key',
    '        (default `cert.pem`)',
    '        The `.pem` file of the connection key',
    '',
    '  --development',
    '        Specifies the sandbox environment, hostname will be set automatically',
    '',
    '  --badge',
    '        (default 0)',
    '        The value to specify for `payload.aps.badge`',
    '',
    '  --sound',
    '        (default `ping.aiff`)',
    '        The value to specify for `payload.aps.sound`',
    '',
    '  --payload',
    '        (default `{}`)',
    '        JSON encoded payload `payload.<yourkeys>`',
    '',
    '  --expiry',
    '        (default `1 hour`)',
    '        The UNIX timestamp representing when the notification should expire.',
    '        An expiry of 0 indicates that the notification expires immediately.',
    ''
  ].join('\n')
});

if(!cli.input[0]){
  console.log('No notification message body was provided');
  return process.exit(1);
}

if(cli.flags.development){
  cli.flags.production = false;
}

// parse tokens to array of tokens
if(cli.flags.token){
  cli.flags.token = cli.flags.token.split(',');
}

if(cli.flags.payload){
  try {
    cli.flags.payload = JSON.parse(cli.flags.payload)
  } catch(e) {
    throw new Error('Tried to JSON parse payload string, but it failed with: ' + e.message);
  }
}

apnTest(cli.input[0], cli.flags, function(connection) {
  connection.on('connected', function() {
    console.log('Connected to APNS, environment:', cli.flags.production ? 'production' : 'development');
  });

  connection.on('transmitted', function(notification, device) {
    console.log('Notification sent to:', device.token.toString('hex'));
  });

  connection.on('transmissionError', function(errCode, notification, device) {
    console.error('Notification caused an error: ' + errCode + ' for device ', device, notification);
    if (errCode == 8) {
      console.log('A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox');
    }
  });

  connection.on('disconnected', function() {
    console.log('Disconnected from APNS');
  });

  connection.on('socketError', console.error);
});

