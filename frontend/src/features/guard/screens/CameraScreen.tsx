import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { C, FONTS, SHADOWS } from '../../drying/src/components/theme';

export default function CameraScreen() {
  const navigation = useNavigation<any>();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);


  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.permission}>
        <Text>Camera permission is required</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: '#2ecc71', marginTop: 10 }}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />


      {/* Capture Button */}
      <View style={styles.controls}>
        <TouchableOpacity
           style={styles.capture}
           onPress={async () => {
           if (cameraRef.current) {
           const photo = await cameraRef.current.takePictureAsync();
           navigation.navigate('Detection', { imageUri: photo.uri });
          }
         }}
         >
          <Ionicons name="camera" size={30} color={C.surface} />
        </TouchableOpacity>

      </View>

      {/* Close */}
      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={26} color={C.surface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
  },

  controls: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },

  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },

  close: {
    position: 'absolute',
    top: 40,
    right: 20,
  },

  permission: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
