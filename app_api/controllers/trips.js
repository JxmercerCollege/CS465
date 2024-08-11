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
//GET REQEST to get trip by code
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
//POST request to add a trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const savedTrip = await newTrip.save();
        return res
            .status(201)
            .json(savedTrip);
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'Failed to add trip', error: err });
    }
};
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code': req.params.tripCode }, // Find the trip by its code
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, 
                { new: true } // Return the updated document
            )
            .exec();

        if (!q) {
            // Database returned no data
            return res
                .status(400)
                .json({ message: 'Trip not found' });
        } else {
            // Return the resulting updated trip
            return res
                .status(200) // 201 is typically used for resource creation, 200 is more appropriate for updates
                .json(q);
        }
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'Failed to update trip', error: err });
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
}