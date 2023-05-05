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
  pendidikan_terakhir: string().nullable(true),
  nuptk: string().nullable(true),
  tempat_lahir: string().required(),
  tanggal_lahir: string().required(),
  nip: number().nullable(true),
  nik: number().nullable(true),
  status_kepegawaian: string().nullable(true),
  jenis_ptk: string().nullable(true),
  agama: string()
    .oneOf(['Islam', 'Protestan', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])
    .required(),
  alamat: string().nullable(true),
  email: string().email().nullable(true),
  sk_pengangkatan: string().nullable(true),
  tmt_pengangkatan: string().nullable(true),
  lembaga_pengangkatan: string().nullable(true),
  sumber_gaji: string().nullable(true),
  nomor_wa: string().trim().nullable(true),
  jabatan: string().nullable(true),
});

export default profilSchema;
