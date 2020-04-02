import React, { useEffect, useState } from 'react';
import axios from "axios";

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let subscribeNumberConfig = {
            userTo: props.userTo
        };

        axios.post("/api/subscribe/subscribeNumber", subscribeNumberConfig).then(response => {
            if(response.data.success) {
                // console.log(response.data);
                setSubscribeNumber(response.data.subscribeNumber);
            } else {
                alert("Failed to get Subscribe Number.");
            }
        });

        let subscribedConfig = {
            userFrom: props.userFrom,
            userTo: props.userTo
        };

        axios.post("/api/subscribe/subscribed", subscribedConfig).then(response => {
            if(response.data.success) {
                // console.log(response.data);
                setSubscribed(response.data.subscribed);
            } else {
                alert("Failed to get my subscribe information");
            }
        });

    }, [props.userFrom, props.userTo]);

    const onSubscribe = () => {

        let subscribeConfig = {
            userFrom: props.userFrom,
            userTo: props.userTo
        };

        // 이미 구독중이면
        if(Subscribed) {
            // 구독을 취소한다. 
            axios.post("/api/subscribe/unSubscribe", subscribeConfig).then(response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert("Failed to Cancel Subscribe");
                }
            });

        
        // 아직 구독중이 아니라면
        } else {
            // 구독한다. 
            axios.post("/api/subscribe/subscribe", subscribeConfig).then(response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert("Failed to Subscribe");
                }
            });
        }
    };

    return (
        <div>
            <button style={{ backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`, borderRadius: "4px", color: "white", padding: "10px 16px", fontWeight: "500", fontSize: "1rem", textTransform: "uppercase"}}
                    onClick={onSubscribe} >
                {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
            </button>
        </div>
    );
}

export default Subscribe
