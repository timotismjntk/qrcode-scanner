/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

// reducers siswa
import authSiswa from './SISWA/auth';
import absenSiswa from './SISWA/absen';
import beritaSiswa from './SISWA/berita';
import informasiSiswa from './SISWA/informasi';
import logAbsenSiswa from './SISWA/logAbsen';
import agendaSiswa from './SISWA/agenda';
import profilSayaSiswa from './SISWA/profilSaya';
import galeriSiswa from './SISWA/galeri';
import tahunAjaran from './SISWA/tahunAjaran';
import kelas from './SISWA/kelas';
import mataPelajaran from './SISWA/mataPelajaran';
import spp_siswa_role_siswa from './SISWA/spp_siswa_role_siswa';

// reducers guru
import authGuru from './GURU/auth';
import absenGuru from './GURU/absen';
import beritaGuru from './GURU/berita';
import informasiGuru from './GURU/informasi';
import logAbsenGuru from './GURU/logAbsen';
import dataGuru from './GURU/dataGuru';
import dataSiswa from './GURU/dataSiswa';
import agendaGuru from './GURU/agenda';
import profilSayaGuru from './GURU/profilSaya';
import profilGuruLain from './GURU/profilGuruLain';
import galeriGuru from './GURU/galeri';
import buatIzinSiswa from './GURU/buatIzinSiswa';
import anggotaKelas from './GURU/anggotaKelas';
import pertemuan from './GURU/pertemuan';
import jadwalPelajaran from './GURU/jadwalPelajaran';
import pelanggaranSiswa from './GURU/pelanggaranSiswa';
import koleksiMateri from './GURU/koleksiMateri';
import blog from './GURU/blog';
import spp_siswa_role_guru from './GURU/spp_siswa_role_guru';

// reducers mesin
import authMesin from './MESIN/auth';
import absenMesin from './MESIN/absen';

export default combineReducers({
  /* reducers guru */
  authGuru,
  absenGuru,
  beritaGuru,
  informasiGuru,
  logAbsenGuru,
  agendaGuru,
  profilSayaGuru,
  galeriGuru,
  anggotaKelas,
  buatIzinSiswa,
  pertemuan,
  jadwalPelajaran,
  pelanggaranSiswa,
  spp_siswa_role_guru,
  /* ------------- */
  /* reducers umum */
  dataGuru,
  dataSiswa,
  profilGuruLain,
  koleksiMateri,
  blog,
  /* ------------- */
  /* reducers mesin */
  authMesin,
  absenMesin,
  /* ------------- */
  /* reducers siswa */
  authSiswa,
  absenSiswa,
  logAbsenSiswa,
  beritaSiswa,
  informasiSiswa,
  agendaSiswa,
  profilSayaSiswa,
  galeriSiswa,
  tahunAjaran,
  kelas,
  mataPelajaran,
  spp_siswa_role_siswa,
  /* ------------- */
});
