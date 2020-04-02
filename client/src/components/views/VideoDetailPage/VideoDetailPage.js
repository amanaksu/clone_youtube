import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Row, Col, List, Avatar } from "antd";

function VideoDetailPage(props) {

    // const videoId = props.match.params.videoId;
    const config = {
        videoId: props.match.params.videoId
    };

    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        axios.post("/api/video/getVideoDetail", config).then(response => {
            if(response.data.success) {
                console.log(response.data.videoDetail);
                setVideoDetail(response.data.videoDetail);
            } else {
                alert("Failed to get Video Infomation.");
            }
        });
    }, []);

    if(VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                {/* Main */}
                <Col lg={18} xs={24}>
                    <div style={{ width: "100%", padding: "3rem 4rem" }}>
                        {/* Display Video*/}
                        <video style={{ width: "100%" }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>
    
                        {/* Sub Info for Display Video */}
                        <List.Item action>
                            <List.Item.Meta avatar={<Avatar src={VideoDetail.writer.image}></Avatar>} title={VideoDetail.writer.name} description={VideoDetail.description}></List.Item.Meta>
                        </List.Item>
    
                        {/* Comments for Display Video */}
    
                    </div>
                </Col>
    
                {/* SideBar */}
                <Col lg={6} xs={24}>
                    SideVideos
                </Col>
            </Row>
        );
    } else {
        return (
            <div>
                Loading......
            </div>
        );
    }
}

export default VideoDetailPage;
