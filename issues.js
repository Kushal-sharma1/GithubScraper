const request = require("request");
const cheerio =require("cheerio");
const pdf = require("pdfkit");
const fs =require('fs');
let projectFolder;
function findIssue ( url,projectPath){
    request(url,cb);
    projectFolder=projectPath;
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
    let doc = new pdf;
    doc.pipe(fs.createWriteStream(projectFolder+".pdf"));
    console.log(projectFolder+".pdf");
    for(let i=0;i<issueArr.length;i++){
        doc.text(`Issue name ${i+1}: `+SelectTool(issueArr[i]).text());
        let mainLink="https://github.com"+SelectTool(issueArr[i]).attr('href');
        doc.text(`Issue Link ${i+1}: `+mainLink);
    }
    doc.end();
   console.log("end of one project") ;
}

module.exports={
    findIssue:findIssue
}