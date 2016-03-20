"use strict";

var request = require('superagent');

var Dispatcher = require('../dispatcher/dispatcher');


var Get  = {
	
    getCall: function(url, callBack) {
        request
            .get(url)
          //  .set('Content-Type', 'application/json')
            .end(function(err, res) {
              callBack(res, err)
            });
    }
};

module.exports = Get;
