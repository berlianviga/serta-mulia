const tf = require("@tensorflow/tfjs-node"); // library tfjs-node untuk menangani pembuatan tensor berdasarkan input data gambar
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node //.node untuk menangani proses inferensi data
      .decodeJpeg(image) //untuk melakukan decode terhadap input data baru
      .resizeNearestNeighbor([224, 224]) //untuk melakukan resize gambar menggunakan algoritma Nearest Neighbor
      .expandDims() //untuk menambah dimensi gambar
      .toFloat(); //untuk mengubah seluruh data yang diproses menjadi float

    const prediction = model.predict(tensor);
    const score = await prediction.data(); //akan menghasilkan score berdasarkan kelas yang ada ('Melanocytic nevus', 'Squamous cell carcinoma', 'Vascular lesion')
    /**skor berfariasi dari 0-1
     * Contohnya, kode tersebut akan menghasilkan [0.2, 0.7, 0.1]
     * yang menandakan bahwa prediksi tersebut menghasilkan skor yang tinggi pada kelas kedua atau Squamous cell carcinoma
     */
    const confidenceScore = Math.max(...score) * 100;

    const classes = [
      "Melanocytic nevus",
      "Squamous cell carcinoma",
      "Vascular lesion",
    ]; //variabel berisi label-kabel

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    /**
     * tf.argMax(prediction, 1) menghitung indeks dengan nilai maksimum untuk setiap baris dari tensor
     * dataSync() untuk mengambil data dari tensor, output dari metode ini adalah array yang berurutan dari terbesar hingga terkecil
     */
    const label = classes[classResult];

    let explanation, suggestion;

    if (label === "Melanocytic nevus") {
      explanation =
        "Melanocytic nevus adalah kondisi di mana permukaan kulit memiliki bercak warna yang berasal dari sel-sel melanosit, yakni pembentukan warna kulit dan rambut.";
      suggestion =
        "Segera konsultasi dengan dokter terdekat jika ukuran semakin membesar dengan cepat, mudah luka atau berdarah.";
    }

    if (label === "Squamous cell carcinoma") {
      explanation =
        "Squamous cell carcinoma adalah jenis kanker kulit yang umum dijumpai. Penyakit ini sering tumbuh pada bagian-bagian tubuh yang sering terkena sinar UV.";
      suggestion =
        "Segera konsultasi dengan dokter terdekat untuk meminimalisasi penyebaran kanker.";
    }

    if (label === "Vascular lesion") {
      explanation =
        "Vascular lesion adalah penyakit yang dikategorikan sebagai kanker atau tumor di mana penyakit ini sering muncul pada bagian kepala dan leher.";
      suggestion =
        "Segera konsultasi dengan dokter terdekat untuk mengetahui detail terkait tingkat bahaya penyakit.";
    }

    return { confidenceScore, label, explanation, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;