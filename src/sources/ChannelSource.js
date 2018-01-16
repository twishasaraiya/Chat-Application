import Actions from '../actions';
import firebase from '../components/firebase.js';

var firebaseRef=firebase.database().ref('channels');
var firebaseMsgsRef=firebase.database().ref('messages');

let ChannelSource ={
  addChannel:{
    remote(state){

      return new Promise((resolve,reject)=>{
        if(!firebaseRef){
          return resolve();
        }
        console.log('[ChannelSource]Push channel to firebase');
        let newChannelObj={
          "name":state.newChannelName
        };
        //console.log('[ChannelSource]State',state);
        firebaseRef.update({
          [state.newChannelName]:newChannelObj
        });
        //initial msg to be displayed
        let firstMsgObj={
          "first":{
            "message":"Welcome",
            "date":new Date().toUTCString(),
            "profilePic":"https://cdn2.iconfinder.com/data/icons/duo-business/512/boss_portrait-512.png"
          }
        };

        firebaseMsgsRef.update({
          [state.newChannelName]: firstMsgObj
        });

        resolve();
      });
    },
    success:Actions.channelAddSuccess,
    error:Actions.channelAddError
  },
  getChannels:{
    remote(state){
      return new Promise((resolve,reject)=>{
        firebaseRef.once('value',(snapshot)=>{
          var channels=snapshot.val();
          resolve(channels);

          firebaseRef.on("child_added",(channel)=>{
            //console.log('[ChannelSource]Display new Channel',channel);
            let channelVal=channel.val();
            channelVal.key=channel.key;
            Actions.newChannelReceived(channelVal);
          });
        });
      });
    },
    success: Actions.channelsReceived,
    error: Actions.channelsFailed
  }
}

export default ChannelSource;
