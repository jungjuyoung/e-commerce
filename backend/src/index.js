import express from 'express';
import path from 'path';
import cors from 'cors';
import monggoose from 'mongoose';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.static(path.join(__dirname, '../uploads')));
app.use(cors());
app.use(express.json());

monggoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log(err));

app.get('/', (req, res, next) => {
  // 비동기에서 일어나는 에러의 경우 next를 이용해야만 error handler(에러처리기)에 전달 됨.
  setTimeout(() => {
    next(new Error('it is an Error'));
  }, 1000);
  // res.send('안녕하세요@@@');
});

app.post('/', (req, res) => {
  console.log('[post]', req.body);
  res.json(req.body);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Server Error');
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
