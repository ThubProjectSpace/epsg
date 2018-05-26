var email   = require('emailjs/email');
var email   = require("./node_modules/emailjs/email");
var dotenv = require('dotenv').config();
function sendMail(data){
//gmail configuration
  var server  = email.server.connect({

   user:    "myhub@aditya.ac.in ", 
   password:"Aditya@1234", 
   host:    "smtp.gmail.com", 
   ssl:     true
});
  var fs = require('fs');
fs.realpath(__dirname, function(err, path='C:\\Users\\admin\\Downloads\\') {
    if (err) {
        console.log(err);
     return;
    }
    console.log('Path is : ' + path);
});
fs.readdir(__dirname, function(err, files) {
    if (err) return;
    files.forEach(function(f) {
        console.log('Files: ' + f);
    });
}); 
  var msg="<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width'><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><title>Payslip Email</title><style type='text/css'>@media only screen and (max-width: 800px) {table[class=body] h1 {font-size: 28px !important;table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a {font-size: 16px !important; table[class=body] .wrapper,table[class=body] .article {padding: 10px !important; }table[class=body] .content {padding: 0 !important; }table[class=body] .container {padding: 0 !important;width: 100% !important; }table[class=body] .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important; }table[class=body] .btn table {width: 100% !important; }table[class=body] .btn a {width: 100% !important; }table[class=body] .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important; }}@media all {.ExternalClass {width: 100%; }.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%; }.apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important; }.btn-primary table td:hover {background-color: #34495e !important; }.btn-primary a:hover {background-color: #34495e !important;border-color: #34495e !important; } }</style></head><body class='' style='background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;'><table border='0' cellpadding='0' cellspacing='0' class='body' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td><td class='container' style='font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;'><div class='content' style='box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;'><!-- START CENTERED WHITE CONTAINER --><span class='preheader' style='color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;'>This is preheader text. Some clients will show this text as a preview.</span><table class='main' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;'><tr><td class='wrapper' style='font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Dear Adityan,</p><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Please find your payslip for the month of February 2017 attached with the mail. For added security concerns, your payslip is protected by a unique password, which is the combination of last two digits of your employee number and first three letters (lower case) of yourbirth month. For e.g. if your employee number is 123400 and your month of birth is August, thenthe password will be 00aug. Your password is case sensitive.<p>Regards,<br> My Hub <br>Payroll processing system</p><br><p> Your PDF Payslip is delivered to your inbox, and you will be able to open the PDF attachment, only if you have Adobe reader version 7.0.8 and above. If Adobe Reader is not installed / upgraded in your PC.</p><br><p>The information contained in this electronic message and any attachments to this message are intended for the exclusive use of the addressee(s) and may contain proprietary, confidential or privileged information. If you are not the intended recipient, you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately and destroy all copies of this message and any attachments. WARNING: Computer viruses can be transmitted via email. The recipient should check this email and any attachments for the presence of viruses. The company accepts no liability for any damage caused by any virus transmitted by this email.</p><table border='0' cellpadding='0' cellspacing='0' class='btn btn-primary' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;'><tbody><tr><td align='left' style='font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;'><center><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;'><tbody><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;'> </td></tr></tbody></table></center></td></tr></tbody></table><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'></p><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Have a Good Day!.</p></td></tr></table></td></tr></table><!-- START FOOTER --><div class='footer' style='clear:both;padding-top:10px;text-align:center;width:100%;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td class='content-block' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'><span class='apple-link' style='color:#999999;font-size:12px;text-align:center;'>Aditya Educational Institutions,Surampalem,533437</span><br>This email is system generated, please do not respond to this email.</td></tr><tr><td class='content-block powered-by' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'>Powered by <a href='http://thub.ac.edu.in' style='color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;text-decoration:none;'>T-HUB team</a>.</td></tr></table></div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --></div></td><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td></tr></table></body></html>";
var message = {
   text:    msg, 
   from:    "myHUB <myhub@aditya.ac.in >", 
   to:      email,
   cc:      " ",
   subject: "Payslip for the month of Feb'2017",
    attachment: 
    [
       {data:msg, alternative:true},
       {path:f}
    ]

}; 
server.send(message, function(err, message) { console.log(err || message); });


  
/*var fs = require("fs");
var files = function (value) {
fs.readdir('./client', function (err, files) {
var fileDict = {};
var fileIndex = 0;

function getEachFile(i) {
global.fileName = files[i];

fs.stat('./client/' + fileName, function (err, stat) {

++fileIndex;
fileDict[fileIndex] = fileName;

if (++i == files.length) {
return value(fileDict);
} else {
return getEachFile(i);
};
});
}
return getEachFile(0);
});
} */



files(function (value) { console.log(value); });

     $.post("/email").done(function(data, textStatus, jqXHR) 
        {
                //alert(JSON.stringify(data));
       for(var i=0;i<data.length;i++){

       global.email=data[i].emailid;

        sendMail();
       }
   });















 