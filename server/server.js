const config = require('./config/config');
const file = new (require('./util/file'))(config.file_path);
const express = require('express');

const app = express();

app.use(express.json());

app.listen(config.port,"0.0.0.0", () => {
    console.log('Server is running on port ' + config.port);
})

app.get('/list', (req, res) => {
    res.json(file.list());
})

app.get('/download/:filename',(req,res)=>{
    let file = file.getFilePath(req.params.filename);
    if(!file) return res.status(404).send('File not found');
    return res.download(file);
})

app.post('/delete', (req, res) => {
    let {file_name} = req.body;
    if(file.delete(file_name)){
        return res.json({success: true});
    }
    return res.json({success: false,message: 'File not found'});
})
