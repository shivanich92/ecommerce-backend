import fs from 'fs';

const itemsFile = './items.json';

const readItems = () => {
  if (!fs.existsSync(itemsFile)) return [];
  return JSON.parse(fs.readFileSync(itemsFile));
};

const writeItems = (items) => {
  fs.writeFileSync(itemsFile, JSON.stringify(items, null, 2));
};

export const getItems = (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  let items = readItems();

  if (category) items = items.filter(i => i.category === category);
  if (minPrice) items = items.filter(i => i.price >= Number(minPrice));
  if (maxPrice) items = items.filter(i => i.price <= Number(maxPrice));

  res.json(items);
};

export const addItem = (req, res) => {
  const { name, price, category } = req.body;
  const items = readItems();
  const newItem = { id: Date.now(), name, price, category };
  items.push(newItem);
  writeItems(items);
  res.json(newItem);
};

export const updateItem = (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  let items = readItems();
  const index = items.findIndex(i => i.id == id);

  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  items[index] = { ...items[index], name, price, category };
  writeItems(items);
  res.json(items[index]);
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  let items = readItems();
  items = items.filter(i => i.id != id);
  writeItems(items);
  res.json({ message: 'Item deleted successfully' });
};