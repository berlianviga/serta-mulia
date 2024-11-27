const tf = require('@tensorflow/tfjs-node'); //library tfjs-node yang sebelumnya telah diinstal untuk melakukan load model
async function loadModel() {
    //load model menggunakan loadGraphModel karena Model yang dikembangkan dan diekspor oleh tim peneliti Serta Mulia sebenarnya adalah SavedModel
    return tf.loadGraphModel(process.env.MODEL_URL); //loadGraphModel untuk load model
}
module.exports = loadModel;