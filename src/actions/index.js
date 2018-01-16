import alt from '../alt';
import firebase, {auth, provider} from '../components/firebase.js';

class Actions{
  constructor(){
    this.generateActions(
      'channelsReceived',
      'channelsFailed',
      'messagesReceived',
      'messagesFailed',
      'channelOpened',
      'messagesLoading',
      'sendMessage',
      'messageSendSuccess',
      'messageSendError',
      'newMessageReceived',
      'addNewChannel',
      'channelAddSuccess',
      'channelAddError',
      'newChannelReceived'
    );
  }
    login(args){
      return (dispatch) => {
        var firebaseRef= firebase.database();
        auth.signInWithPopup(provider).then((result)=>{
          const user=result.user;
          console.log('[Actions/index.js]',user);
          dispatch(user);
        });
      }
    }
}

export default alt.createActions(Actions);
