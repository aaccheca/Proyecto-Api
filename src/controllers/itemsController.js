const Item = require('../models/itemModel');

exports.getAll = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los ítems' });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el ítem' });
  }
};

exports.create = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el ítem' });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Item.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Item no encontrado' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el ítem' });
  }
};

exports.remove = async (req, res) => {
  try {
    await Item.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el ítem' });
  }
};