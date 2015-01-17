'use strict';

var apn = require('apn');
var defaults = require('lodash.defaults');
var isArray = require('lodash.isarray');
var isEmpty = require('lodash.isempty');
var noop = require('lodash.noop');

module.exports = function(message, options, callback){
  var defaultOptions = {
    cert: 'cert.pem',
    key: 'key.pem',
    fastMode: true,
    production: true,
    connectionTimeout: 1000
  };
  options = defaults(options, defaultOptions);
  callback = callback || noop;

  if(isEmpty(options.token)){
    throw new Error('Device token is required');
  }

  if(isArray(options.token)){
    var device = options.token.map(function(token) {
      return new apn.Device(token);
    });
  } else {
    if(options.token.length !== 64){
      throw new Error('Device token should be 64 characters');
    }

    var device = new apn.Device(options.token);
  }

  var connection = new apn.Connection(options);
  var notification = new apn.Notification();

  notification.alert = message || 'Hello world!';
  notification.badge = options.badge || 0;
  notification.sound = options.sound || 'ping.aiff';
  if(options.payload) {
    var payload = {};
    try {
      payload = JSON.parse(options.payload)
    } catch(e) {
      throw new Error('Invalid JSON for payload: ' + e.message);
    }
    notification.payload = payload;
  }
  notification.expiry = options.expiry || Math.floor(Date.now() / 1000) + 3600;

  connection.pushNotification(notification, device);

  return callback(connection);
};
