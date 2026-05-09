const mongoose = require('mongoose');

const connectDB = async () => {
  try{
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(process.env.MONGO_URI); /* obtenido de MongoAtlas */
      console.log("¡Conexión exitosa a la base de datos!");
  }
  catch (error) {
    // Por si algo ocurre
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); /* Cierra si hay algo mal */
  }
};

module.exports = { connectDB }; /* Para poder importarla en otros lugares */