import React, { useEffect, useState } from 'react';
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import axios from "axios";
import { Row, Col, List, Avatar } from "antd";

function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState([]);
    
    useEffect(() => {
        const config = {
            videoId: props.match.params.videoId
        };
        
        axios.post("/api/video/getVideoDetail", config).then(response => {
            if(response.data.success) {
                console.log(response.data);
                setVideoDetail(response.data.videoDetail);
            } else {
                alert("Failed to get Video Infomation.");
            }
        });
    }, [props.match.params.videoId]);

    if(VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                {/* Main */}
                <Col lg={18} xs={24}>
                    <div style={{ width: "100%", padding: "3rem 4rem" }}>
                        {/* Display Video*/}
                        <video style={{ width: "100%" }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>
    
                        {/* Sub Info for Display Video */}
                        <List.Item actions={[<Subscribe userFrom={localStorage.getItem("userId")} userTo={VideoDetail.writer._id}></Subscribe>]}>
                            <List.Item.Meta avatar={<Avatar src={VideoDetail.writer.image}></Avatar>} title={VideoDetail.writer.name} description={VideoDetail.description}></List.Item.Meta>
                        </List.Item>
    
                        {/* Comments for Display Video */}
    
                    </div>
                </Col>
    
                {/* SideBar */}
                <Col lg={6} xs={24}>
                    <SideVideo></SideVideo>
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
