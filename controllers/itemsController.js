const Item = require('../models/item');

// Controller function to create a new item
exports.createItem = async (req, res) => {
  try {
    const { name, description, age } = req.body;
    if (!name || !description || !age) {
      return res.status(400).send('All fields are required');
    }
    const newItem = new Item({ name, description, age });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem); // Respond with the created item
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).send('Name must be unique');
    }
    res.status(400).send(err.message); // Handle other errors
  }
};

// Controller function to get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items); // Respond with all items
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }
};

// Controller function to get a specific item by ID
exports.getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.json(item); // Respond with the item
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }
};

// Controller function to update an item by ID
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, age } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description, age }, { new: true });
    res.json(updatedItem); // Respond with the updated item
  } catch (err) {
    res.status(400).send(err.message); // Handle errors
  }
};

// Controller function to delete an item by ID
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).send('Item not found');
    }
    res.json({ message: 'Item deleted successfully' }); // Respond with success message
  } catch (err) {
    res.status(400).send(err.message); // Handle errors
  }
};
