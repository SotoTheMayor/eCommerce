const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll({
    // include associated Product data
    include: [{ model: Product }],
    
  });
  res.status(200).json(categoryData);
} catch(err) {
    res.status(500).json(err);
    };
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      // include associated Product data
    include: [{ model: Product }],
  });
  if (!categoryData) {
    res.status(404).json({ message: 'no category found with that id' })
    return;
  }
  res.status(200).json(categoryData);
} catch(err) {
    res.status(500).json(err);
    };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
    category_name: req.body.category_name,
  });
  res.status(200).json(categoryData);
} catch(err) {
    res.status(500).json(err);
    };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'no category found with that id' })
      return;
    }
    const categoryResult = await Category.findOne({
      // include associated Product data
      where: {
        id: req.params.id
      },
      include: [{ model: Product }],
    });
    res.status(200).json(categoryResult);
  } catch(err) {
      res.status(500).json(err);
      };
  });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'no category found with that id' })
      return;
    }
    res.status(200).json({ message: `category ${req.params.id} destroyed` });
  } catch(err) {
      res.status(500).json(err);
      };
  });

module.exports = router;
