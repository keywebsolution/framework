import React from 'react';
import InitialStore  from '../../stores/initialStore';
import InitialActions from '../../actions/initialActions';
import List from 'material-ui/lib/lists/list';
import RaisedButton from 'material-ui/lib/raised-button';
import AdList from './AdList';
import SearchControl from './searchControl';

const AdListManager = React.createClass({
  getInitialState() {
    return {
      loading: true,
      adList: [],
      adCount: 0,
      clickedAds: []
    }; 
  },
  
  componentWillUnmount() {
    InitialStore.removeChangeListener(this.onStoreChange);
  },
  
  componentWillMount() {
    InitialStore.addChangeListener(this.onStoreChange);
  },
  
  componentDidMount() {
    InitialActions.initialData();
  },
  
  onStoreChange() {
    let newAdList = InitialStore.getInitialData();
    this.setState({adList: newAdList, loading: false})
  },
  
  searchArray(x, propValue) {
    let searchString = x;
    console.log(propValue);
    let newArray = this.state.adList.filter(function (key) {
      let str = String(key[propValue]);
      str = str.toUpperCase();
      let n = str.search(searchString.toUpperCase());
      if (n != -1) {
        return true;
      }
      return false;
    });
    this.updateArray(newArray);
  },
  
  updateArray(arr) {
    this.setState({adList: arr, adCount: 30});
  },
  
  showMore() {
    this.setState({adCount: this.state.adCount + 30});  
  },
  
  clickedAd(x) {
    let clickedAds = this.state.clickedAds;
    clickedAds.push(x);
    this.setState({clickedAds: clickedAds});  
  },
  
  reset() {
    let newAdList = InitialStore.getInitialData();
    this.setState({adList: newAdList, loading: false, adCount:0})
  },
	render: function() {
    let adListComponent = [];
    let i = 0;
    for (let x in this.state.adList) {
      if (i == this.state.adCount) {
        break;
      }
      i++;
      let clickedColor = 'blue';
      if (-1 != this.state.clickedAds.indexOf(this.state.adList[x]['adNumber'])){
        clickedColor = 'purple';
      }
      adListComponent.push(
        <AdList 
          adColor={clickedColor}
          key={this.state.adList[x]['adNumber']}
          clickedAd={this.clickedAd}
          adNumber={this.state.adList[x]['adNumber']}
          adThumbnail={this.state.adList[x]['adImageThumbnail']}
          adLocation={this.state.adList[x]['adLocation']} 
          adTitle={this.state.adList[x]['adTitle']} 
          adPrice={this.state.adList[x]['adPrice']} 
          adPartner={this.state.adList[x]['adPartner']}
          />
      );

    }
    
    console.log(this.state.adList.length);
    let showMore;
    if (this.state.adCount < this.state.adList.length) {
        showMore = (<RaisedButton onClick={this.showMore} label="Show More"  /> );
    }
		return (
      <div>
        <SearchControl
          propValue={"adTitle"}
          searchArray={this.searchArray}
          text={"Filter By Title"}
          />
          <SearchControl
          propValue={"adYear"}
          searchArray={this.searchArray}
          text={"Filter By Year"}
          />
          <SearchControl
          propValue={"adLocation"}
          searchArray={this.searchArray}
          text={"Filter By Location"}
          />
          <SearchControl
          propValue={"adPartner"}
          searchArray={this.searchArray}
          text={"Filter By Partner"}
          />
          <RaisedButton onClick={this.reset} label="Reset"  />
        <List>
          {adListComponent}
        </List>
        {showMore}
      </div>
      
		);
	},
});

module.exports = AdListManager;
