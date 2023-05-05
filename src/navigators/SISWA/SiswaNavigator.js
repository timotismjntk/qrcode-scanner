/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// auth screens
import LoginSiswa from '../../screens/SISWA/Login';
import LupaPasswordSiswa from '../../screens/SISWA/LupaPassword';

// user screens
// import HomeSiswa from '../../screens/SISWA/HomeNewVersion';
import HomeSiswa from '../../screens/SISWA/Home';
import ProfilSayaSiswa from '../../screens/SISWA/Profil';

// absen screens
import MulaiAbsenSiswa from '../../screens/SISWA/MulaiAbsenSiswa';
import LogAbsen from '../../screens/SISWA/LogAbsen';

// siswa screens
import DataSiswa from '../../screens/SISWA/DataSiswa';
import ProfilSiswaLain from '../../screens/SISWA/ProfilSiswaLain';

// guru screens
import DataGuru from '../../screens/SISWA/DataGuru';
import ProfilGuru from '../../screens/SISWA/ProfilGuru';

// agenda screens
import Agenda from '../../screens/SISWA/Agenda';

// alumnni screens
import DataAlumni from '../../screens/SISWA/DataAlumni';
import ProfilAlumni from '../../screens/SISWA/ProfilAlumni';

// SPP screens
import SPPSaya from '../../screens/SISWA/SPPSaya';

// pelanggaran screens
import Pelanggaran from '../../screens/SISWA/Pelanggaran';

// akademik screens
import HomeAkademikSiswa from '../../screens/SISWA/Akademik/HomeAkademikSiswa';

// anggota kelas screens
import AnggotaKelas from '../../screens/SISWA/Akademik/AnggotaKelas/AnggotaKelas';

// jadwal pelajaran screens
import JadwalPelajaran from '../../screens/SISWA/Akademik/JadwalPelajaran/JadwalPelajaran';

// pertemuan screens
import ListPertemuan from '../../screens/SISWA/Akademik/Pertemuan/Pertemuan';

// koleksi materi screens
import KoleksiMateri from '../../screens/SISWA/Akademik/KoleksiMateri/KoleksiMateri';

const Stack = createStackNavigator();
import {
  horizontalTransition,
  moderateScale,
  windowHeight,
  windowWidth,
} from '../../utils';

