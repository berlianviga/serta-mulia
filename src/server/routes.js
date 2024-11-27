//menangani alur permintaan API 
const postPredictHandler = require('../server/handler');

//Server akan menangani request yang masuk sehingga kita hanya akan menggunakan satu path
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        /*Mengizinkan data berupa gambar*/
        //Secara default, gambar yang di-upload harus berukuran maksimal 1MB
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  }
]
 
module.exports = routes;