import React, { useEffect, useState } from 'react';
import axios from "axios";

function SideVideo() {

    const [sideVideo, setsideVideo] = useState([]);

    useEffect(() => {
        axios.get("/api/video/getVideos").then(response => {
            if(response.data.success) {
                console.log(response.data);
                setsideVideo(response.data.videos);
            } else {
                alert("Failed to get Videos");
            }
        });
    }, []);

    const renderSizeVideo = sideVideo.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);

        return (
            <div key={index} style={{ display:"flex", marginBottom: "1rem", padding: "0 2rem"}}>
                <div style={{ width: "40%", marginRight: "1rem" }}>
                    <a href>
                        <img style={{ width: "100%", height: "100%" }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"></img>
                    </a>
                </div>

                <div>
                    <a href style={{ color: "gray" }}>
                        <span style={{ fontSize: "1rem", color: "black" }}>{video.title}</span><br />
                        <spen>{video.writer.name}</spen><br />
                        <span>{video.views}</span><br />
                        <spen>{minutes} : {seconds}</spen>
                    </a>
                </div>
            </div>)
    });

    return (
        <React.Fragment>
            
            <div style={{ marginTop: "3rem" }}></div>
            {renderSizeVideo}

        </React.Fragment>
    )
}

export default SideVideo
