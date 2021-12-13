const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (
    req: any,
    file: any,
    cb: (arg0: any, arg1: string) => void
  ) {
    cb(null, "public/");
  },
  filename: function (
    req: any,
    file: { fieldname: string; originalname: string },
    cb: (arg0: any, arg1: string) => void
  ) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
module.exports = upload;
