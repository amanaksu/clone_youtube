const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");



// STORAGE MULTER CONFIG
let storage_config = multer.diskStorage({              // 스토리지에 파일 저장시 정책 설정
    destination: (req, file, callback) => {     // 파일 저장 위치
        callback(null, "uploads/");
    },
    filename: (req, file, callback) => {        // 저장시 파일명
        callback(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, callback) => {      // 업로드되는 파일 정책
        const allowedExt = [".jpg", ".png", ".mp4"];
        const ext = path.extname(file.originalname);
        if (!allowedExt.includes(ext)) {
            return callback(res.status(400).end(`Only ${allowedExt} is allowed`), false);
        }

        callback(null, true);
    } 
});

const upload = multer({ storage: storage_config }).single("file");


//=================================
//             Vidoe
//=================================

router.post("/uploadfiles", (req, res) => {
    // Client 에서 받은 비디오를 서버에 저장한다. 
    upload(req, res, err => {
        if(err) {
            return res.json({
                success: false,
                err
            });
        } else {
            return res.json({
                success: true,
                url: res.req.file.path,
                fileName: res.req.file.filename
            });
        }
    })
});

router.post("/uploadVideo", (req, res) => {
    // 비디오 정보들을 저장한다. 

    const video = new Video(req.body);
    video.save((error, doc) => {
        if(error) {
            return res.json({
                success: false,
                error
            });
        } else {
            return res.status(200).json({
                success: true
            });
        }
    });
    
});

router.get("/getVideos", (req, res) => {
    // 비디오를 DB 에서 가져온 후 클라이언트에 보낸다. 

    Video.find().populate("writer").exec((error, videos) => {
        if(error) {
            return res.status(400).send(error);
        } else {
            return res.status(200).json({
                success: true,
                videos
            });
        }
    });
});

router.post("/thumbnail", (req, res) => {
    // 썸네일을 생성하고 비디오 정보를 가져오기 

    let fileDuration = "";                  // 비디오 정보 - RunningTime
    let filePath = "";                      // 저장된 썸네일 파일명

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(error, metadata) {
        fileDuration = metadata.format.duration;
    });

    // 썸네일 생성
    ffmpeg(req.body.url)
    .on("filenames", function (filenames) {             // 썸네일 파일 저장 위치 
        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on("end", function() {                             // 썸네일 생성시
        return res.json({
            success: true,
            url: filePath, 
            fileDuration: fileDuration
        });
    })
    .on("error", function(error) {                      // 썸네일 생성 실패시
        return res.json({
            success: false,
            error
        });
    })
    .screenshot({
        count: 3,                           // 썸네일 개수
        folder: "uploads/thumbnails",       // 썸네일 저장 폴더
        size: "320x240",                    // 썸네일 크기
        filename: "thumbnail-%b.png"        // 썸네일 파일명 (%b : 원본 파일명에서 확장자를 제외한 파일명)
    });
});

module.exports = router;
