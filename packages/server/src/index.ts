import express from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const getYear = (date: Date): string => {
  return `${date.getFullYear()}`;
};

app.get('/', (req, res) => {
  const year = getYear(new Date());
  res.json({ message: `Hello World ! ${year}` });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
