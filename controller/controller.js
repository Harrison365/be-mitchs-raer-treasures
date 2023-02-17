const { selectTreasures, updateTreasure } = require("../models/model");

exports.getTreasures = (req, res, next) => {
  const { sort_by, order, colour } = req.query;
  selectTreasures({ sort_by, order, colour })
    .then((treasures) => {
      res.status(200).send({ treasures });
    })
    .catch(next);
};

exports.patchTreasuresById = (req, res, next) => {
  const id = req.params.treasure_id;
  const body = req.body;
  updateTreasure(id, body).then((responseObj) => {
    res.status(200).send(responseObj);
  });
};
