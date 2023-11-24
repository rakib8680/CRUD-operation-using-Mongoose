import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoute } from './app/modules/user/user.routes';

// middleware
app.use(express.json());
app.use(cors());

// application route
app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
