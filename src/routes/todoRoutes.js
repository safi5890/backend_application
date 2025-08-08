import express from 'express';
import db from '../db.js'; // Assuming you have a db.js file for database operations

const router = express.Router();

// Get all todos for a user

router.get('/', (req, res) => {
    
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(req.userId); // Assuming req.userId is set by authentication middleware
    res.json(todos);
    
});

// Create a new todo for a user
router.post('/', (req, res) => {
    const { task } = req.body;
    const insertTodo = db.prepare('INSERT INTO todos (task, user_id) VALUES (?, ?)');
    const result = insertTodo.run(task, req.userId); // Assuming req.userId is set by authentication middleware
    res.status(201).json({ id: result.lastInsertRowid, task, completed : 0 });
})

// Update a todo
router.put('/:id', (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;
    const updateTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
    const result = updateTodo.run(completed, id);
    res.json({ message: 'Todo updated successfully' });

});


// Delete a todo    
router.delete('/:id', (req, res) => {
    const deleteTodo = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?');
    const result = deleteTodo.run(req.params.id, req.userId); // Assuming req.userId is set by authentication middleware
    res.json({ message: 'Todo deleted successfully' });

});


export default router;
// This file defines the routes for handling todo operations.   