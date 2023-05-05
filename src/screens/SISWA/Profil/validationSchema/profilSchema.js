import {number, object, string} from 'yup';

export const agamaEnum = [
  'Islam',
  'Protestan',
  'Katolik',
  'Hindu',
  'Buddha',
  'Konghucu',
];
export const jenisKelaminEnum = ['Laki-laki', 'Perempuan'];
export const kewarganegaraanEnum = ['WNI', 'WNA', 'Keturunan'];
export const pendidikanEnum = [
  'SD',
  'SMP',
  'SMA',
  'D1',
  'D2',
  'D3',
  'D4',
  'S1',
  'S2',
  'S3',
];
export const jenisTinggalEnum = [
  'Tinggal Dengan Orang Tua',
  'Saudara',
  'Asrama',
  'Kost',
];
export const golonganDarahEnum = ['A', 'B', 'AB', 'O'];
export const apakahYatimPiatuEnum = ['Yatim', 'Piatu', 'Yatim Piatu'];
export const apakahMasihHidupEnum = ['Masih Hidup', 'Meninggal'];

const profilSchema = object({
  token: string().required(),
  nama: string()
    .required()
    .matches(/^[A-Za-z,. ]+$/, 'cannot contain number!'),
  password: string()
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(6),
  jenis_kelamin: string().oneOf(['Laki-laki', 'Perempuan']).required(),
  tempat_lahir: string().required(),
  tanggal_lahir: string().required(),
  alamat: string().nullable(true),
  nomor_wa: string().trim().nullable(true),
  tahun_masuk: number().nullable(true),
  nama_panggilan: string().nullable(true),
  agama: string().oneOf(agamaEnum).required(),
  kewarganegaraan: string().oneOf(kewarganegaraanEnum),
  anak_ke: number().notOneOf([0]).integer().positive().nullable(true),
  jumlah_saudara_kandung: number().integer().positive().nullable(true),
  jumlah_saudara_tiri: number().integer().positive().nullable(true),
  jumlah_saudara_angkat: number().integer().positive().nullable(true),
  yatim_piatu: string().oneOf(apakahYatimPiatuEnum).nullable(true),
  bahasa_seharihari: string().nullable(true),
  jenis_tinggal: string().oneOf(jenisTinggalEnum).nullable(true),
  jarak_rumah_kesekolah: number().nullable(true),
  golongan_darah: string().oneOf(golonganDarahEnum).nullable(true),
  riwayat_penyakit: string().nullable(true),
  kelainan_jasmani: string().nullable(true),
  tinggi_badan: string().nullable(true),
  berat_badan: string().nullable(true),
  lulusan_dari_sekolah: string().nullable(true),
  tanggal_dan_nomor_sttb_sekolah_sebelumnya: string().nullable(true),
  lama_belajar_sekolah_sebelumnya: string().nullable(true),
  pindahan_dari_sekolah: string().nullable(true),
  alasan_pindah_sekolah: string().nullable(true),
  diterima_dikelas: string().nullable(true),
  diterima_pada_program: string().nullable(true),
  tanggal_diterima: string().nullable(true),
  ayah_nama: string().nullable(true),
  ayah_tempat_lahir: string().nullable(true),
  ayah_tanggal_lahir: string().nullable(true),
  ayah_agama: string().oneOf(agamaEnum).nullable(true),
  ayah_kewarganegaraan: string().oneOf(kewarganegaraanEnum).nullable(true),
  ayah_pendidikan: string().oneOf(pendidikanEnum).nullable(true),
  ayah_pekerjaan: string().nullable(true),
  ayah_penghasilan: number().integer().nullable(true),
  ayah_alamat: string().nullable(true),
  ayah_nomor_telepon: string().trim().nullable(true),
  ayah_masih_hidup: string().oneOf(apakahMasihHidupEnum).nullable(true),
  ibu_nama: string().nullable(true),
  ibu_tempat_lahir: string().nullable(true),
  ibu_tanggal_lahir: string().nullable(true),
  ibu_agama: string().oneOf(agamaEnum).nullable(true),
  ibu_kewarganegaraan: string().oneOf(kewarganegaraanEnum).nullable(true),
  ibu_pendidikan: string().nullable(true),
  ibu_pekerjaan: string().nullable(true),
  ibu_penghasilan: number().integer().nullable(true),
  ibu_alamat: string().nullable(true),
  ibu_nomor_telepon: string().trim().nullable(true),
  ibu_masih_hidup: string().oneOf(apakahMasihHidupEnum).nullable(true),
  wali_nama: string().nullable(true),
  wali_tempat_lahir: string().nullable(true),
  wali_tanggal_lahir: string().nullable(true),
  wali_agama: string().oneOf(agamaEnum).nullable(true),
  wali_kewarganegaraan: string().oneOf(kewarganegaraanEnum).nullable(true),
  wali_pendidikan: string().nullable(true).nullable(true),
  wali_pekerjaan: string().nullable(true).nullable(true),
  wali_penghasilan: number().integer().nullable(true),
  wali_alamat: string().nullable(true),
  wali_nomor_telepon: string().trim().nullable(true),
  hobi_kesenian: string().nullable(true),
  hobi_olahraga: string().nullable(true),
  hobi_kemasyarakatan: string().nullable(true),
  hobi_lainlain: string().nullable(true),
  tinggal_meninggalkan_sekolah: string().nullable(true),
  alasan_meninggalkan_sekolah: string().nullable(true),
});

export default profilSchema;
