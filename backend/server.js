require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors(), express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

const Place = mongoose.model('Place', new mongoose.Schema({
  name: String,
  desc: String,
  rating: Number,
  lat: Number,
  lng: Number
}));

app.get('/places', async (_, res) => res.json(await Place.find()));
app.post('/places', async (req, res) => res.json(await new Place(req.body).save()));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
