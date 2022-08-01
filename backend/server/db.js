const mongoose = require('mongoose');

// environment variable
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.log('FATAL ERROR: MONGO_URI not defined in env');
  process.exit(1);
}

const startDb = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((e) => console.error('Could not connect to mongoDB', e));
};

module.exports = startDb;
