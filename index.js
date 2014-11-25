'use strict';

var apn = require('apn');
var defaults = require('lodash.defaults');

module.exports = function(message, options, callback){
  var defaultOptions = {
    cert: 'cert.pem',
    key: 'key.pem',
    fastMode: true,
    production: true,
    connectionTimeout: 1000
  };
  options = defaults(options, defaultOptions);

  if(!options.token){
    throw new Error('Device token is required');
  }

  if(options.token.length !== 64){
    throw new Error('Device token should be 64 characters');
  }

  var connection = new apn.Connection(options);
  var device = new apn.Device(options.token);
  var notification = new apn.Notification();

  notification.alert = message || 'Hello world!';
  notification.badge = options.badge || 0;
  notification.sound = options.sound || 'ping.aiff';
  notification.expiry = options.expiry || Math.floor(Date.now() / 1000) + 3600;

  connection.pushNotification(notification, device);

  return callback(connection);
};
