import * as React from 'react';
import { View, StyleSheet, Button , Image , TouchableOpacity , Text } from 'react-native';
import { Video } from 'expo-av';
import { useState , useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

export default function AppVideo() {
  const videoss = React.useRef(null);
  const [status, setStatus] = useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [video, setVideo] = useState('')
  const [recording,setRecording] = useState(false)
  let camera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      const { audioStatus } = await Audio.requestPermissionsAsync();
      console.log('status ===>', status)
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (camera) {
        if(!recording){
            setRecording(true)
            const videos = await camera.recordAsync()
            setVideo(videos.uri)
            console.log('video ***', videos)
        }
        else{
            setRecording(false)
            camera.stopRecording()
        }
    }
  }

  
  return (
    <View style={styles.container}>
      {video ? 
      <Video
        ref={videoss}
        style={styles.video}
        source={{
            uri: video,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
        :
        <Camera
          ref={ref => {
            camera = ref
          }}
          style={styles.camera}
          type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Image 
               style={styles.tinyLogo}
              source={{
                uri: "https://cdn.iconscout.com/icon/premium/png-512-thumb/camera-1564671-1325543.png"
              }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignSelf:'flex-end'}}
              onPress={snap}>
             <View style={styles.view1}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:50,
                 borderColor: recording ? "red":'white',
                 height: 85,
                 width:85,
                 backgroundColor: recording ? "red":'white'}} >
              </View>
            </View>
            </TouchableOpacity>
          </View>
        </Camera>
       } 
    </View>
  );
}

const styles = StyleSheet.create({

    view1:{
        borderWidth: 2,
        borderRadius:50,
        borderColor: 'white',
        height: 100,
        width:100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
      width:360,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.5,
      // alignSelf:'flex-end',
    },
    tinyLogo: {
      width: 70,
      height: 70,
      marginTop:'570%',
      backgroundColor: "white",
      borderRadius: 50
    },
    displayImage: {
        width:360,
        height:780,
    },
    video: {
        alignSelf: 'center',
        width: 330,
        height: 600,
      },
  });