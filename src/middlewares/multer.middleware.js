import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null,'./public/temp')
    },
    filename: function(req,file,cb) {
        const currentDate = new Date().toISOString().split('T')[0];
        const randomSixDigit = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
        const uniqueSuffix = currentDate+`-`+randomSixDigit
        cb(null,uniqueSuffix+`.pdf`)
    }
})

const upload = multer({
    storage: storage
})

export default upload