import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.static(path.join(__dirname, '../uploads')));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('안녕하세요@@@');
});

app.post('/', (req, res) => {
  console.log('[post]', req.body);
  res.json(req.body);
});
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
