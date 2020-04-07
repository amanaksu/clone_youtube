import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
];

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
    {value: 4, label: "News"}
];

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);
    const [VideoTitle, setVedioTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);  // Private : 0, Public : 1
    const [Category, setCategory] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");

    const onTitleChange = (event) => {
        setVedioTitle(event.currentTarget.value);
    };
    const onDescriptionChange = (event) => {
        setDescription(event.currentTarget.value);
    };
    const onPrivateChange = (event) => {
        setPrivate(event.currentTarget.value);
    };
    const onCategoryChange = (event) => {
        setCategory(event.currentTarget.value);
    };
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {
                "content-type" : "multipart/form-data"
            }
        };
        formData.append("file", files[0]);

        axios.post("/api/video/uploadfiles", formData, config).then(response => {
            if(response.data.success) {
                console.log(response.data);

                let thumbnail_options = {
                    url: response.data.url,
                    filename: response.data.fileName
                };

                setFilePath(response.data.url);

                axios.post("/api/video/thumbnail", thumbnail_options).then(response => {
                    if(response.data.success) {
                        setDuration(response.data.fileDuration);
                        setThumbnailPath(response.data.url);
                    } else {
                        alert("Failed Upload Thumbnail");
                    }
                });
            } else {
                alert("Failed Upload File");
            }
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const config = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        };

        axios.post("/api/video/uploadVideo", config).then(response => {
            if(response.data.success) {
                message.success("Successed");
                setTimeout(() => {
                    props.history.push("/");
                }, 3000);
            } else {
                alert("Failed Uploading Video");
            }
        });
    };

    return (
        <div style={{ maxWidth:"700px", margin:"2rem auto"}}>
            <div style={{ textAlign: "center", marginBottom: "2rem"}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                    {/* Drop Zone */}
                    <Dropzone onDrop={onDrop} multiple={false} maxSize={300000000}> 
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width:"300px", height:"240px", border:"1px solid lightgray", display:"flex", alignItems:"center", justifyContent:"center"}} {...getRootProps()}>
                                <input {...getInputProps()}></input>
                                <Icon type="plus" style={{ fontSize:"3rem" }}></Icon>
                            </div>
                        )}
                    </Dropzone>

                    {/* Thumbnail */}
                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"></img>
                        </div> 
                    }
                </div>
                <br />
                <br />

                <label>Title</label> 
                <Input onChange={onTitleChange} value={VideoTitle}></Input>
                <br />
                <br />
                
                <label>Description</label> 
                <TextArea onChange={onDescriptionChange} value={Description}></TextArea>
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />


                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
                
            </Form>
        </div>
    )
}

export default VideoUploadPage;
