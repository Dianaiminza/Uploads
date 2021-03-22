
var express=require('express');
var path = require('path');
var app =express();
var multer  = require('multer');
var cors = require('cors');
var AdmZip = require('adm-zip');
const sharp = require('sharp');
// const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors());
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);  
    }
    // filename: function(req, file, cb) {
    //     cb(null, file.fieldname + '-' + Date.now());
    // }
});


function fileFilter (req,res,next) {
    
    // console.log(req.files);
    let files= req.files;
            if (!req.files.length) {
        return res.json({
            success:false,
            message:'File is required'
        })
    }
else if (files.every(file => file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) {
  return next();
} else {
    return res.json({
        success: false,
        message: 'not allowed'
    });
}

}

var upload = multer({ storage: storage});
app.post('/upload', upload.single('file'),fileFilter, function (req, res, next) {
    const host = req.hostname;
const filePathOriginal = req.protocol + "://" + host + ':8000/uploads/' + req.file.filename;
const filePathThumbnail = req.protocol + "://" + host + ':8000/uploads/thumbnail/' + req.file.filename;
const filePathPreview = req.protocol + "://" + host + ':8000/uploads/preview/' + req.file.filename;

sharp(__dirname + '/uploads/'+req.file.filename).resize(200,200) 
.jpeg({quality : 50}).toFile(__dirname  
    + '/uploads/thumbnail/'+req.file.filename); 
sharp(__dirname + '/uploads/'+req.file.filename).resize(640,480) 
.jpeg({quality : 80}).toFile(__dirname  
    + '/uploads/preview/'+req.file.filename); 
    
return res.json({ 
    origianl: filePathOriginal,
    preview:filePathPreview,
    thumbnail:filePathThumbnail,
    filePath: `uploads/${req.file.filename}`
});

})
app.post('/multiple',upload.array('file',9),fileFilter,(req,res)=>{  
    const host = req.hostname;
    var zip = new AdmZip();
    const zipname=Date.now()+'.zip';
const zippath=req.protocol + "://" + host + ':8000/uploads/zipped/' + zipname;
const zippathoriginal=req.protocol + "://" + host + ':8000/uploads/zipped/origInal/' + zipname;
const zippaththumbnail=req.protocol + "://" + host + ':8000/uploads/zipped/thumbnail/' + zipname;
const zippathpreview=req.protocol + "://" + host + ':8000/uploads/zipped/preview/' + zipname;

    let results = req.files.map(oneFile =>{  
        var outputFilePath = req.protocol + "://" + host + ':8000/uploads/zipped/' + Date.now() + ".zip";
        const filePathOriginal = req.protocol + "://" + host + ':8000/uploads/' + oneFile.filename;
        const filePathThumbnail =req.protocol + "://" + host + ':8000/uploads/thumbnail/' + oneFile.filename;
        const filePathPreview = req.protocol + "://" + host + ':8000/uploads/preview/' +oneFile.filename;
        sharp(__dirname + '/uploads/'+oneFile.filename).resize(200,200)
        .jpeg({quality : 50}).toFile(__dirname  
            + '/uploads/thumbnail/'+oneFile.filename); 
        sharp(__dirname + '/uploads/'+oneFile.filename).resize(640,480) 
        .jpeg({quality : 80}).toFile(__dirname  
            + '/uploads/preview/'+oneFile.filename); 
            if (req.files) {
                req.files.forEach((file) =>{   
                zip.addLocalFile(file.path);
                zip.addLocalFile(__dirname  
                    + '/uploads/thumbnail/'+oneFile.filename); 
                zip.addLocalFile(__dirname  
                    + '/uploads/preview/'+oneFile.filename);
                });
              }       
            return {
                origianl: filePathOriginal,
               preview:filePathPreview,
               thumbnail:filePathThumbnail,
              output:outputFilePath,
           filePath: `uploads/${oneFile.filename}`
            }
    })  
    
        zip.writeZip(__dirname  
            + '/uploads/zipped/'+zipname); 
            zip.writeZip(__dirname  
                + '/uploads/zipped/original/'+zipname); 
            zip.writeZip(__dirname  
                + '/uploads/zipped/preview/'+zipname); 
                zip.writeZip(__dirname  
                    + '/uploads/zipped/thumbnail/'+zipname); 
                    zip.extractAllTo(__dirname  
                        + '/uploads/extracts/', true);                   
return res.json(
    {results, zip:zippath ,original:zippathoriginal,preview:zippathpreview,thumbnail:zippaththumbnail}  
);

})

app.listen(8000, function(){
//   console.log("server is listening on port: 8000");
});

module.exports = app;
