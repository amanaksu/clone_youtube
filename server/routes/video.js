const express = require('express');
const router = express.Router();
// const { User } = require("../models/Vidoe");

const { auth } = require("../middleware/auth");
const multer = require("multer");



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

module.exports = router;
