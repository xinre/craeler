const https = require('https');
let fs = require('fs');
var http = require("http");

let option={
    hostname:'api.bilibili.com',
    path:'/x/web-interface/ranking/region?rid=21&day=7&original=0&jsonp=jsonp&_=1572329629164',
    headers:{
        'Referer': 'https://www.bilibili.com/',
        'Sec-Fetch-Mode': 'no-cors',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
  };

const dealImg = (data) => {
    for(let i in data){
        console.log(data[i].pic);
        http.get(data[i].pic, function(res){
            var imgData = "";
        
            res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        
        
            res.on("data", function(chunk){
                imgData+=chunk;
            });
        
            res.on("end", function(){
                fs.writeFile("./a/downImg"+i+'.jpg', imgData, "binary", function(err){
                    if(err){
                        console.log("down fail");
                    }
                    console.log("down success");
                });
            });
        })
    }
}

https.get(option, function (res) {
    let chunks = [],
        size = 0;
    res.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length;
    });

    res.on('end', function () {
        console.log('数据包传输完毕');
        let data = Buffer.concat(chunks, size);
        let html = JSON.parse(data.toString());
        dealImg(html.data)
        // fs.mkdir('./a', function (err) {
        //     if (!err) {
        //         fs.writeFile('./a/1.txt', data.toString(), function (err) {
        //             if (err) {
        //                 console.log('写入失败', err);
        //             } else {
        //                 console.log('写入成功');
        //             }
        //         })
        //     }
        
        // })
    });
})