const express = require('express');
const router = express.Router();

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
    Subscriber.find({ "userFrom": req.body.userFrom, "userTo": req.body.userTo })
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

router.post("/unSubscribe", (req, res) => {
    Subscriber.findOneAndDelete({ "userFrom": req.body.userFrom, "userTo": req.body.userTo })
              .exec((error, doc) => {
                  if(error) {
                      return res.status(400).json({
                          success: false,
                          error
                      });
                  } else {
                      return res.status(200).json({
                          success: true,
                          doc
                      });
                  }
              });
});

router.post("/subscribe", (req, res) => {
    const subscribe = new Subscriber(req.body);
    subscribe.save((error, doc) => {
        if(error) {
            return res.status(400).json({
                success: false,
                error
            });
        } else {
            return res.status(200).json({
                success: true
            });
        }
    });
});



module.exports = router;
