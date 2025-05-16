import { render } from '@react-email/render';
import { RecapMail } from './components/emails/RecapMail';
import * as nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: "smtp.mailjet.com",
  port: 465,
  secure:true,
  auth: {
    user: "86a452afef128455f240c1468e406594",
    pass: "136766915d393595d8afabc4bb6a5cf8",
  },
});



// const transporter = nodemailer.createTransport({
//   host: "smtp-view.alwaysdata.net",
//   port: 465,
//   secure:true,
//   auth: {
//     user: "view@alwaysdata.net",
//     pass: "view_password",
//   },
// });



export async function testMail(){
 await transporter.sendMail({
    from:  `"${ 'All  Signs options support'}" <${'support@signsdesigner.us'}>`,
    to: "toyigbemaximed@gmail.com",
    subject: 'Commande de  produit  depuis signs designer',
    text: `Commande test `,
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