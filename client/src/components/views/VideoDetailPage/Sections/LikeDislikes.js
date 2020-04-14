import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from "antd";
import axios from "axios";

const LikeDislikes = (props) => {

    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [Dislikes, setDislikes] = useState(0);
    const [DisLikeAction, setDisLikeAction] = useState(null);

    let config = {};
    if(props.video) {
        config = {
            userId: props.userId,
            videoId: props.videoId
        }
    } else {
        config = {
            userId: props.userId,
            commentId: props.commentId
        }
    };

    useEffect(() => {
        axios.post("/api/like/getLikes", config).then(response => {
            if(response.data.success) {
                // 얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length);

                // 내가 이미 좋아요를 눌렀는지
                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setLikeAction("liked");
                    }
                });

            } else {
                alert("Failed to get Likes information");
            }
        });

        axios.post("/api/like/getDislikes", config).then(response => {
            if(response.data.success) {
                // 얼마나 많은 싫어요를 받았는지
                setDislikes(response.data.dislikes.length);

                // 내가 이미 싫어요를 눌렀는지
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setDisLikeAction("disliked");
                    }
                });

            } else {
                alert("Failed to get Dislikes information");
            }
        });
    }, [config]);

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" theme={LikeAction === "liked" ? "filled" : "outlined"} onClick></Icon>
                </Tooltip>
                <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Likes} </span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike" theme={DisLikeAction === "disliked" ? "filled" : "outlined"} onClick></Icon>
                </Tooltip>
                <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes;
