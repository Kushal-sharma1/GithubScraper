const request = require("request");
const cheerio =require("cheerio");

function findIssue ( url){
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
    console.log("I am in issue");
    let issueArr = SelectTool('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
    for(let i=0;i<issueArr.length;i++){
        console.log("Issue name: "+SelectTool(issueArr[i]).text());
        let mainLink="https://github.com"+SelectTool(issueArr[i]).attr('href');
        console.log("Issue Link: "+mainLink);
    }
   console.log("end of one project") ;
}

module.exports={
    findIssue:findIssue
}