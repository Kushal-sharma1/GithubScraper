const request = require("request");
const cheerio =require("cheerio");

function extractData ( url){
    request(url,cb);
}

function cb(err,res,body){

    if(err){
        console.log(err);
    }else{
        handleHtml(body);
    }
}

function handleHtml(body){
    SelectTool =cheerio.load(body);
    console.log("I am in topic");
    let projectArr = SelectTool('.text-bold.wb-break-word');
    //extract only 8 project in each topic
    for(let i=0;i<8;i++){

    }
}

module.exports={
    extractData:extractData
}