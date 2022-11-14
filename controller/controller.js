
const {fetchTreasures} = require('../models/model')

exports.getTreasures = (req,res,next) => {
fetchTreasures().then((treasures) => {
    res.status(200).send({treasures})
})
}