import express from 'express';
import multer from "multer" ;
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3003;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname , 'uploads'))
  },
  filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
     cb(null, uniqueSuffix + '-' + file.originalname);
    req.nameFile = uniqueSuffix + '-' + file.originalname;
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('avatar'), (req, res) => {
 return res.json( {
   status : 'upload file success',
   nameFile : req.nameFile
 } )
})
app.post('/delete-file', (req, res) => {
   
 
  fs.unlink( path.join(__dirname , 'uploads', req.body.image), (err) => {
    if (err) {
      return res.json({
        status : 'error',
        err
      });
    }
    return res.json({
      status : 'success',
      message : "Delete File successfully."
    });
});

 })



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})