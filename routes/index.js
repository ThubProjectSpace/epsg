var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var http = require('http');
var fs = require('fs');
var monk = require('monk');
var db = monk('localhost:27017/payroll');
var pay = db.get('pay');
var router = express.Router();
var async = require("async");
var http = require("http");
var nodemailer = require('nodemailer');
var moment=require('moment');

router.get('/',function(req,res){
  res.render('epsg2');
});
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

    var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                }).single('file');

     /** API path that will upload the files */
    router.post('/upload', function(req,res) {  // Code to upload 
        var exceltojson;
            upload(req,res,function(err){
            if(err){
                 console.log("error");
                 return;
            }
              /** Multer gives us file info in req.file object */
            if(!req.file){
                console.log("No file passed");
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            console.log(req.file.path);
            try {
                exceltojson({
                    input: req.file.path,
                    output: "output.json", //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.send('error in importing data');
                    } 
                       //res.json('Data imported sucessfully');
                      // console.log("Data imported sucessfully");
                       //res.end('Data imported sucessfully');
                       saveData(result);
                       console.log("Inserted a document into the employee collection.");
                       res.render("epsg2");
                      
                });

            } catch (e){
                console.log("Corupted excel file");
            }
            
        });
});
function saveData(data) {
 
for(var i=0;i<data.length;i++){
 pay.update({"month":data[i].month,"year":data[i].year,"empid":data[i].empid},{$set:{"accountnumber":data[i].accountnumber,"employeename":data[i].employeename,"doj":data[i].doj,"dept":data[i].dept,"emailid":data[i].emailid,"designation":data[i].designation,"qualification":data[i].qualification,"workingat":data[i].workingat,"uanno":data[i].uanno,"basic":data[i].basic,"da":data[i].da,"hra":data[i].hra,"otherse":data[i].otherse,"gross":data[i].gross,"days":data[i].days,"cls":data[i].cls,"lop":data[i].lop,"noofworkingdays":data[i].noofworkingdays,"total":data[i].total,"pt":data[i].pt,"epf":data[i].epf,"tds":data[i].tds,"gi":data[i].gi,"advance":data[i].advance,"canteen":data[i].canteen,"othersd":data[i].othersd,"totaldeduction":data[i].totaldeduction,"netsalary":data[i].netsalary}},{upsert: true },  function(err, data ) { 
    if(err)
    console.log(err);

});
}
}
router.post('/paysal', function(req, res) {  //code to fetch the data from database 
     var y = moment().format('YYYY');
     console.log(y);
     var m = moment().subtract(1,'months').format('MMMM');
     console.log(m);
     
  console.log(m,y);
    pay.find({$and:[{"month":m},{"year":y}]},function(e,docs){
      console.log(docs);
        res.send(docs);

    });
});
router.post('/generate', function(req, res) {  //code to fetch the data from database 
     var y = req.body.year;
     var m = req.body.month;
     var s= req.body.name;
     
    pay.find({$and:[{"month":m},{"year":y},{"empid":s}]},function(e,docs){
      console.log(docs[0].emailid);
      var email = docs[0].emailid;
      var id = docs[0].empid;
      console.log(docs[0].empid);
      var name = docs[0].employeename;
      console.log(docs[0].employeename);
      var month = docs[0].month;
      console.log(docs[0].month);
      var year = docs[0].year;
      console.log(docs[0].year);
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'myhub@aditya.ac.in', // generated ethereal user
            pass: 'Thub@123' // generated ethereal password
        }
    });
    var filename=id+'.pdf';
    var msg="<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width'><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><title>Payslip Email</title><style type='text/css'>@media only screen and (max-width: 800px) {table[class=body] h1 {font-size: 28px !important;table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a {font-size: 16px !important; table[class=body] .wrapper,table[class=body] .article {padding: 10px !important; }table[class=body] .content {padding: 0 !important; }table[class=body] .container {padding: 0 !important;width: 100% !important; }table[class=body] .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important; }table[class=body] .btn table {width: 100% !important; }table[class=body] .btn a {width: 100% !important; }table[class=body] .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important; }}@media all {.ExternalClass {width: 100%; }.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%; }.apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important; }.btn-primary table td:hover {background-color: #34495e !important; }.btn-primary a:hover {background-color: #34495e !important;border-color: #34495e !important; } }.style1 {font-size: 9px}</style></head><body class='' style='background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;'><table border='0' cellpadding='0' cellspacing='0' class='body' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td><td class='container' style='font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;'><div class='content' style='box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;'><!-- START CENTERED WHITE CONTAINER --><span class='preheader' style='color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;'></span><table class='main' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;'><tr><td class='wrapper' style='font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'><p align='right' style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'><img src='http://ecourses.aec.edu.in/thub/images/myhub_aditya.png' width='84' height='50' alt='AdityaLogo'><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Hi"+" "+name+",<p style='font-family:calibri;font-color:#295890;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Please find your payslip for the month of"+" "+month+" "+year+" "+"attached with the mail.<p>Regards,<br><img src='http://ecourses.aec.edu.in/thub/images/myhublogo.png' width='84' height='50' alt='MyHubLogo'><br>Payroll processing system</p><br><p style='font-family:sans-serif;font-size:10px;font-weight:normal;margin:0;Margin-bottom:15px;'> Your PDF Payslip is delivered to your inbox, and you will be able to open the PDF attachment, only if you have Adobe reader version 7.0.8 and above. If Adobe Reader is not installed / upgraded in your PC. <a href='https://acrobat.adobe.com/in/en/acrobat/pdf-reader.html'>click here</a>.</p><div align='justify'><br></div><p style='font-family:sans-serif;font-size:10px;font-weight:normal;margin:0;Margin-bottom:15px;'>The information contained in this electronic message and any attachments to this message are intended for the exclusive use of the addressee(s) and may contain proprietary, confidential or privileged information. If you are not the intended recipient, you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately and destroy all copies of this message and any attachments. WARNING: Computer viruses can be transmitted via email. The recipient should check this email and any attachments for the presence of viruses. The management accepts no liability for any damage caused by any virus transmitted by this email.</p><table border='0' cellpadding='0' cellspacing='0' class='btn btn-primary' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;'><tbody><tr><td align='left' style='font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;'><center><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;'><tbody><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;'> </td></tr></tbody></table></center></td></tr></tbody></table><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'></p><p style='font-family:sans-serif;font-size:11px;font-weight:normal;margin:0;Margin-bottom:15px;text-align:center;'>Have a Good Day!.</p></td></tr></table></td></tr></table><!-- START FOOTER --><div class='footer' style='clear:both;padding-top:10px;text-align:center;width:100%;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td class='content-block' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'><span class='apple-link' style='color:#999999;font-size:12px;text-align:center;'>Aditya Educational Institutions,Surampalem,533437</span><br>This email is system generated, please do not respond to this email.</td></tr><tr><td class='content-block powered-by' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'>Powered by <a href='http://thub.ac.edu.in' style='color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;text-decoration:none;'>T-HUB team</a>.</td></tr></table></div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --></div></td><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td></tr></table></body></html>";

    // setup email data with unicode symbols
    var mailOptions = {
                from: '"myHUB " <myhub@aditya.ac.in>',      
                to: email,
                subject: 'Payslip for the month of'+id, 
                text: 'Payslip', // plain text body
    html: msg,// html body

    attachments: [
       //{data:msg, alternative:true},
      {path:"C:/users/HP/Downloads/"+filename, type:"application/pdf",name:filename}
    ]  

};

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Not Sent');
        }
        console.log('Mail Sent');
    });
        res.send(docs);

    });
});


