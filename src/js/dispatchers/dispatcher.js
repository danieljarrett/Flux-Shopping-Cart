var Promise = require('es6-promise').Promise;
var assign = require('object-assign');

var _callbacks = [];
var _promises = [];

var _addPromise = function(callback, payload) {
  _promises.push(new Promise(function(resolve, reject) {
    if (callback(payload)) {
      resolve(payload);
    } else {
      reject(new Error('Dispatcher callback unsuccessful'));
    }
  }));
};

var _clearPromises = function() {
  _promises = [];
};

var Dispatcher = function() {};

Dispatcher.prototype = assign(Dispatcher.prototype, {
  register: function(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1; // index
  },
  dispatch: function(payload) {
    _callbacks.forEach(function(callback) {
      _addPromise(callback, payload);
    });
    Promise.all(_promises).then(_clearPromises);
  }
});

module.exports = Dispatcher;
