import alt from '../alt';
import {decorate, bind, datasource} from 'alt-utils/lib/decorators';
import Actions from '../actions';
import ChannelSource from '../sources/ChannelSource';
import MessageSource from '../sources/MessageSource';


@datasource(ChannelSource, MessageSource)
@decorate(alt)
class ChatStore{
  constructor(){
      this.state={
        user:null,
        messages:null,
        messagesLoading:true,
        newChannelName:null
      };
  }

  @bind(Actions.addNewChannel)
  addNewChannel(channelName){
    console.log('[ChatStore]New Channel',channelName);
    this.state.newChannelName=channelName;
    setTimeout(this.getInstance().addChannel,10);

  }

  @bind(Actions.sendMessage)
  sendMessage(message){
    this.state.message=message;
    setTimeout(this.getInstance().sendMessage,10);
  }

  @bind(Actions.channelOpened)
  channelOpened(selectedChannel){
    console.log('[ChatStore]Selected Channel->',selectedChannel);
    //console.log('[ChatStore]state.channels->',this.state.channels);
    var channelsCopy=this.state.channels;
    for(var channelKey in channelsCopy){
      //console.log('[ChatStore] Channel->',channelsCopy);
      channelsCopy[channelKey].selected=false;
    }
    selectedChannel.selected=true;
    this.setState({
      selectedChannel,
      channels:channelsCopy
    });

    setTimeout(this.getInstance().getMessages,100);
  }

  @bind(Actions.newChannelReceived)
  newChannelReceived(channel){
    //console.log('[ChatStore]new Channel',channel);
    if(this.state.channels[channel.key]){
      return;
    }

    this.state.channels[channel.key]=channel;

    this.setState({
      channels:this.state.channels
    });
  }


  @bind(Actions.newMessageReceived)
  newMessageReceived(msg){
    //console.log('[ChatStore]new message',msg);
    if(this.state.messages[msg.key]){
      return;
    }

    this.state.messages[msg.key]=msg;

    this.setState({
      messages:this.state.messages
    });
  }

  @bind(Actions.messagesLoading)
  messagesLoading(){
    this.setState({
      messagesLoading:true
    });
  }

  @bind(Actions.messagesReceived)
  receivedMessages(messages){
    console.log('[ChatStore]ReceivedMsgs->',messages);
    Object.keys(messages).forEach((k)=>{
      messages[k].key=k;
    });
    this.setState({
      messages,
      messagesLoading:false
    })
  }

  @bind(Actions.channelsReceived)
  receivedChannels(channels){
    //console.log(channels);
    let selectedChannel;
    Object.keys(channels).forEach((key,index)=>{
      //console.log('key',key,' index',index,' val ',channels[key]);
      channels[key].key=key;
      if(index==0){
        channels[key].selected =true;
        selectedChannel=channels[key];
      }
    });
    this.setState({
      channels,
      selectedChannel
    });

    setTimeout(this.getInstance().getMessages,100);
  }

  @bind(Actions.login)
  login(user){
    this.setState({user:user});
  }
}

export default alt.createStore(ChatStore);