router.post('/pays', function(req, res) { // routing to pay.html
    
        res.render('pay');
      });
router.post('/generate', function(req, res) {  //code to fetch the data from database 
     var y = req.body.year;
     var m = req.body.month;
     var s= req.body.name;
     
    pay.find({$and:[{"month":m},{"year":y},{"empid":s}]},function(e,docs){
      console.log(docs[0].emailid);
      var email = docs[0].emailid;
      var id = docs[0].empid;
      console.log(docs[0].empid);
      var name = docs[0].employeename;
      console.log(docs[0].employeename);
      var month = docs[0].month;
      console.log(docs[0].month);
      var year = docs[0].year;
      console.log(docs[0].year);
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'myhub@aditya.ac.in', // generated ethereal user
            pass: 'Thub@123' // generated ethereal password
        }
    });
    var filename=id+'.pdf';
    var msg="<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width'><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><title>Payslip Email</title><style type='text/css'>@media only screen and (max-width: 800px) {table[class=body] h1 {font-size: 28px !important;table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a {font-size: 16px !important; table[class=body] .wrapper,table[class=body] .article {padding: 10px !important; }table[class=body] .content {padding: 0 !important; }table[class=body] .container {padding: 0 !important;width: 100% !important; }table[class=body] .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important; }table[class=body] .btn table {width: 100% !important; }table[class=body] .btn a {width: 100% !important; }table[class=body] .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important; }}@media all {.ExternalClass {width: 100%; }.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%; }.apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important; }.btn-primary table td:hover {background-color: #34495e !important; }.btn-primary a:hover {background-color: #34495e !important;border-color: #34495e !important; } }.style1 {font-size: 9px}</style></head><body class='' style='background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;'><table border='0' cellpadding='0' cellspacing='0' class='body' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td><td class='container' style='font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;'><div class='content' style='box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;'><!-- START CENTERED WHITE CONTAINER --><span class='preheader' style='color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;'></span><table class='main' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;'><tr><td class='wrapper' style='font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'><p align='right' style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'><img src='http://ecourses.aec.edu.in/thub/images/myhub_aditya.png' width='84' height='50' alt='AdityaLogo'><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Hi"+" "+name+",<p style='font-family:calibri;font-color:#295890;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Please find your payslip for the month of"+" "+month+" "+year+" "+"attached with the mail.<p>Regards,<br><img src='http://ecourses.aec.edu.in/thub/images/myhublogo.png' width='84' height='50' alt='MyHubLogo'><br>Payroll processing system</p><br><p style='font-family:sans-serif;font-size:10px;font-weight:normal;margin:0;Margin-bottom:15px;'> Your PDF Payslip is delivered to your inbox, and you will be able to open the PDF attachment, only if you have Adobe reader version 7.0.8 and above. If Adobe Reader is not installed / upgraded in your PC. <a href='https://acrobat.adobe.com/in/en/acrobat/pdf-reader.html'>click here</a>.</p><div align='justify'><br></div><p style='font-family:sans-serif;font-size:10px;font-weight:normal;margin:0;Margin-bottom:15px;'>The information contained in this electronic message and any attachments to this message are intended for the exclusive use of the addressee(s) and may contain proprietary, confidential or privileged information. If you are not the intended recipient, you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately and destroy all copies of this message and any attachments. WARNING: Computer viruses can be transmitted via email. The recipient should check this email and any attachments for the presence of viruses. The management accepts no liability for any damage caused by any virus transmitted by this email.</p><table border='0' cellpadding='0' cellspacing='0' class='btn btn-primary' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;'><tbody><tr><td align='left' style='font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;'><center><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;'><tbody><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;'> </td></tr></tbody></table></center></td></tr></tbody></table><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'></p><p style='font-family:sans-serif;font-size:11px;font-weight:normal;margin:0;Margin-bottom:15px;text-align:center;'>Have a Good Day!.</p></td></tr></table></td></tr></table><!-- START FOOTER --><div class='footer' style='clear:both;padding-top:10px;text-align:center;width:100%;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td class='content-block' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'><span class='apple-link' style='color:#999999;font-size:12px;text-align:center;'>Aditya Educational Institutions,Surampalem,533437</span><br>This email is system generated, please do not respond to this email.</td></tr><tr><td class='content-block powered-by' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'>Powered by <a href='http://thub.ac.edu.in' style='color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;text-decoration:none;'>T-HUB team</a>.</td></tr></table></div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --></div></td><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td></tr></table></body></html>";

    // setup email data with unicode symbols
    var mailOptions = {
                from: '"myHUB " <myhub@aditya.ac.in>',      
                to: email,
                subject: 'Payslip for the month of'+id, 
                text: 'Payslip', // plain text body
    html: msg,// html body

    attachments: [
       //{data:msg, alternative:true},
      {path:"C:/users/HP/Downloads/"+filename, type:"application/pdf",name:filename}
    ]  

};

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Not Sent');
        }
        console.log('Mail Sent');
    });
        res.send(docs);

    });
});


