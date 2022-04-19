const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    _id: Number,
    kategoria: Number,
    locationName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
}, { collation: { locale: 'hu' } });
//                                modell ------- séma ------ kollekció
module.exports = mongoose.model("Location", locationSchema, "location");