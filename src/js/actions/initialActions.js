"use strict";

var Dispatcher = require('../dispatcher/dispatcher');
var FluxActions = require('../constants/fluxActions');
var Get = require('../httprequest/get');

var InitialActions  = {
	initialData: function() {

        
        var url = '/path';
        
        var dispatchval =     
            {
                actionType: FluxActions.SET_INITIALDATA,
                initialData: []
            };
        Get.getCall(url, function(res, err) {
          dispatchval.initialData = res.body
          Dispatcher.dispatch(dispatchval);	
        });

	}
};

module.exports = InitialActions;