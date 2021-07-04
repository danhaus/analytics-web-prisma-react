import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import fileRoutes from './routes/file.routes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/files', fileRoutes);

app.get('/', (req, res) => {
  res.json({ message: `Hello World!` });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
