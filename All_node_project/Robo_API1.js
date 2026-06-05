const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
 
mongoose.connect('mongodb://localhost:27017/employeedb');
 
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', UserSchema);
 
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
 
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});
 
app.listen(5000, () => console.log('API running on port 5000'));