import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('안녕하세요');
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
