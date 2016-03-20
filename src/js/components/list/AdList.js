import React from 'react';

import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

function convertUnicode(input) {
  if (input) {
    return input.replace(/\\u(\w{4,4})/g,function(a,b) {
      var charcode = parseInt(b,16);
      return String.fromCharCode(charcode);
    });
  }
  return '';
}

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

  
const AdList = React.createClass({
  openNew(x, e) {
    let url = 'http://www.clasificadosonline.com/UDTransDetail.asp?AutoNumAnuncio=' + x;
    let win = window.open(url, '_blank');
    win.focus();
    this.props.clickedAd(x);
  },
  render: function() {
    let adImgThumbnail = "http://imgcache.clasificadosonline.com/"  + this.props.adThumbnail;
		let partnerAvatar;
    if (this.props.adPartner != '' && this.props.adPartner != undefined) {
      partnerAvatar = (<Avatar>D</Avatar>);
    }
    return (
      <div>
      
      <div className="pure-grid-uxl-2-12"></div>
      <div className="pure-grid-uxl-8-12">
            <ListItem
              leftAvatar={<Avatar size={40} src={adImgThumbnail} />}
              rightAvatar={partnerAvatar}
              onClick={this.openNew.bind(this, this.props.adNumber)}
              primaryText={this.props.adTitle}
              secondaryText={
                <div>
                  <span style={{color: this.props.adColor}}>{this.props.adTitle}</span> --
                  
                  <div>{this.props.adPrice} - {convertUnicode(this.props.adLocation)} - {this.props.adPartner}
                  </div>
                  </div>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
      </div>
      <div className="pure-grid-uxl-2-12"></div>
      </div>
  
		);
  }
});

export default AdList;