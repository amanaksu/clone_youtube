import React, { useEffect, useState } from 'react';
import axios from "axios";

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);


    let subscribeNumberConfig = {
        userTo: props.userTo
    };

    let subscribedConfig = {
        userTo: props.userTo,
        userFrom: localStorage.getItem("userId")
    };

    useEffect(() => {

        axios.post("/api/subscribe/subscribeNumber", subscribeNumberConfig).then(response => {
            if(response.data.success) {
                console.log(response.data);
                setSubscribeNumber(response.data.subscribeNumber);
            } else {
                alert("Failed to get Subscribe Number.");
            }
        });

        axios.post("/api/subscribe/subscribed", subscribedConfig).then(response => {
            if(response.data.success) {
                console.log(response.data);
                setSubscribed(response.data.subscribed);
            } else {
                alert("Failed to get my subscribe information");
            }
        });

    }, [subscribeNumberConfig, subscribedConfig]);

    return (
        <div>
            <button style={{ backgroundColor: `${Subscribed ? "#CC0000" : "#AAAAAA"}`, borderRadius: "4px", color: "white", padding: "10px 16px", fontWeight: "500", fontSize: "1rem", textTransform: "uppercase"}}
                    onClick >
                {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
            </button>
        </div>
    );
}

export default Subscribe