export default function GuruNavigator() {
  // call accesscode stored in mmkv storage
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};

  if (authSiswa?.status === 'berhasil') {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            ...horizontalTransition,
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'OpenSans-SemiBold',
              fontSize: moderateScale(15),
            },
            headerShown: false,
          }}
          name="HomeSiswa"
          component={HomeSiswa}
          lazy={true}
        />
        <Stack.Screen
          options={({route}) => ({
            headerTintColor: 'white',
            headerTitle: route?.params?.showHeaderTitle ? 'Profil Saya' : '',
            headerTransparent: true,
            headerShadowVisible: false,
            headerLeftContainerStyle: {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 10,
              width: windowWidth * 0.1,
              height: windowWidth * 0.1,
              alignItems: 'center',
              marginTop: '2%',
              marginLeft: '3%',
            },
            headerStyle: {
              elevation: 0,
            },
          })}
          name="ProfilSayaSiswa"
          component={ProfilSayaSiswa}
          lazy={true}
        />
        {[
          {
            id: 2,
            headerTitle: 'ABSEN MASUK / PULANG',
            name: 'MulaiAbsenSiswa',
            component: MulaiAbsenSiswa,
          },
          {
            id: 3,
            headerTitle: 'LOG ABSEN',
            name: 'LogAbsen',
            component: LogAbsen,
          },
          {
            id: 4,
            headerTitle: 'DATA SISWA',
            name: 'DataSiswa',
            component: DataSiswa,
          },
          {
            id: 5,
            headerTitle: 'PROFIL SISWA',
            name: 'ProfilSiswaLain',
            component: ProfilSiswaLain,
          },
          {
            id: 6,
            headerTitle: 'DATA GURU',
            name: 'DataGuru',
            component: DataGuru,
          },
          {
            id: 7,
            headerTitle: 'PROFIL GURU',
            name: 'ProfilGuru',
            component: ProfilGuru,
          },
          {
            id: 8,
            headerTitle: 'AGENDA',
            name: 'Agenda',
            component: Agenda,
          },
          {
            id: 9,
            headerTitle: 'DATA ALUMNI',
            name: 'DataAlumni',
            component: DataAlumni,
          },
          {
            id: 10,
            headerTitle: 'PROFIL ALUMNI',
            name: 'ProfilAlumni',
            component: ProfilAlumni,
          },
          {
            id: 11,
            headerTitle: 'DATA PELANGGARAN SISWA',
            name: 'Pelanggaran',
            component: Pelanggaran,
          },
          {
            id: 12,
            headerTitle: 'AKADEMIK',
            name: 'HomeAkademikSiswa',
            component: HomeAkademikSiswa,
          },
          {
            id: 13,
            headerTitle: 'ANGGOTA KELAS',
            name: 'AnggotaKelas',
            component: AnggotaKelas,
          },
          {
            id: 14,
            headerTitle: 'JADWAL PELAJARAN',
            name: 'JadwalPelajaran',
            component: JadwalPelajaran,
          },
          {
            id: 15,
            headerTitle: 'PERTEMUAN',
            name: 'ListPertemuan',
            component: ListPertemuan,
          },
          {
            id: 16,
            headerTitle: 'KOLEKSI MATERI',
            name: 'KoleksiMateri',
            component: KoleksiMateri,
          },
          {
            id: 16,
            headerTitle: 'SPP / IURAN KOMITE',
            name: 'SPPSaya',
            component: SPPSaya,
          },
        ].map(item => (
          <Stack.Screen
            key={item.id + ''}
            options={{
              ...horizontalTransition,
              headerTitleAlign: 'center',
              headerTitle: item.headerTitle,
              headerTintColor: 'black',
              headerBackground: () => (
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  source={require('../../assets/icons2/headerBackground.png')}
                />
              ),
              headerBackgroundContainerStyle: {
                overflow: 'hidden',
                backgroundColor: '#3B3B3B',
                borderBottomLeftRadius: windowWidth * 0.1,
                borderBottomRightRadius: windowWidth * 0.1,
                height: windowHeight * 0.1,
                top: windowHeight * 0.03,
                borderWidth: 1,
                borderColor: '#BDBDBD',
              },
              headerTransparent: true,
              headerTitleStyle: {
                fontFamily: 'OpenSans-SemiBold',
                top: -windowHeight * 0.003,
                fontSize: windowWidth * 0.042,
              },
              headerLeftContainerStyle: {
                top: -windowHeight * 0.003,
              },
              headerStatusBarHeight: windowHeight * 0.05,
            }}
            name={item.name}
            component={item.component}
          />
        ))}
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={({navigation}) => ({
            ...horizontalTransition,
            headerTitle: '',
            headerTransparent: true,
            headerLeft: headerLeftProp => (
              <TouchableWithoutFeedback
                onPress={() =>
                  headerLeftProp?.canGoBack
                    ? navigation?.goBack()
                    : navigation.dispatch(
                        StackActions.replace('DashboardNavigator'),
                      )
                }>
                <MaterialIcons
                  name="arrow-back"
                  size={windowWidth * 0.065}
                  style={{padding: '2%'}}
                  color="black"
                />
              </TouchableWithoutFeedback>
            ),
          })}
          name="LoginSiswa"
          component={LoginSiswa}
          lazy={true}
        />
        <Stack.Screen
          options={{
            ...horizontalTransition,
            headerTitle: '',
            headerTransparent: true,
          }}
          name="LupaPasswordSiswa"
          component={LupaPasswordSiswa}
          lazy={true}
        />
      </Stack.Navigator>
    );
  }
}
