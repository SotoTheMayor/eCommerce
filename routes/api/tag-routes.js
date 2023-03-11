const router = require('express').Router();
const sequelize = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: [{ model: ProductTag }, { model: Product}],
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT productData.product_name FROM product WHERE productTagData.product_id = productData.product_id)`
          )
        ]
      ]
    }
  }).catch((err) => {
    res.json(err);
    });
    res.json(tagData);
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
