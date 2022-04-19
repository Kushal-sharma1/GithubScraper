const request = require("request");
const {extractData}=require("./extract");
const cheerio =require("cheerio");
const fs =require("fs");
const path =require("path");


let url ="https://github.com/topics";
request(url,cb);

function cb(err,res,body){

    if(err){
        console.log(err);
    }else{
        handleHtml(body);
    }
}

function handleHtml( body){
// console.log(" github");
let SelectTool = cheerio.load(body);
let folderLink = path.join(__dirname,"Scrapped");
if(!fs.existsSync(folderLink)){
  fs.mkdirSync(folderLink);
}

let anchorArr =SelectTool('.no-underline.d-flex.flex-column.flex-justify-center');
for(let i=0;i<anchorArr.length;i++){
    let rLink = SelectTool(anchorArr[i]).attr('href');
    let mainLink ="https://github.com"+rLink;
    // console.log(mainLink);
    extractData(mainLink,folderLink);
}

}