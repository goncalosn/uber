import * as express from 'express';

const app = express();

// parse json body
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to api2!' });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Healthy' });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
