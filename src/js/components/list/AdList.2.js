"use strict";

var React = require('react');
var InitialStore = require('../../stores/initialStore');
var InitialActions = require('../../actions/initialActions');
var Glist = require('./glist');

var AdList = React.createClass({
  getInitialState: function () {
    return {
      loading: true,
      adList: []      
    }; 
  },
  
  componentWillUnmount: function () {
    InitialStore.removeChangeListener(this.onStoreChange);
  },
  
  componentWillMount: function () {
    InitialStore.addChangeListener(this.onStoreChange);
  },
  
  componentDidMount: function () {
    InitialActions.initialData();
  },
  
  onStoreChange: function () {
    var newAdList = InitialStore.getInitialData();
    console.log(newAdList);
    this.setState({adList: newAdList, loading: false})
  },
  
	render: function() {
    var adListComponent = [];
    var i = 0;
    for (var x in this.state.adList) {
      adListComponent.push(
        <div key={i}>
          {this.state.adList[x]['adNumber']}
          {this.state.adList[x]['adTitle']}
          {this.state.adList[x]['adDescription']}
        </div>
      );
      i++;
    }
    
		return (
      <div>
        <Glist />
				{adListComponent}
			</div>
		);
	}	
});

module.exports = AdList;
