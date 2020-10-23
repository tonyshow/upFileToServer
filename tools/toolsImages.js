var images = require("images");
var app = module.exports = {};

app.run = function(_fullPath, savePath)
{
    return new Promise(resolve =>
    {

        let type = _fullPath.substr(_fullPath.lastIndexOf('.') + 1, _fullPath.length)
        console.log(type)
        images(_fullPath).saveAsync(savePath, type,
            {
                quality: 50
            },
            function()
            {
                console.log("完成")
                resolve("newfiles/template-banner.png");
            })

    })
}