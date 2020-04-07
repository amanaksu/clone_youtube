import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

function Comment(props) {
    const user = useSelector(state => state.user);
    const videoId = props.match.params.videoId;
    const [commentValue, setcommentValue] = useState("");

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value);
    };

    const onSummit = (event) => {
        event.preventDefault();

        const config = {
            content: commentValue,
            writer: user.userData._id, 
            postId: videoId
        };

        axios.post("/api/comment/saveComment", config).then(response => {
            if(response.data.success) {
                console.log(response.data.result);
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

            {/* Root Comment Form */}
            <form style={{ display: "flex" }} onSummit={onSummit}>
                <textarea style={{ width: "100%", borderRadius: "5px" }} onChange={handleClick} value={commentValue} placeholder="Input your comments."></textarea>
                <br />
                <button style={{ width: "20%", height: "52px" }} onClick={onSummit}>Submit</button>
            </form>
        </div>
    )
}

export default withRouter(Comment);