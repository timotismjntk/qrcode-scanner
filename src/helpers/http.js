import {default as axios} from 'axios';

export const uploadUrl = 'https://app.sekoolah.id/upload.php';
export const hapusMateriUrl =
  'https://asia-southeast2-absen-rfid.cloudfunctions.net/pertemuan?api=hapusMateriPertemuan';

const http = (
  url = 'https://asia-southeast2-absen-rfid.cloudfunctions.net',
  data,
) => {
  return axios.create({
    baseURL: `${url}/`,
  });
};

export default http;
