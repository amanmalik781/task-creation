// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Set up middleware for parsing JSON requests
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URL = 'mongodb+srv://amandeepmalik:amandeepmalik@expressjsauth.aaqse1v.mongodb.net/TasksApp?retryWrites=true&w=majority';
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected'));
db.on('error', () => console.error(console, 'MongoDB connection error:'));

// Create a Mongoose schema for "Task" documents
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed || false,
        });
        const user = await newTask.save().then((task) => task.toObject());
        return res.status(200).json(user).end();
    } catch (error) {
        console.log('task creation error', error);
        return res.sendStatus(400);
    }
});

// Start the Express server on specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Task Creation Microservice is running on port ${port}`);
});

// alias docker="/Applications/Docker.app/Contents/Resources/bin/docker"
