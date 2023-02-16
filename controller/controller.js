const { selectTreasures } = require("../models/model");

exports.getTreasures = (req, res, next) => {
  const { sort_by, order, colour } = req.query;
  selectTreasures({ sort_by, order, colour })
    .then((treasures) => {
      res.status(200).send({ treasures });
    })
    .catch(next);
};
