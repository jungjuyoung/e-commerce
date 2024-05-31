import express, { Express, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app: Express = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.static(path.join(__dirname, '../uploads')));

app.get('/', (req: Request, res: Response) => {
  res.send('안녕하세요');
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
