const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


//=================================
//             Like
//=================================

router.post("/saveLikes", (req, res) => {
    
});

router.post("/getLikes", (req, res) => {
    let config = {}
    if(req.body.videoId) {
        config = {
            videoId: req.body.videoId
        }
    } else {
        config = {
            commendId: req.body.commendId
        }
    };

    Like.find(config)
        .exec((error, likes) => {
            if(error) {
                return res.status(400).send(error)
            } else {
                return res.status(200).json({
                    success: true,
                    likes
                });
            }
        });
});


//=================================
//             Dislike
//=================================
router.post("/saveDislikes", (req, res) => {
    
});

router.post("/getDislikes", (req, res) => {
    let config = {}
    if(req.body.videoId) {
        config = {
            videoId: req.body.videoId
        }
    } else {
        config = {
            commendId: req.body.commendId
        }
    };

    Dislike.find(config)
           .exec((error, dislikes) => { 
               if(error) {
                   return res.status(400).send(error)
               } else {
                   return res.status(200).json({
                       success: true,
                       dislikes
                   });
               }
           });
});

module.exports = router;
