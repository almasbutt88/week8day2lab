const express = require('express');
const ObjectID = require('mongodb').ObjectID;


const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post('/', (req, res) =>{
    const newSighting = req.body;
    collection
    .insertOne(newSighting)
    .then((result) => { res.json(result.ops[0])}
  )
  .catch((err) =>{ //if an error occurs, you can do (err.status) if you know the status
    res.status(500); //assuming you will get a 500 error
    res.json(
      {
        status:500,
        error:err
      });
    })
  });



  router.delete('/:id', (req, res)=>{
    const id = req.params.id
    collection
    .deleteOne({_id: ObjectID(id)})
    .then((result) => res.json(result))
    .catch((err) =>{ //if an error occurs, you can do (err.status) if you know the status
      res.status(500); //assuming you will get a 500 error
      res.json(
        {
          status:500,
          error:err
        });
      })
    });


  

  return router;
};

module.exports = createRouter;
