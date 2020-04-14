const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


//=================================
//             Like
//=================================

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


router.post("/upLike", (req, res) => {
    let config = {}
    if(req.body.videoId) {
        config = {
            userId: req.body.userId,
            videoId: req.body.videoId
        }
    } else {
        config = {
            userId: req.body.userId,
            commendId: req.body.commendId
        }
    };

    // Like Collection 에 클릭 정보를 넣어준다. 
    const like = new Like(config);
    like.save((error, likeResult) => {
        if(error) {
            return res.json({
                success: false,
                error
            });
        } else {
            // 만약 Dislike 이 이미 클릭된 경우, Dislike 를 1 줄여준다. 
            Dislike.findOneAndDelete(config)
                   .exec((error, dislikeResult) => {
                        if(error) {
                            return res.status(400).json({
                                success: false,
                                error
                            });
                        } else {
                            return res.status(200).json({
                                success: true
                            })
                        }
                   });
        }
    });
});

router.post("/unLike", (req, res) => {
    let config = {}
    if(req.body.videoId) {
        config = {
            userId: req.body.userId,
            videoId: req.body.videoId
        }
    } else {
        config = {
            userId: req.body.userId,
            commendId: req.body.commendId
        }
    };

    Like.findOneAndDelete(config)
        .exec((error, result) => {
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


//=================================
//             Dislike
//=================================

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

router.post("/upDislike", (req, res) => {
    let config = {}
    if(req.body.videoId) {
        config = {
            userId: req.body.userId,
            videoId: req.body.videoId
        }
    } else {
        config = {
            userId: req.body.userId,
            commendId: req.body.commendId
        }
    };

    // DisLike Collection 에 클릭 정보를 넣어준다. 
    const dislike = new Dislike(config);
    dislike.save((error, dislikeResult) => {
        if(error) {
            return res.json({
                success: false,
                error
            });
        } else {
            // 만약 Like 이 이미 클릭된 경우, Like 를 1 줄여준다. 
            Like.findOneAndDelete(config)
                .exec((error, likeResult) => {
                    if(error) {
                        return res.status(400).json({
                            success: false,
                            error
                        });
                    } else {
                        return res.status(200).json({
                            success: true
                        })
                    }
                });
        }
    });

});

router.post("/unDislike", (req, res) => {
    let config = {}
    if(req.body.videoId) {
        config = {
            userId: req.body.userId,
            videoId: req.body.videoId
        }
    } else {
        config = {
            userId: req.body.userId,
            commendId: req.body.commendId
        }
    };

    Dislike.findOneAndDelete(config)
           .exec((error, result) => {
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
