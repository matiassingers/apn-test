'use strict';

var apn = require('apn');
var _ = require('lodash');

function createDeviceTokens(token) {
  if(!token || _.isEmpty(token)){
    throw new Error('Device token is required');
  }

  // Array of tokens
  if(_.isArray(token)){
    return token.map(function(token) {
      return new apn.Device(token);
    });
  }

  // Simple length validation for the token length
  if(token.length !== 64){
    throw new Error('Device token should be 64 characters');
  }

  return new apn.Device(token);
}

module.exports = function(message, options, callback){
  var defaultOptions = {
    cert: 'cert.pem',
    key: 'key.pem',
    fastMode: true,
    production: true,
    connectionTimeout: 1000
  };
  options = _.defaults(options, defaultOptions);
  callback = callback || _.noop;

  var device = createDeviceTokens(options.token);

  var connection = new apn.Connection(options);
  var notification = new apn.Notification();

  notification.alert = message || 'Hello world!';
  notification.badge = options.badge || 0;
  notification.sound = options.sound || 'ping.aiff';
  notification.payload = options.payload || {};
  notification.expiry = options.expiry || Math.floor(Date.now() / 1000) + 3600;

  connection.pushNotification(notification, device);

  return callback(connection);
};
