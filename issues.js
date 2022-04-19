const request = require("request");
const cheerio =require("cheerio");
const pdf = require("pdfkit");
const fs =require('fs');

function findIssue ( url,projectPath){

    request(url,function cb(err,res,body){
         if(err){
             console.log(err);
         }else{
             handleHtml(body,projectPath);
         }
     });
    
}


function handleHtml(body,projectPath){
    SelectTool =cheerio.load(body);
    // console.log("issue");
    let issueArr = SelectTool('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
    let doc = new pdf;
    doc.pipe(fs.createWriteStream(projectPath+".pdf"));
    // console.log(projectPath+".pdf");
    for(let i=0;i<issueArr.length;i++){
        doc.text(`Issue name ${i+1}: `+SelectTool(issueArr[i]).text());
        let mainLink="https://github.com"+SelectTool(issueArr[i]).attr('href');
        doc.text(`Issue Link ${i+1}: `+mainLink);
    }
    doc.end();
//    console.log("end of one project") ;
}

module.exports={
    findIssue:findIssue
}