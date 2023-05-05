/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import {useIsFocused} from '@react-navigation/native';

// components
import Magnifier from './components/Magnifier';
import SuccessModal from '@src/components/SuccessModal';

// import hooks
import usePushAbsenWithScanner from './hooks/usePushAbsenWithScanner';
import useGoogleVisionBarcode from './hooks/useGoogleVisionBarcode';
import useKeepAwake from './hooks/useKeepAwake';

// utils
import {windowWidth, windowHeight} from '../../../utils';

// width (height of portrait orientation)
const viewfinderWidth = Dimensions.get('screen').width * 0.65;
// height (width of portrait orientation)
const viewfinderHeight = Dimensions.get('screen').width * 0.65;

const compareBounds = (obj1, obj2) =>
  obj1.x < obj2.x + obj2.width &&
  obj1.x + obj1.width > obj2.x &&
  obj1.y < obj2.y + obj2.height &&
  obj1.y + obj1.height > obj2.y;

const viewFinderBounds = {
  height: viewfinderHeight,
  width: viewfinderWidth,
  x: (windowWidth - viewfinderWidth) / 2,
  y: (windowHeight - viewfinderHeight) / 2,
};

export default function Index({route, navigation}) {
  useKeepAwake();
  const cameraRef = useRef(null);
  const [output, setOutput] = useState('');
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [zoom, setZoom] = useState(0.2);
  const [barcodeDetectedBounds, setBarcodeDetectedBounds] = useState({});
  const isFocused = useIsFocused();
  const {
    statusAbsen,
    openModalSuccess,
    isLoadingPushAbsenWithScanner,
    pushAbsenWithScanner,
  } = usePushAbsenWithScanner({
    cameraRef,
    setOutput,
    setBarcodeDetectedBounds,
  });
  const {onGoogleVisionBarcodesDetected} = useGoogleVisionBarcode({
    compareBounds,
    viewFinderBounds,
    setBarcodeDetectedBounds,
    output,
    setOutput,
    cameraRef,
    pushAbsenWithScanner,
    route,
  });

  const cameraTypeHandler = useCallback(() => {
    setCameraType(prev =>
      prev === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  }, []);

  if (isFocused) {
    return (
      <>
        <RNCamera
          ref={cameraRef}
          captureAudio={false}
          style={{flex: 1}}
          type={cameraType}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          autoFocusPointOfInterest={{
            x: 0.5,
            y: 0.5,
          }}
          cameraViewDimensions={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
          }}
          onCameraReady={() => {
            setZoom(0);
          }}
          zoom={zoom}
          maxZoom={1}
          onGoogleVisionBarcodesDetected={onGoogleVisionBarcodesDetected}
          googleVisionBarcodeType={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE
          }
          googleVisionBarcodeMode={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode
              .ALTERNATE
          }
          playSoundOnCapture
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <StatusBar
            animated={true}
            translucent
            backgroundColor="transparent"
          />
          <BarcodeMask
            width={viewfinderWidth}
            height={viewfinderHeight}
            showAnimatedLine
            outerMaskOpacity={0.5}
            edgeBorderWidth={4}
            edgeWidth={35}
            animatedLineColor="#0099e5"
            lineAnimationDuration={800}
            edgeHeight={35}
            useNativeDriver
          />
          {isLoadingPushAbsenWithScanner && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={windowWidth * 0.1} color="#0079c1" />
            </View>
          )}
          {barcodeDetectedBounds &&
            Object.keys(barcodeDetectedBounds)?.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: '#a5acaf',
                  width: barcodeDetectedBounds?.size?.width
                    ? barcodeDetectedBounds?.size?.width
                    : 0,
                  height: barcodeDetectedBounds?.size?.height || 0,
                  left:
                    cameraType === RNCamera.Constants.Type.back
                      ? barcodeDetectedBounds?.origin?.x || 0
                      : 0,
                  right:
                    cameraType === RNCamera.Constants.Type.back
                      ? 0
                      : barcodeDetectedBounds?.origin?.x || 0,
                  top: barcodeDetectedBounds?.origin?.y || 0,
                }}
              />
            )}
          <Magnifier setZoom={setZoom} />
          <TouchableOpacity
            onPress={cameraTypeHandler}
            activeOpacity={0.5}
            style={styles.cameraFlipContainer}>
            <View style={styles.cameraFlipWrapper}>
              <Image
                style={styles.cameraFlip}
                source={require('./assets/images/flip.png')}
              />
            </View>
          </TouchableOpacity>
        </RNCamera>
        {openModalSuccess && (
          <SuccessModal open={openModalSuccess} text={statusAbsen} />
        )}
      </>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  cameraFlipContainer: {
    padding: '2%',
    position: 'absolute',
    right: 25,
    top: windowHeight * 0.06,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: windowWidth * 0.08,
  },
  cameraFlipWrapper: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
  },
  cameraFlip: {
    width: '100%',
    height: '100%',
    tintColor: 'white',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: windowHeight * 0.15,
    alignSelf: 'center',
  },
});
