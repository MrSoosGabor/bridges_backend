const express = require("express");
const router = express.Router();

const Bridge = require("../models/bridges");
const Location = require("../models/locations");

router.post("/", function(req, res, next) {
    const _id = req.body._id;
    const bridgeName = req.body.bridgeName;
    const description = req.body.description;
    const isPublicRoad = req.body.isPublicRoad;
    const flowKm = req.body.flowKm;
    const routes = req.body.routes;
    const location = req.body.location;
    const deliveryDate = req.body.deliveryDate;
    const pictureUrl = req.body.pictureUrl;

    const bridge = new Bridge({
        _id,
        bridgeName,
        description,
        isPublicRoad,
        flowKm,
        routes,
        location,
        deliveryDate,
        pictureUrl
    });

    bridge
        .save()
        .then(() => {
            return res.status(201).json();
        })
        .catch((err) => res.status(400).json({
            error: err.message,
        }))
});

router.get("/:field/:direction", function(req, res, next) {
    const f = req.params.field;
    const d = req.params.direction;
    var direct = 0;
    if (d === "asc") direct = 1;
    if (d === "desc") direct = -1;
    Bridge.find()
        .populate("location")
        .sort({
            [f]: direct
        })
        .then((bridges) => {
            res.json(bridges);
        });
});

router.patch("/:id", function(req, res, next) {
    const id = req.params.id;
    try {
        const updatedDate = req.body.deliveryDate;
        if (updatedDate !== null) {
            var today = new Date();
            var udate = new Date(updatedDate);
            if (udate.getTime() > today.getTime()) {
                throw new Error("Az aktuális dátumnál nem adhat meg későbbi dátumot a deliveryDate mezőben!");
            }
        }
        Bridge.findByIdAndUpdate(id, req.body, { new: true })
            .then(response => {
                if (!response) {
                    return res.status(404).json({ "error": `A híd ${id} azonosítóval nem létezik!` })
                }
                return res.json(response)
            })
            .catch((err) => res.status(404).json(err.message));
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;