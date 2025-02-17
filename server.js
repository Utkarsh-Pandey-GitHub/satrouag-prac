const express = require('express');
const app = express();
app.use(express.json());  // Middleware to parse JSON

let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

// GET: Fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST: Create a new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT: Update an existing user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    user.name = req.body.name;
    res.json(user);
});

// DELETE: Remove a user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "User deleted" });
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
