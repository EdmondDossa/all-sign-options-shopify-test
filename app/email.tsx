import { render } from '@react-email/render';
import { RecapMail } from './components/emails/RecapMail';
import * as nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: (process.env.EMAIL_OUTGOING_SERVER || 'signsdesigner.us'),
  port: (process.env.EMAIL_SMTP_PORT || 465),
  secure:( process.env.EMAIL_AUTHENTICATION_REQUIRED ? process.env.EMAIL_AUTHENTICATION_REQUIRED: true),
  auth: {
    user: (process.env.EMAIL_USERNAME || 'support@signsdesigner.us'),
    pass:( process.env.EMAIL_PASSWORD || 'NmLHKU#yrU*i'),
  },
});



export async function testMail(){
  transporter.sendMail({
    from:  `"${ process.env.EMAIL_NAME || 'All  Signs options support'}" <${ process.env.EMAIL_USERNAME || 'support@signsdesigner.us'}>`,
    to: "toyigbemaximed@gmail.com",
    subject: 'test my email',
    text: 'test',
  });
}




export async function sendRecapMail(data:any, email:string, subject:string,customer:any,addZip=true){

    const emailHtml = render(<RecapMail data={data} customer={customer}/>);

    let options :any= {
      from: `"${ process.env.EMAIL_NAME || 'All  Signs options support'}" <${ process.env.EMAIL_USERNAME || 'support@signsdesigner.us'}>`,
      to: email,
      subject: subject,
      html: emailHtml
    };

    if (addZip) {
      let attachments = []
      for(const variantRecap of data){
          attachments.push({
            filename:`${variantRecap.recaps?.filesUrl?.zipUrl}`.split("/").pop(),
            path:variantRecap.recaps?.filesUrl?.zipUrl
          });
      }
      options.attachments = attachments;
      
    }

  await transporter.sendMail(options);
  console.log("email sent");

}