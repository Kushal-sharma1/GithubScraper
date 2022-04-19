const request = require("request");
const cheerio =require("cheerio");
const {findIssue} = require("./issues");
const fs =require("fs");
const path =require("path");
let folder; //for accesing folder path
function extractData (url,folderLink){
    request(url,cb);
    folder =folderLink;
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
    // console.log(" topic");
    let topicName =SelectTool('.h1').text().trim();
    topicName.replace(" ","");
    // console.log(topicName);
    let topicFolder = path.join(folder,topicName);
    if(!fs.existsSync(topicFolder)){
        fs.mkdirSync(topicFolder);
    }
    
    let projectArr = SelectTool('a[data-ga-click="Explore, go to repository issues, location:explore feed"]');
    let projectNameArr = SelectTool('.text-bold.wb-break-word');
    //extract only 8 project in each topic
    for(let i=0;i<8;i++){
     let rLink = SelectTool(projectArr[i]).attr('href');
     let mainLink ="https://github.com"+rLink;
     let projectName = SelectTool(projectNameArr[i]).text().trim();
     projectName.replace(" ","");
     let pathforissue = path.join(topicFolder,projectName);
    //  console.log(mainLink);
     findIssue(mainLink,pathforissue);    
    }
    // console.log("----end one topic -----");
}

module.exports={
    extractData:extractData
}