/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  ImageBackground,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';

// import components
import Menu from '../../components/Menu';

import {
  windowWidth,
  windowHeight,
  unsubscribeFromTopic,
  cancelAllLocalNotifications,
  removeAllDeliveredNotifications,
} from '../../utils';

import {logoutSiswa} from '../../redux/reducer/SISWA/auth';
import {getProfilSaya} from '../../redux/reducer/SISWA/profilSaya';
import {clearlogAbsenSiswa} from '../../redux/reducer/SISWA/logAbsen';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {user_id = ''} = authSiswa?.data || {};
  const {profilSaya = {}} = useSelector(state => state.profilSayaSiswa) || {};
  const {
    nama = '',
    url_foto = '',
    website_id = '',
    kelas_id = '',
  } = profilSaya?.siswa || {};

  const menu = useMemo(() => {
    return [
      {
        icon: require('../../assets/icons2/web.png'),
        subtitle: '',
        title: 'Web Sekolah',
        fn: () =>
          authSiswa?.data?.domain_website &&
          Linking.openURL('https://' + authSiswa?.data?.domain_website),
      },
      {
        icon: require('../../assets/icons2/boy.png'),
        subtitle: 'Lihat dan sesuaikan data profil Anda',
        title: 'Profil Saya',
        fn: () => navigation.navigate('ProfilSayaSiswa'),
      },
      {
        icon: require('../../assets/icons2/qr-code-scan.png'),
        subtitle: 'Absen masuk dan pulang dengan scan barcode',
        title: 'Absen',
        fn: () => navigation.navigate('MulaiAbsenSiswa'),
      },
      {
        icon: require('../../assets/icons2/list.png'),
        subtitle: 'Lihat log absen Anda setiap hari',
        title: 'Log Absen',
        fn: () => navigation.navigate('LogAbsen'),
      },
      {
        icon: require('../../assets/icons2/pelanggaran.png'),
        subtitle: '',
        title: 'Pelanggaran',
        fn: () => {
          // comingSoonAlert();
          navigation.navigate('Pelanggaran');
        },
      },
      {
        icon: require('../../assets/icons2/idea.png'),
        subtitle: 'Kelola data akademik siswa',
        title: 'Akademik',
        fn: () => {
          // comingSoonAlert();
          navigation.navigate('HomeAkademikSiswa');
        },
      },
      {
        icon: require('../../assets/icons2/teacher.png'),
        subtitle: 'Lihat data seluruh Guru, Staf, dan Siswa',
        title: 'Data Guru',
        fn: () => navigation.navigate('DataGuru'),
      },
      {
        icon: require('../../assets/icons2/group-class.png'),
        subtitle: 'Lihat data seluruh Guru, Staf, dan Siswa',
        title: 'Data Siswa',
        fn: () => navigation.navigate('DataSiswa'),
      },
      {
        icon: require('../../assets/icons2/spp.png'),
        subtitle: 'Lihat SPP',
        title: 'SPPSaya',
        fn: () => {
          navigation.navigate('SPPSaya');
        },
      },
      {
        icon: require('../../assets/icons2/newspaper3.png'),
        subtitle: 'Cek update berita dan informasi sekolah',
        title: 'Berita',
        fn: () => navigation.navigate('BeritaNavigator', {screen: 'Berita'}),
      },
      {
        icon: require('../../assets/icons2/info.png'),
        subtitle: 'Cek update berita dan informasi sekolah',
        title: 'Informasi',
        fn: () => navigation.navigate('InformasiNavigator'),
      },
      {
        icon: require('../../assets/icons2/blog.png'),
        subtitle: 'Lihat tulisan guru',
        title: 'Blog Guru',
        fn: () => {
          // comingSoonAlert();
          navigation.navigate('BlogNavigator', {
            screen: 'Blog',
            params: {title: 'BLOG GURU'},
          });
        },
      },
      {
        icon: require('../../assets/icons2/blogging.png'),
        subtitle: 'Lihat tulisan siswa',
        title: 'Blog Siswa',
        fn: () => {
          // comingSoonAlert();
          navigation.navigate('BlogNavigator', {
            screen: 'Blog',
            params: {title: 'BLOG SISWA'},
          });
        },
      },
      {
        icon: require('../../assets/icons2/calendar.png'),
        subtitle: 'Lihat agenda acara sekolah',
        title: 'Agenda',
        fn: () => navigation.navigate('Agenda'),
      },
      {
        icon: require('../../assets/icons2/picture.png'),
        subtitle: 'Lihat galeri foto sekolah',
        title: 'Galeri',
        fn: () => {
          // comingSoonAlert();
          navigation.navigate('GaleriNavigator');
        },
      },
      {
        icon: require('../../assets/icons2/students2.png'),
        subtitle: 'Lihat dan sesuaikan data profil Anda',
        title: 'Data Alumni',
        fn: () => {
          navigation.navigate('DataAlumni');
        },
      },
      {
        icon: require('../../assets/icons2/whatsapp1.png'),
        subtitle: '',
        title: 'Bantuan',
        fn: () => Linking.openURL('https://sekoolah.id/wa'),
      },
    ];
  }, [authSiswa]);

  useEffect(() => {
    PushNotification.getDeliveredNotifications(notification => {
      if (notification?.length > 0) {
        notification?.forEach(data => {
          setTimeout(() => {
            PushNotification.localNotification({
              id: String(data?.identifier || ''),
              autoCancel: true,
              channelId: 'sekoolahid-default-4-10000',
              title: data?.title,
              message: data?.body,
              data: data?.userInfo,
              smallIcon: 'ic_notification',
              bigPictureUrl: data?.bigPictureUrl,
              largeIconUrl: data?.largeIconUrl,
              vibrate: true,
              vibration: 1000,
              playSound: true,
              invokeApp: true,
              color: '#0099e5',
              allowWhileIdle: true,
              priority: 'max',
              visibility: 'public',
              importance: 'max',
            });
            const clicked = data?.userInteraction;
            if (clicked) {
              data?.data?.link && Linking.openURL(data?.data?.link);
              PushNotification.cancelLocalNotification({id: data?.id});
            }
          }, 250);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (authSiswa?.data?.token?.length > 0) {
      dispatch(getProfilSaya({token: authSiswa?.data?.token}));
    }
  }, [authSiswa?.data?.token]);

  const logout = useCallback(() => {
    unsubscribeFromTopic('userById' + user_id);
    unsubscribeFromTopic('userBySekolah' + website_id);
    unsubscribeFromTopic('siswaBySekolah' + website_id);
    unsubscribeFromTopic('siswaByKelas' + kelas_id);
    unsubscribeFromTopic('topics_global');
    cancelAllLocalNotifications();
    removeAllDeliveredNotifications();
    dispatch(logoutSiswa());
    dispatch(clearlogAbsenSiswa());
  }, [user_id, website_id, kelas_id]);

  const comingSoonAlert = useCallback(() => {
    Alert.alert('Info', 'Dalam proses pengembangan.', [
      {text: 'OK', onPress: () => null},
    ]);
  }, []);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <Menu
        header={
          <View
            style={{
              overflow: 'hidden',
              marginBottom: '8%',
            }}>
            <ImageBackground
              source={require('../../assets/icons2/headerBackground.png')}
              resizeMode="stretch"
              imageStyle={{
                resizeMode: 'stretch',
                height: '100%',
                width: '100%',
                borderBottomLeftRadius: windowHeight * 0.06,
                borderBottomRightRadius: windowHeight * 0.06,
              }}
              resizeMethod="resize"
              style={styles.header}>
              <View style={styles.profilPictureWrapper}>
                {url_foto ? (
                  <Image
                    source={{uri: url_foto}}
                    style={styles.profilPicture}
                    resizeMethod="resize"
                  />
                ) : (
                  <MaterialIcons
                    name="person"
                    size={windowWidth * 0.14}
                    color="#BDBDBD"
                  />
                )}
              </View>
              <RectButton style={styles.logoutButton} onPress={logout}>
                <View style={styles.logoutButtonImageWrapper}>
                  <Image
                    source={require('../../assets/icons/logout.png')}
                    style={styles.logoutButtonImage}
                    resizeMethod="resize"
                  />
                </View>
                <Text numberOfLines={1} style={styles.logoutButtonLabel}>
                  Signout
                </Text>
              </RectButton>
              <Text style={styles.userNameTitle}>
                {nama || authSiswa?.data?.nama || '-'}
              </Text>
              <Text style={styles.siswa}>(Siswa)</Text>
            </ImageBackground>
          </View>
        }
        data={menu}
        numColumn={4}
        theme="white"
        rightIconBackgroundColor="#3B3B3B"
        useRightIcon={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: windowHeight * 0.27,
    justifyContent: 'center',
    borderBottomLeftRadius: windowHeight * 0.06,
    borderBottomRightRadius: windowHeight * 0.06,
    marginBottom: '1%',
  },
  profilPictureWrapper: {
    backgroundColor: 'white',
    height: windowHeight * 0.12,
    width: windowHeight * 0.12,
    alignSelf: 'center',
    borderRadius: windowHeight * 0.12,
    borderWidth: 0.4,
    borderColor: '#A6A6A6',
    marginBottom: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profilPicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userNameTitle: {
    color: 'black',
    alignSelf: 'center',
    fontSize: windowWidth * 0.038,
    fontFamily: 'OpenSans-Bold',
  },
  siswa: {
    fontSize: windowWidth * 0.038,
    fontFamily: 'OpenSans-Italic',
    color: 'black',
    alignSelf: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonImageWrapper: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
  },
  logoutButtonImage: {
    width: '100%',
    height: '100%',
    tintColor: 'rgba(0,0,0,0.7)',
    resizeMode: 'center',
  },
  logoutButtonLabel: {
    color: 'rgba(0,0,0,0.7)',
    alignSelf: 'center',
    fontSize: windowWidth * 0.03,
  },
});
