const router = require('express').Router();
const sequelize = require('../../config/connection.js');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
    // include associated Product data
    include: [{ model: Product }],
    
  });
  res.status(200).json(tagData);
} catch(err) {
    res.status(500).json(err);
    };
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findOne({
    // include associated Product data
    where: {
      id: req.params.id
    },
    include: [{ model: Product }],
  });
  if (!tagData) {
    res.status(404).json({ message: 'no tag found with that id' })
    return;
  }
  res.status(200).json(tagData);
} catch(err) {
    res.status(500).json(err);
    };
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
    tag_name: req.body.tag_name,
  });
  res.status(200).json(tagData);
} catch(err) {
    res.status(500).json(err);
    };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
        // tag_name: req.body.tag_name,
    });
    if (!tagData) {
      res.status(404).json({ message: 'no tag found with that id' })
      return;
    }
    const tagResult = await Tag.findOne({
      // include associated Product data
      where: {
        id: req.params.id
      },
      include: [{ model: Product }],
    });
    res.status(200).json(tagResult);
  } catch(err) {
      res.status(500).json(err);
      };
  });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'no tag found with that id' })
      return;
    }
    res.status(200).json({ message: `tag ${req.params.id} destroyed` });
  } catch(err) {
      res.status(500).json(err);
      };
  });

module.exports = router;
