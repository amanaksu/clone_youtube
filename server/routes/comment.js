const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comments");


//=================================
//             Comments
//=================================

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((error, doc) => {
        if(error) {
            return res.json({
                success: false,
                error
            });
        } else {
            Comment.find({"_id": comment._id})
                   .populate("writer")
                   .exec((err, result) => {
                        if(error) {
                            return res.json({
                                success: false,
                                error
                            });
                        } else {
                            return res.status(200).json({
                                success: true,
                                result
                            })
                        }
                   });
        }
    });
});

router.post("/getComments", (req, res) => {
    Comment.find({ "postId": req.body.videoId })
           .populate("writer")
           .exec((error, comments) => {
                if(error) {
                    return res.status(400).send(error);
                } else {
                    return res.status(200).json({
                        success: true,
                        comments
                    })
                }
           });
    
});

module.exports = router;
