/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// auth screens
import LoginGuru from '../../screens/GURU/Login';
import LupaPasswordGuru from '../../screens/GURU/LupaPassword';

// user screens
import HomeGuru from '../../screens/GURU/Home';
// import HomeGuru from '../../screens/GURU/HomeNewVersion';
import ProfilSayaGuru from '../../screens/GURU/Profil';

// absen screens
import MulaiAbsenGuru from '../../screens/GURU/MulaiAbsenGuru';
import AbsenSiswa from '../../screens/GURU/AbsenSiswa';

// log absen screens
import LogAbsen from '../../screens/GURU/LogAbsen';
import LogAbsenSiswa from '../../screens/GURU/LogAbsenSiswa';
import LogAbsenKelas from '../../screens/GURU/LogAbsenKelas';

// siswa screens
import DataSiswa from '../../screens/GURU/DataSiswa';
import ProfilSiswa from '../../screens/GURU/ProfilSiswa';

// guru lain screens
import DataGuru from '../../screens/GURU/DataGuru';
import ProfilGuruLain from '../../screens/GURU/ProfilGuruLain';

// izin screens
import TambahIzinSiswa from '../../screens/GURU/TambahIzinSiswa';

// agenda screens
import Agenda from '../../screens/GURU/Agenda';

// alumni screens
import DataAlumni from '../../screens/GURU/DataAlumni';
import ProfilAlumni from '../../screens/GURU/ProfilAlumni';

// pelanggaran siswa screens
import HomePelanggaranSiswa from '../../screens/GURU/Pelanggaran/HomePelanggaranSiswa';
import DataPelanggaranSiswa from '../../screens/GURU/Pelanggaran/DataPelanggaranSiswa';
import TambahPelanggaranSiswa from '../../screens/GURU/Pelanggaran/TambahPelanggaranSiswa';
import UbahPelanggaranSiswa from '../../screens/GURU/Pelanggaran/UbahPelanggaranSiswa';
import PoinPelanggaranSiswa from '../../screens/GURU/Pelanggaran/PoinPelanggaranSiswa';

// akademik screens
import HomeAkademikGuru from '../../screens/GURU/Akademik/HomeAkademikGuru';

// anggota kelas screens
import AnggotaKelas from '../../screens/GURU/Akademik/AnggotaKelas/AnggotaKelas';

// jadwal pelajaran screens
import JadwalPelajaran from '../../screens/GURU/Akademik/JadwalPelajaran/JadwalPelajaran';

// pertemuan screens
import HomePertemuan from '../../screens/GURU/Akademik/Pertemuan/HomePertemuan';
import BuatPertemuan from '../../screens/GURU/Akademik/Pertemuan/BuatPertemuan';
import ListPertemuan from '../../screens/GURU/Akademik/Pertemuan/Pertemuan';

// koleksi materi screens
import KoleksiMateri from '../../screens/GURU/Akademik/KoleksiMateri/KoleksiMateri';

// amprah gaji screens
import AmprahGaji from '../../screens/GURU/AmprahGaji';

// SPP screens
import SPP from '../../screens/GURU/SPP';
import SPPDetail from '../../screens/GURU/SPPDetail';

// pilih jenis absen scanner siswa
import PilihJenisAbsenScannerSiswa from '../../screens/GURU/PilihJenisAbsenScannerSiswa';

// scanner screens
import Scanner from '../../screens/GURU/Scanner';

const Stack = createStackNavigator();
import {
  horizontalTransition,
  moderateScale,
  windowHeight,
  windowWidth,
} from '../../utils';

