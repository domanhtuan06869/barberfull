const multerS3 = require("multer-s3");
const multer = require("multer");
const aws = require("aws-sdk");

aws.config.update({

    secretAccessKey: "",
    accessKeyId:"",
    region: "ap-southeast-1" // region of your bucket
});

const s3 = new aws.S3();
const uploadAWS = multer({
    storage: multerS3({
        s3: s3,
        bucket: "bbs-1998",
        // cacheControl: "max-age=2592000",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});
module.exports={
    s3:s3,
    uploadAWS:uploadAWS,
    upload:upload,

   
    creatUploadS3: function (path, etag) {
        return multer({
             storage: multerS3({
                 s3: s3,
                 bucket: ""+path,
                 contentType: multerS3.AUTO_CONTENT_TYPE,
                 acl: "public-read",
                 metadata: function (req, file, cb) {
                     cb(null, {
                         fieldName: file.fieldname,
                     });
                 },
                 key: function (req, file, cb) {
                     cb(null, req.body.filename);
                 }
             })
         });
    }
}