router.post('/selection', function(req, res) { // routing to pay.html
    
        res.render('selection');
      });



router.post('/sendmail', function(req, res) { // sending mail 
var listofemails=[];
var listofempids=[];
var listofempnames=[];
var empname;
var empid;
var j=-1;
var y = moment().format('YYYY');
     var m = moment().subtract(1,'months').format('MMMM');
     
    pay.find({$and:[{"month":m},{"year":y}]},function(e,docs){
       
        if(e){
              console.log(e);
        }
        else{
}
for(var i=0;i<docs.length;i++){
                   listofemails.push(docs[i].emailid) ;
                   listofempids.push(docs[i].empid);
                   listofempnames.push(docs[i].employeename);
 
 // console.log(emaillist);
}

 var success_email = [];
 // Will store email whose sending is failed. 
 var failure_email = [];
 
 var transporter;
 
 /* Loading modules done. */


function massMailer() {

    var self = this;
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        pool: true,
        auth: {
            user: 'myhub@aditya.ac.in',
            pass: 'Thub@123'
        },
            tls: {rejectUnauthorized: false},
            debug:true
    });
   
    // Fetch all the emails from database and push it in listofemails
    self.invokeOperation();
};

/* Invoking email sending operation at once */

massMailer.prototype.invokeOperation = function() {
    var self = this;
        
    async.each(listofemails,self.SendEmail,function(){
        console.log(success_email);
        console.log(failure_email);
    });
     

}
massMailer.prototype.SendEmail = function(Email,callback) {
    console.log("Sending email to " + Email);
    var self = this;
    self.status = false;

         var months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

       var monthNum = new Date().getMonth();
        var year= new Date().getFullYear();
        var monthName = months[monthNum-1];

        var filename=monthName+'-'+year+'-'+listofempids[j+1]+'.pdf';
        var a=monthName+' '+year;
      //  console.log(filename,a);
        
var msg="<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width'><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><title>Payslip Email</title><style type='text/css'>@media only screen and (max-width: 800px) {table[class=body] h1 {font-size: 28px !important;table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a {font-size: 16px !important; table[class=body] .wrapper,table[class=body] .article {padding: 10px !important; }table[class=body] .content {padding: 0 !important; }table[class=body] .container {padding: 0 !important;width: 100% !important; }table[class=body] .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important; }table[class=body] .btn table {width: 100% !important; }table[class=body] .btn a {width: 100% !important; }table[class=body] .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important; }}@media all {.ExternalClass {width: 100%; }.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%; }.apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important; }.btn-primary table td:hover {background-color: #34495e !important; }.btn-primary a:hover {background-color: #34495e !important;border-color: #34495e !important; } }.style1 {font-size: 9px}</style></head><body class='' style='background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;'><table border='0' cellpadding='0' cellspacing='0' class='body' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td><td class='container' style='font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;'><div class='content' style='box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;'><!-- START CENTERED WHITE CONTAINER --><span class='preheader' style='color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;'></span><table class='main' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;'><tr><td class='wrapper' style='font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'><p align='right' style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'><img src='http://ecourses.aec.edu.in/thub/images/myhub_aditya.png' width='84' height='50' alt='AdityaLogo'><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Hi"+" "+listofempnames[j+1]+",<p style='font-family:calibri;font-color:#295890;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Please find your payslip for the month of"+" "+monthName+" "+year+" "+"attached with the mail.<p>Regards,<br><img src='http://ecourses.aec.edu.in/thub/images/myhublogo.png' width='84' height='50' alt='MyHubLogo'><br>Payroll processing system</p><br><p style='font-family:sans-serif;font-size:10px;font-weight:normal;margin:0;Margin-bottom:15px;'> Your PDF Payslip is delivered to your inbox, and you will be able to open the PDF attachment, only if you have Adobe reader version 7.0.8 and above. If Adobe Reader is not installed / upgraded in your PC. <a href='https://acrobat.adobe.com/in/en/acrobat/pdf-reader.html'>click here</a>.</p><div align='justify'><br></div><p style='font-family:sans-serif;font-size:10px;font-weight:normal;margin:0;Margin-bottom:15px;'>The information contained in this electronic message and any attachments to this message are intended for the exclusive use of the addressee(s) and may contain proprietary, confidential or privileged information. If you are not the intended recipient, you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately and destroy all copies of this message and any attachments. WARNING: Computer viruses can be transmitted via email. The recipient should check this email and any attachments for the presence of viruses. The management accepts no liability for any damage caused by any virus transmitted by this email.</p><table border='0' cellpadding='0' cellspacing='0' class='btn btn-primary' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;'><tbody><tr><td align='left' style='font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;'><center><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;'><tbody><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;'> </td></tr></tbody></table></center></td></tr></tbody></table><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'></p><p style='font-family:sans-serif;font-size:11px;font-weight:normal;margin:0;Margin-bottom:15px;text-align:center;'>Have a Good Day!.</p></td></tr></table></td></tr></table><!-- START FOOTER --><div class='footer' style='clear:both;padding-top:10px;text-align:center;width:100%;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td class='content-block' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'><span class='apple-link' style='color:#999999;font-size:12px;text-align:center;'>Aditya Educational Institutions,Surampalem,533437</span><br>This email is system generated, please do not respond to this email.</td></tr><tr><td class='content-block powered-by' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'>Powered by <a href='http://thub.ac.edu.in' style='color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;text-decoration:none;'>T-HUB team</a>.</td></tr></table></div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --></div></td><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td></tr></table></body></html>";
    j++;
    async.waterfall([
        function(callback) {                
            var mailOptions = {
                from: '"myHUB " <myhub@aditya.ac.in>',      
                to: Email,
                subject: 'Payslip for the month of'+' '+'  '+monthName+'  '+' '+year, 
                text: 'Payslip', // plain text body
    html: msg,// html body

    attachments: [
       //{data:msg, alternative:true},
      {path:"C:/users/HP/Downloads/"+filename, type:"application/pdf",name:filename}
    ]  

};
            transporter.sendMail(mailOptions, function(error, info) {               
                if(error) {
                    console.log(error)
                    failure_email.push(Email);
                } else {
                    self.status = true;
                    success_email.push(Email);
                }
               callback(null,self.status,Email);
              // transporter.close();
            });
        },
        function(statusCode,Email,callback) {
                console.log("Mail sent to " + Email + "With " + statusCode);
                callback();

        }
        
        ],function(){
            //When everything is done return back to caller.
             
            callback();
            
        });
   // res.json("hai");
  //transporter.close();
}

new massMailer(); //lets begin
//transporter.close();
});
//transporter.close();
});


    
module.exports = router;