import express from 'express';

const PORT = 3333;
const app = express();

import { create, update } from './routes';

app.get('/', (req, res) => res.send('<h1>Typescript</h1>'))
app.post('/users', create);
app.put('/users/:id', update);

app.listen(PORT, () => console.log(`Server started http://localhost:${PORT}`));