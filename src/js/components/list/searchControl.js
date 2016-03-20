import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
  
const AdList = React.createClass({
  
  searchArray() {
    this.props.searchArray(this.refs.SearchArr.getValue(), this.props.propValue);
  },
  
  render: function() {
    let labelText = "Search";
    if (this.props.text != '' && this.props.text != undefined) {
      labelText = this.props.text;
    }
		return (
      <div>
        <TextField ref="SearchArr" />
        <RaisedButton onClick={this.searchArray}  label={labelText}  />
      </div>
		);
  }
});

export default AdList;