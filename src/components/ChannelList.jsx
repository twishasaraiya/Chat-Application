import React from 'react';
import Channel from './Channel.jsx';
import {Card,List,CircularProgress,RaisedButton,Dialog,TextField} from 'material-ui';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from '../stores/ChatStore';
import Actions from '../actions';

@connectToStores
class ChannelList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      open:false,
      channelName:''
    };
    ChatStore.getChannels();
  }

  static getStores(){
    return [ChatStore];
  }

  static getPropsFromStores(){
      return ChatStore.getState();
  }

  handleOpen(){
   this.setState({open: true});
 };

 handleClose(){
   this.setState({open: false});
 };

 handleChange(e){
   this.setState({
     channelName:e.target.value
   })
 }

 onKeyUp(evt){
   if(evt.keyCode === 13){
     evt.preventDefault();

     Actions.addNewChannel(this.state.channelName);

     this.setState({
       open:false,
       channelName:""
     });
     //console.log('Add a new Channel',evt.target.value);
   }
 }

  render(){
    if(!this.props.channels){
      return(
        <Card style={{
          flexGrow:1
        }}>
          <CircularProgress
              mode="indeterminate"
              style={{
                paddingTop:'20px',
                paddingBottom:'20px',
                margin:'0 auto',
                display:'block',
                width: '60px'
              }}
            ></CircularProgress>
        </Card>
      );
    }
    //console.log('[ChannelList]Channels',this.props.channels);
    var channels=this.props.channels;
    var newChannelState=[];
    for(var channelKey in channels){
    //  console.log(channelKey,channels[channelKey]);
      newChannelState.push(channels[channelKey]);
    }
    var channelNodes= newChannelState.map((channel)=>{
      //console.log(channel);
      return(
        <Channel channel={channel} />
      );
    });

    return(
      <Card style={{
        flexGrow: 1
      }}>
        <List>
          {channelNodes}
        </List>
        <RaisedButton
          label="Add Channel"
          primary={true}
          onClick={this.handleOpen.bind(this)}
          fullWidth={true} />
        <Dialog title="Add a new Channel"
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose.bind(this)}>
                <TextField hintText="Your Channel name"
                      floatingLabelText="Channel Name"
                      value={this.state.channelName}
                      onChange={this.handleChange.bind(this)}
                      onKeyUp={this.onKeyUp.bind(this)}/>
        </Dialog>
      </Card>
    );
  }
}

export default ChannelList;
