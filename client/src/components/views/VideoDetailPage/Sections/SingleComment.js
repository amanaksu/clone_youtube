import React, { useState } from 'react';
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import LikeDislikes from './LikeDislikes';

const SingleComment = (props) => {
    const user = useSelector(state => state.user);
    const videoId = props.match.params.videoId;
    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const onClickOpenReply = () => {
        setOpenReply(!OpenReply);
    };
    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    };
    const onSummit = (event) => {
        event.preventDefault();

        const config = {
            content: CommentValue,
            writer: user.userData._id, 
            postId: videoId,
            responseTo: props.comment._id
        };

        axios.post("/api/comment/saveComment", config).then(response => {
            if(response.data.success) {
                console.log(response.data.result);
                setCommentValue("");
                setOpenReply(false);
                props.refreshFunction(response.data.result);
            } else {
                alert("Failed to save comment.");
            }
        });
    };

    const actions = [
        <LikeDislikes userId={localStorage.getItem("userId")} commentId={props.comment._id}></LikeDislikes>,
        <span onClick={onClickOpenReply} key="comment-basic-reply-to"> Reply to </span>
    ];

    return (
        <div>
            <Comment actions={actions} author={props.comment.writer.name} avatar={<Avatar src={props.comment.writer.image} alt></Avatar>} content={<p>{props.comment.content}</p>}></Comment>

            {OpenReply && 
                <form style={{ display: "flex" }} onSummit={onSummit}>
                    <textarea style={{ width: "100%", borderRadius: "5px" }} onChange={onHandleChange} value={CommentValue} placeholder="Input your comments."></textarea>
                    <br />
                    <button style={{ width: "20%", height: "52px" }} onClick={onSummit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default withRouter(SingleComment);
