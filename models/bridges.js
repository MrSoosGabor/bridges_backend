const mongoose = require("mongoose");

const Schema = mongoose.Schema;

function flowKmValidator(val) {
    return (val < 2850 && val > 0)
}

function deliveryDateValidator(val) {
    var today = new Date();
    return val.getTime() <= today.getTime();
}

const bridgeSchema = new Schema({
    _id: Number,
    bridgeName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 3000
    },
    isPublicRoad: {
        type: Boolean,
        default: true
    },
    flowKm: {
        type: Number,
        required: true,
        unique: true,
        validate: [flowKmValidator, "A flowKm mező értéke csak 0-nál nagyobb és 2850-nél kisebb lehet!"]
    },
    routes: {
        type: String,
        maxlength: 500
    },
    location: {
        type: Number,
        default: 1,
        ref: "Location"
    },
    deliveryDate: {
        type: Date,
        validate: [deliveryDateValidator, "Az aktuális dátumnál nem adhat meg későbbi dátumot a deliveryDate mezőben ám!"]
    },
    pictureUrl: {
        type: String,
        maxlength: 300
    }
}, { collation: { locale: 'hu' } })

module.exports = mongoose.model("Bridge", bridgeSchema, "bridges");