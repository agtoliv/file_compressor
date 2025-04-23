import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from backend!');
});

app.listen(5000, () => {
  console.log('Backend rodando em http://localhost:5000');
});