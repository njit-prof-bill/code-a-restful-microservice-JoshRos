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
    const { name, email } = req.body;//extracts email from request body
    const newUser = { id: nextId++, name, email };//creates new user object
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const {id}=req.params;
    const user=users.find(u =>u.id==id);//finds user id from the url
    if(user)
    {
        res.json(user);//finds user in array and responsds with object
    }
    else
    {
      res.status(404).json({message: 'User not found'});
    }
});

app.put('/users/:id', (req, res) => {
  const {id}=req.params;
  const {name, email}=req.body;//extracts the name and email from request body
  const user=users.find(u=>u.id==id);
  if(user)
  {
    //updates details if found and responds with updated object
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
    const index=users.findIndex(u=>u.id==id);//extracts user id from url
    if(index!==-1)//finds user in array and deletes if found
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