export default function GuruNavigator() {
  // call accesscode stored in mmkv storage
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};

  if (authGuru?.status === 'berhasil') {
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
          name="HomeGuru"
          component={HomeGuru}
          lazy={true}
        />
        <Stack.Screen
          options={({route}) => ({
            headerTintColor: 'white',
            headerTitle: route?.params?.showHeaderTitle ? 'Profil Saya' : '',
            headerTransparent: true,
            headerShadowVisible: false,
            headerStyle: {
              elevation: 0,
            },
            headerLeftContainerStyle: {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 10,
              width: windowWidth * 0.1,
              height: windowWidth * 0.1,
              alignItems: 'center',
              marginTop: '2%',
              marginLeft: '3%',
            },
          })}
          name="ProfilSayaGuru"
          component={ProfilSayaGuru}
          lazy={true}
        />
        {[
          {
            id: 2,
            headerTitle: 'ABSEN MASUK / PULANG',
            name: 'MulaiAbsenGuru',
            component: MulaiAbsenGuru,
            horizontalTransition,
          },
          {
            id: 3,
            headerTitle: 'ABSEN SISWA',
            name: 'AbsenSiswa',
            component: AbsenSiswa,
            horizontalTransition,
          },
          {
            id: 4,
            headerTitle: 'LOG ABSEN',
            name: 'LogAbsen',
            component: LogAbsen,
            horizontalTransition,
          },
          {
            id: 5,
            headerTitle: 'LOG ABSEN SISWA',
            name: 'LogAbsenSiswa',
            component: LogAbsenSiswa,
            horizontalTransition,
          },
          {
            id: 6,
            headerTitle: 'LOG ABSEN KELAS',
            name: 'LogAbsenKelas',
            component: LogAbsenKelas,
            horizontalTransition,
          },
          {
            id: 7,
            headerTitle: 'DATA SISWA',
            name: 'DataSiswa',
            component: DataSiswa,
            horizontalTransition,
          },
          {
            id: 8,
            headerTitle: 'PROFIL SISWA',
            name: 'ProfilSiswa',
            component: ProfilSiswa,
            horizontalTransition,
          },
          {
            id: 9,
            headerTitle: 'DATA GURU',
            name: 'DataGuru',
            component: DataGuru,
            horizontalTransition,
          },
          {
            id: 10,
            headerTitle: 'TAMBAH IZIN SISWA',
            name: 'TambahIzinSiswa',
            component: TambahIzinSiswa,
            horizontalTransition,
          },
          {
            id: 11,
            headerTitle: 'PROFIL GURU',
            name: 'ProfilGuruLain',
            component: ProfilGuruLain,
            horizontalTransition,
          },
          {
            id: 12,
            headerTitle: 'AGENDA',
            name: 'Agenda',
            component: Agenda,
            horizontalTransition,
          },
          {
            id: 13,
            headerTitle: 'DATA ALUMNI',
            name: 'DataAlumni',
            component: DataAlumni,
            horizontalTransition,
          },
          {
            id: 14,
            headerTitle: 'PROFIL ALUMNI',
            name: 'ProfilAlumni',
            component: ProfilAlumni,
            horizontalTransition,
          },
          {
            id: 15,
            headerTitle: 'PELANGGARAN SISWA',
            name: 'HomePelanggaranSiswa',
            component: HomePelanggaranSiswa,
            horizontalTransition,
          },
          {
            id: 16,
            headerTitle: 'DATA PELANGGARAN SISWA',
            name: 'DataPelanggaranSiswa',
            component: DataPelanggaranSiswa,
            horizontalTransition,
          },
          {
            id: 17,
            headerTitle: 'TAMBAH PELANGGARAN',
            name: 'TambahPelanggaranSiswa',
            component: TambahPelanggaranSiswa,
            horizontalTransition,
          },
          {
            id: 18,
            headerTitle: 'UBAH PELANGGARAN',
            name: 'UbahPelanggaranSiswa',
            component: UbahPelanggaranSiswa,
            horizontalTransition,
          },
          {
            id: 19,
            headerTitle: 'POIN PELANGGARAN SISWA',
            name: 'PoinPelanggaranSiswa',
            component: PoinPelanggaranSiswa,
            horizontalTransition,
          },
          {
            id: 20,
            headerTitle: 'AKADEMIK',
            name: 'HomeAkademikGuru',
            component: HomeAkademikGuru,
            horizontalTransition,
          },
          {
            id: 21,
            headerTitle: 'ANGGOTA KELAS',
            name: 'AnggotaKelas',
            component: AnggotaKelas,
            horizontalTransition,
          },
          {
            id: 22,
            headerTitle: 'JADWAL PELAJARAN',
            name: 'JadwalPelajaran',
            component: JadwalPelajaran,
            horizontalTransition,
          },
          {
            id: 23,
            headerTitle: 'PERTEMUAN',
            name: 'HomePertemuan',
            component: HomePertemuan,
            horizontalTransition,
          },
          {
            id: 24,
            headerTitle: 'BUAT PERTEMUAN',
            name: 'BuatPertemuan',
            component: BuatPertemuan,
            horizontalTransition,
          },
          {
            id: 25,
            headerTitle: 'PERTEMUAN',
            name: 'ListPertemuan',
            component: ListPertemuan,
            horizontalTransition,
          },
          {
            id: 26,
            headerTitle: 'KOLEKSI MATERI',
            name: 'KoleksiMateri',
            component: KoleksiMateri,
            horizontalTransition,
          },
          {
            id: 27,
            headerTitle: 'AMPRAH GAJI',
            name: 'AmprahGaji',
            component: AmprahGaji,
            horizontalTransition,
          },
          {
            id: 28,
            headerTitle: 'ABSEN MASUK / PULANG',
            name: 'PilihJenisAbsenScannerSiswa',
            component: PilihJenisAbsenScannerSiswa,
            horizontalTransition,
          },
          {
            id: 29,
            headerTitle: 'SPP / IURAN KOMITE',
            name: 'SPP',
            component: SPP,
            horizontalTransition,
          },
          {
            id: 30,
            headerTitle: 'SPP / IURAN KOMITE',
            name: 'SPPDetail',
            component: SPPDetail,
            horizontalTransition,
          },
        ].map(item => (
          <Stack.Screen
            key={item.id + ''}
            options={{
              ...item?.horizontalTransition,
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
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTintColor: 'white',
            headerTransparent: true,
            animationEnabled: false,
          }}
          name="Scanner"
          component={Scanner}
          lazy={true}
        />
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
          name="LoginGuru"
          component={LoginGuru}
          lazy={true}
        />
        <Stack.Screen
          options={{
            ...horizontalTransition,
            headerTitle: '',
            headerTransparent: true,
          }}
          name="LupaPasswordGuru"
          component={LupaPasswordGuru}
          lazy={true}
        />
      </Stack.Navigator>
    );
  }
}
