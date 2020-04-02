const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");

const { Subscriber } = require("../models/Subscriber");



//=================================
//             Subscriber
//=================================

router.post("/subscribeNumber", (req, res) => {
    Subscriber.find({ "userTo" : req.body.userTo })
              .exec((error, subscribe) => {
                    if(error) {
                        return res.status(400).send(error);
                    } else {
                        return res.status(200).json({ 
                            success: true, 
                            subscribeNumber: subscribe.length
                        });
                    }
              });
});

router.post("/subscribed", (req, res) => {
    Subscriber.find({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
              .exec((error, subscribe) => {
                    if(error) {
                        return res.status(400).send(error);
                    } else {
                        let result = false;
                        if(subscribe.length !== 0) {
                            result = true;
                        }

                        return res.status(200).json({
                            success: true,
                            subscribed: result
                        });
                    }
              });
});

module.exports = router;
