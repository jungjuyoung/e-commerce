const express = require('express');
const path = require('path');
const cors = require('cors');
const monggoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, '../uploads')));
app.use(cors());
app.use(express.json());
app.use('/users', require('./routes/users'));

monggoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to mongodb...'))
  .catch((err) => console.log(err));

app.get('/', (req, res, next) => {
  // 비동기에서 일어나는 에러의 경우 next를 이용해야만 error handler(에러처리기)에 전달 됨.
  setTimeout(() => {
    next(new Error('it is an Error...'));
  }, 1000);
  // res.send('안녕하세요@@@');
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Server Error');
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
