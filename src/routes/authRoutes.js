import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js'; // Assuming you have a db.js file for database operations 

const router = express.Router();


// register a new user endpoint
router.post('/register', (req, res) => {

    const { username, password } = req.body;
    // now incrypt the user password

    const hashedPassword = bcrypt.hashSync(password, 8);

    try{
        const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        const result = insertUser.run(username, hashedPassword);

        const defaultTodo = 'Welcome to your todo app!';
        const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)');
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        //createb a new token for the user
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.json({ token });

    }
    catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    res.sendStatus(200);


})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
        const user = getUser.get(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create a new token for the user
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.json({ token });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    res.sendStatus(200);    

})

export default router;