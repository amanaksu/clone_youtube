import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

const ReplyComment = (props) => {

    const [ChildCommentCount, setChildCommentCount] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentCount = 0;

        props.commentList.map(comment => {
            if(comment.responseTo === props.parentCommentId) {
                commentCount += 1;
            }
        });

        setChildCommentCount(commentCount);
    }, [props.commentList, props.parentCommentId]);

    const renderReplyComment = (parentCommentId) => {
        props.commentList.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: "80%", marginLeft: "40px" }}>
                        <SingleComment key={index} refreshFunction={props.refreshFunction} comment={comment}></SingleComment>
                        <ReplyComment refreshFunction={props.refreshFunction} commentList={props.commentList}></ReplyComment>
                    </div>
                }
            </React.Fragment>
        ));
    };

    const onClickOpenReplyComments = () => {
        setOpenReplyComments(!OpenReplyComments);
    };

    return (
        <div>

            { ChildCommentCount > 0 &&
                <p style={{ fontSize: "14px", margin: 0, color: "gray" }} onClick={onClickOpenReplyComments}>
                    View {ChildCommentCount} more comment(s)
                </p>
            }
            
            { OpenReplyComments && 
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment;
