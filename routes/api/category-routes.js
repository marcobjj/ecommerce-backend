const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({
    
      include: 
        [{
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock','category_id']
        }]
      
    
  })
    .then(updatedPostData => res.json(updatedPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    
    include: 
      [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock','category_id']
      }]
    ,
    where:{id:req.params.id}
    
  
    })
  .then(updatedPostData => res.json(updatedPostData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });

  
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(result => {
    
    Category.findAll()
    .then(allCategories => res.status(200).json(allCategories));

  })
  .catch(err => {

    console.log(err);
    res.status(400).jason(err);
  })

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const body = req.body;
  Category.update(req.body, {where:{id:req.params.id}})
  .then(result => {
    
    Category.findOne({include:[{model:Product}],where:{id:req.params.id}})
    .then(allCategories => res.status(200).json(allCategories));

  })
  .catch(err => {

    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where:{id:req.params.id}})
  .then(result => {
    
    Category.findAll()
    .then(allCategories => res.status(200).json(allCategories));

  })
  .catch(err => {

    console.log(err);
    res.status(400).json(err);
  })

});

module.exports = router;
