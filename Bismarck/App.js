//Import React
import React, { Component } from 'react';
//Import Basic React Native Component
import { Platform, StyleSheet, Text, View } from 'react-native';
//Import React Native Video to play video
import Video from 'react-native-video';
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
// For navigation between pages
import { NativeRouter, Route, Link } from "react-router-native";
// For timestamping
var moment = require("moment");
// For timestamp synchronization
var firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyAn_mPJ2bBVWPLAms_gTNFSAecCtGIA53I",
  authDomain: "bismarck-a7d2f.firebaseapp.com",
  databaseURL: "https://bismarck-a7d2f.firebaseio.com",
  projectId: "bismarck-a7d2f",
  storageBucket: "bismarck-a7d2f.appspot.com",
  messagingSenderId: "991036476249",
  appId: "1:991036476249:web:ba145381c33bba4eb51a48"
};
// initialize firebase app
firebase.initializeApp(firebaseConfig);
var ref = firebase.app().database().ref();
// Splash: root screen which greets users
class Splash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link style={{flex: 1, flexDirection: "row"}} to="/VideoPlayer">
        <View style={{flex: 1, flexDirection: "row"}}>
          <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
            <Text style={{textAlign: "center", textAlignVertical: "center"}}>Tap To Get Started</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'grey'}}/>
          <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
            <Text style={{textAlign: "center", textAlignVertical: "center"}}>Tap To Get Started</Text>
          </View>
        </View>
      </Link>
    );
  }
}
// VideoPlayer: plays testing video
class VideoPlayer extends Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: true,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
    };
    var date = new Date();
    ref.child("timestamps").push("Video-begin"+date.getMonth()+"month "+date.getDate()+"date "+moment().get("hour") + "hours " + moment().get("minute") + "minutes " + moment().get("second") + "seconds " + moment().get("millisecond") + "milliseconds");
  }
 
  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };
 
  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: false,
      playerState,
    });
  };
 
  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };
 
  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
      var date = new Date();
      ref.child("timestamps").push(data.currentTime+"data.currentTime (videoProgress)"+date.getMonth()+"month "+date.getDate()+"date "+moment().get("hour") + "hours " + moment().get("minute") + "minutes " + moment().get("second") + "seconds " + moment().get("millisecond") + "milliseconds");
    }
    if (!isLoading && playerState === PLAYER_STATES.ENDED) {
      var date = new Date();
      ref.child("timestamps").push("Video-End"+date.getMonth()+"month "+date.getDate()+"date "+moment().get("hour") + "hours " + moment().get("minute") + "minutes " + moment().get("second") + "seconds " + moment().get("millisecond") + "milliseconds");
    }
  };
  
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: true });
  
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
  };
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
    this.setState({ screenType: 'cover' });
  };
  onSeeking = currentTime => this.setState({ currentTime });
  render() {
    return (
      <View style={styles.container}>
        <Video
        style={{flex: 1, flexDirection: "row"}}
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{ uri: 'https://r1---sn-q4fl6ne6.googlevideo.com/videoplayback?expire=1574571092&ei=87fZXb2SEduolQSi_ojQAQ&ip=95.216.24.230&id=o-AJulWZ8aCFPe45CrfCx06FZldlqdLG0lMSEurx1CQiC5&itag=22&source=youtube&requiressl=yes&pcm2=no&mime=video%2Fmp4&ratebypass=yes&dur=741.064&lmt=1540626570706662&fvip=1&fexp=23842630&c=WEB&txp=5431432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cmime%2Cratebypass%2Cdur%2Clmt&host=r1---sn-5go7yner.googlevideo.com&sig=ALgxI2wwRQIhAODSmdNNWKT3AiP2zU5OT0FgEeM1TijrgVyRdZ4o6Nq4AiB9uRjRW1mwcId1WWxFRGrg2Fg8OMxdi0ua6B2j1K4JpQ==&redirect_counter=1&cm2rm=sn-5gold7e&req_id=b21074369137a3ee&cms_redirect=yes&mip=2601:647:4d00:a0::da2d&mm=34&mn=sn-q4fl6ne6&ms=ltu&mt=1574549388&mv=u&mvi=0&pl=21&lsparams=mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRQIhAK6_3HR1VskCjD1rs3dExHJ-1ZBoyFhuBsp0zAOYtpg8AiAtfWQQmVPqV6AfnxY6KXXve--vDsWACnMNX9Fr313msA==' }}
          style={styles.mediaPlayer}
          volume={0}
        />
      </View>
    );
  }
}

function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Splash} />
      <Route path="/VideoPlayer" component={VideoPlayer} />
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
export default App;