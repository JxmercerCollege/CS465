const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async(req, res) => {
    const q = await Model
        .find({})
        .exec();

    if(!q){
        return res
            .status(404)
            .json(err);
    }else{
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async(req, res) =>{
    console.log("Received tripCode:", req.params.tripCode);
    const q = await Model
        .find({'code': req.params.tripCode})
        .exec();

    console.log("Query result:", q);

    if(!q || q.length === 0){
        return res
            .status(404)
            .json({ message: 'Trip not found' });
    }else{
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
}