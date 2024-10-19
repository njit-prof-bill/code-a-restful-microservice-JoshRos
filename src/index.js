const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users=[];
let nextId=1;

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const {id}=req.params;
    const user=users.find(u =>u.id==id);
    if(user)
    {
        res.json(user);
    }
    else
    {
      res.status(404).json({message: 'User not found'});
    }
});

app.put('/users/:id', (req, res) => {
  const {id}=req.params;
  const {name, email}=req.body;
  const user=users.find(u=>u.id==id);
  if(user)
  {
    user.name = name;
    user.email = email;
    res.json(user);
  }
  else
  {
    res.status(404).json({ message: 'User not found' });
  }
});


app.delete('/users/:id', (req, res) => {
    const {id}=req.params;
    const index=users.findIndex(u=>u.id==id);
    if(index!==-1)
    {
      users.splice(index,1);
      res.status(204).send();
    }
    else
    {
      res.status(404).json({ message: 'User not found' });
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing