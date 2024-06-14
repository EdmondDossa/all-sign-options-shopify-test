import { render } from '@react-email/render';
import { createTransport } from 'nodemailer';
import { RecapMail } from './components/emails/RecapMail';


const transporter = createTransport({
  host: 'smtp-view.alwaysdata.net',
  port: 587,
  secure: false,
  auth: {
    user: 'view@alwaysdata.net',
    pass: 'F3QG3x7@QuPXtZx',
  },
});




export async function sendRecapMail(data:any, email:string, subject:string,customer:any,addZip=true){

    const emailHtml = render(<RecapMail data={data} customer={customer}/>);

    let options :any= {
      from: 'view@alwaysdata.net',
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