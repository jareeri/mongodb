// const express = require('express');
// const app = express();
// const port = 3001;

// const mongoose = require('mongoose');

// const uri = 'mongodb+srv://jareeri:R9sd0TBH2bry3WIT@cluster0.mc5ze7h.mongodb.net/test?retryWrites=true&w=majority';

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// });

// // Define the item schema with validations
// const itemSchema = new mongoose.Schema({
//   name: { type: String, unique: true, required: true },
//   description: { type: String, required: true },
//   age: { type: Number, required: true },
//   time_created: { type: Date, default: Date.now },
// });

// const Item = mongoose.model('Item', itemSchema);

// app.use(express.json());

// // Route to create a new item
// app.post('/items', async (req, res) => {
//   try {
//     const { name, description, age } = req.body;
//     if (!name || !description || !age) {
//       return res.status(400).send('All fields are required');
//     }
//     const newItem = new Item({ name, description, age });
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     if (err.name === 'MongoError' && err.code === 11000) {
//       return res.status(400).send('Name must be unique');
//     }
//     res.status(400).send(err.message);
//   }
// });

// app.get('/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.put('/items/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, age } = req.body;
//     const updatedItem = await Item.findByIdAndUpdate(id, { name, description, age }, { new: true });
//     res.json(updatedItem);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// app.delete('/items/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Item.findByIdAndDelete(id);
//     res.json({ message: 'Item deleted successfully' });
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const itemsRouter = require("./routes/items");
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users')

const app = express();
const port = 3001;

mongoose.connect(
  "mongodb+srv://jareeri:R9sd0TBH2bry3WIT@cluster0.mc5ze7h.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);



app.use(express.json());
app.use("/items", itemsRouter);
app.use(usersRouter)
app.use('/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
