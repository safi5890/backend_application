import express from 'express';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js'; // Importing the auth routes
import todoRoutes from './routes/todoRoutes.js'; // Importing the todo routes 
import authMiddleware from './middleware/authMiddleware.js'; // Importing the authentication middleware



const app = express();
const PORT = process.env.PORT || 5000;

// get the current file path
// fileURLToPath converts the URL to a file path
// import.meta.url is a special variable that contains the URL of the current module
// This is used to get the directory name of the current module

const __filename = fileURLToPath(import.meta.url);

// get the directory name from the file path
// dirname is a method that returns the directory name of a path
// __dirname is a global variable in Node.js that contains the directory name of the current module

const __dirname = dirname(__filename);

app.use(express.json());

// Serve static files from the 'public' directory

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/auth', authRoutes); // Use the auth routes
app.use('/todos', authMiddleware, todoRoutes); // Use the todo routes



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
