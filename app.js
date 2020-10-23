const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const app = express();
const path = require('path');
var toolsImages = require("./tools/toolsImages");
var tools = require("./tools/tools");
app.use(bodyParser.urlencoded(
{
    extended: false
}));
app.use(multer(
{
    dest: './dist'
}).array('file'));
app.post('/file_upload', function(req, res)
{
    console.log(req.files[0]);
    fs.readFile(req.files[0].path, function(err, data)
    {
        if (err)
        {
            console.log('Error');
        }
        else
        {
            var dir_file = __dirname + '/uploadFiles/' + req.files[0].originalname;
            fs.writeFile(dir_file, data, function(err)
            {
                fs.unlinkSync(req.files[0].path, function() {});
                res.redirect('/result.html?fileName=' + req.files[0].originalname);
            })
        }
    })
});

app.post('/docom', function(req, res)
{

    let file = path.resolve('./uploadFiles/' + req.body.fileName);
    let savePath = path.resolve('./public/newfiles/' + req.body.fileName);

    tools.getFileSizeAsync(file).then(bfsize =>
    {
        toolsImages.run(file, savePath).then(downloadFilePath =>
        {
            tools.getFileSizeAsync(savePath).then(afsize =>
            {
                res.redirect('/download.html?downloadurl=' + "http://127.0.0.1/newfiles/" + req.body.fileName + `&bfsize=${bfsize}&afsize=${afsize}`);
            })

        })
    });

})

app.use(express.static(path.join(__dirname, 'public')))
app.listen(80);