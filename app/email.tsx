import { render } from '@react-email/render';
import { RecapMail } from './components/emails/RecapMail';
import * as nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: 'signsdesigner.us',
  port: 465,
  secure:true,
  auth: {
    user: 'support@signsdesigner.us',
    pass: 'NmLHKU#yrU*i',
  },
});



export async function testMail(){
  transporter.sendMail({
    from:  `"${ 'All  Signs options support'}" <${'support@signsdesigner.us'}>`,
    to: "toyigbemaximed@gmail.com",
    subject: 'test my email',
    text: 'test',
  });
}




export async function sendRecapMail(data:any, email:string, subject:string,customer:any,addZip=true){

    const emailHtml = render(<RecapMail data={data} customer={customer}/>);

    let options :any= {
      from: `"${'All  Signs options support'}" <${'support@signsdesigner.us'}>`,
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