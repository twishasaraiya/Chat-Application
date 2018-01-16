import React from 'react';
import Message from './Message.jsx';
import {Card,List,CircularProgress} from 'material-ui';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from '../stores/ChatStore';

@connectToStores
class MessageList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      messages:[]
    };
  }

  static getStores(){
    return [ChatStore];
  }

  static getPropsFromStores(){
    return ChatStore.getState();
  }

  render(){
    var messageNodes=null;
    if(!this.props.messagesLoading){
      var msgs=this.props.messages;
      //console.log('[MessageList] Messages',msgs);
      var newMsgState=[];
      for(var msgKey in msgs){
        //console.log(msgKey,msgs[msgKey]);
        newMsgState.push(msgs[msgKey]);
      }

      messageNodes=newMsgState.map((msg)=>{
        return(
            <Message message={msg} />
        );
      });
    }else{
      messageNodes=<CircularProgress mode="indeterminate"
          style={{
            paddingTop:20,
            paddingBottom:20,
            margin:'0 auto',
            display:'block',
            width:'60px'
          }} />;
    }

    return(
      <Card style={{
        flexGrow: 2,
        marginLeft: 30
      }}>
        <List>
          {messageNodes}
        </List>
      </Card>
    );
  }
}

export default MessageList;
