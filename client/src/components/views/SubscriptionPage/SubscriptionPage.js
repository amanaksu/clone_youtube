import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from "moment";
import { Card, Avatar, Col, Typography, Row } from "antd";


const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
    const [Video, setVideo] = useState([]);

    useEffect(() => {

        const subscriptionConfig = {
            userFrom: localStorage.getItem("userId")
        };

        axios.post("/api/video/getSubscriptionVideo", subscriptionConfig).then(response => {
            if(response.data.success) {
                // console.log(response.data);
                setVideo(response.data.videos);
            } else {
                alert("Failed to get Videos");
            }
        });
    }, []);

    const renderCards = Video.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);

        return  <Col key={index} lg={6} md={8} xs={24}>
                    <div style={{ position: "relative" }}>
                        <a href={`/video/${video._id}`}>
                        <img style={{ width: "100%" }} src={`http://localhost:5000/${video.thumbnail}`} alt={video.Title}></img>
                            <div className="duration">
                                <span>{minutes} : {seconds}</span>
                            </div>
                        </a>
                    </div>
                    <br />

                    <Meta avatar={<Avatar src={video.writer.image}></Avatar>} title={video.title} description=""></Meta>
                    <span>{video.writer.name}</span>
                    <br />
                    <span style={{ marginLeft: "3rem" }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
                </Col>
    });

    return (
        <div style={{ width: "85", margin: "3rem auto" }}>
            <Title level={2}>
                Subscription Videos
            </Title>
            <hr />

            <Row gutter={[32, 16]}>

                { renderCards }

            </Row>
        </div>  
    );
}

export default SubscriptionPage
