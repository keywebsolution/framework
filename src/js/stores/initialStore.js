"initialstore"

"use strict";

var Dispatcher = require('../dispatcher/dispatcher');
var FluxActions = require('../constants/fluxActions');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var initialData = [];

var InitialStore  = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	},
	
	emitChange: function() {
		this.emit('change');
	},

	getInitialData: function() {
		return initialData;
	},
});


Dispatcher.register(function(action){

	switch(action.actionType){
		case FluxActions.SET_INITIALDATA:
			initialData = action.initialData;
			InitialStore.emitChange();
			break;
		default:
	}
});

module.exports = InitialStore;
