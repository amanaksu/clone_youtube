import React, { useState } from "react";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
    const user = useSelector(state => state.user);
    const videoId = props.match.params.videoId;
    const [CommentValue, setCommentValue] = useState("");

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value);
    };

    const onSummit = (event) => {
        event.preventDefault();

        const config = {
            content: CommentValue,
            writer: user.userData._id, 
            postId: videoId
        };

        axios.post("/api/comment/saveComment", config).then(response => {
            if(response.data.success) {
                console.log(response.data.result);
                setCommentValue("");
                props.refreshFunction(response.data.result);
            } else {
                alert("Failed to save comment.");
            }
        });
    };

    return (
        <div>
            <br />
            <p>Replies</p> 
            <hr />

            {/* Comment Lists */}
            {props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment key={index} refreshFunction={props.refreshFunction} comment={comment}></SingleComment>
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentList={props.commentList}></ReplyComment>
                    </React.Fragment>
                )
            ))}
            
            {/* Root Comment Form */}
            <form style={{ display: "flex" }} onSummit={onSummit}>
                <textarea style={{ width: "100%", borderRadius: "5px" }} onChange={handleClick} value={CommentValue} placeholder="Input your comments."></textarea>
                <br />
                <button style={{ width: "20%", height: "52px" }} onClick={onSummit}>Submit</button>
            </form>
        </div>
    )
}

export default withRouter(Comment);