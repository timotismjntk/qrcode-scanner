import {Dimensions, Linking, PermissionsAndroid} from 'react-native';
import {
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import ReactNativeBlobUtil from 'react-native-blob-util';

const {width, height} = Dimensions.get('window');

const windowHeight = height > width ? height : width;
const windowWidth = width < height ? width : height;

const horizontalTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, layouts, next}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.1],
        }),
      },
    };
  },
};

const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

const removeAllDeliveredNotifications = () => {
  PushNotification.removeAllDeliveredNotifications();
};

const subscribeFromTopic = topics => {
  PushNotification.subscribeToTopic(topics);
};

const unsubscribeFromTopic = topics => {
  PushNotification.unsubscribeFromTopic(topics);
};

const downloadFile = async (url, originalName) => {
  await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );
  await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );
  if (url.length > 0) {
    const date = new Date();
    const {config, fs} = ReactNativeBlobUtil;
    const {DownloadDir} = fs.dirs;
    if (DownloadDir) {
      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true, // true will use native manager and be shown on notification bar.
          notification: true,
          path: `${DownloadDir}/sekoolah.id-${Math.floor(
            date.getTime() + date.getSeconds() / 2,
          )}${originalName}`,
          description: 'Downloading file...',
        },
      };
      config(options)
        .fetch('GET', url)
        .then(res => {});
    } else {
      Linking.openURL(url);
    }
  }
};

module.exports = {
  windowHeight,
  windowWidth,
  horizontalTransition,
  cancelAllLocalNotifications,
  removeAllDeliveredNotifications,
  subscribeFromTopic,
  unsubscribeFromTopic,
  scale,
  verticalScale,
  moderateScale,
  downloadFile,
};
