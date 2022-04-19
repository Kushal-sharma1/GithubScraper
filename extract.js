const request = require("request");
const cheerio =require("cheerio");
const {findIssue} = require("./issues");

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
    let projectArr = SelectTool('a[data-ga-click="Explore, go to repository issues, location:explore feed"]');
    //extract only 8 project in each topic
    for(let i=0;i<8;i++){
     let rLink = SelectTool(projectArr[i]).attr('href');
     let mainLink ="https://github.com"+rLink;
    //  console.log(mainLink);
     findIssue(mainLink);    
    }
    console.log("----end one topic -----");
}

module.exports={
    extractData:extractData
}