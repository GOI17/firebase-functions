const { Router } = require('express');
const db = require('../database/connection');

const router = Router();

router.get('/api/products', async (req, res) => {
  try {
    const collection = db.collection('products');
    const snapshot = await collection.get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name
    }));
    return res.status(200).json(products);
  } catch(error) {
    return res.status(500).send(error);
  }
});

router.get('/api/products/:id', async (req, res) => {
  try {
    const doc = db.collection('products').doc(req.params.id);
    const product = await doc.get();
    return res.status(200).json({
      id:product.id,
      name: product.data().name
    });
  } catch(error) {
    return res.status(500).send(error);
  }
});

router.post('/api/products', async (req, res) => {
  try {
    await db.collection('products').doc().create({
      name: req.body.name
    });
    return res.status(204);
  } catch(error) {
    return res.status(500).send(error);
  }
});

router.delete('api/products/:id', async (req, res) => {
  try {
    const doc = db.collection('products').doc(req.params.id);
    await doc.delete();
    return res.status(200);
  } catch(error) {
    return res.status(500).send(error);
  }
});

router.put('/api/products/:id', async (req, res) => {
  try {
    const doc = db.collection('products').doc(req.params.id);
    await doc.update({
      name: req.body.name
    });
    return res.status(200);
  } catch(error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
