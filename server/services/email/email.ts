import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";



const sendEmail= async(email: any, subject: string, payload: object, template:string)=>{
    try{
        //Fake credentials generated with Ethereal for testing nodemailer without actually sending any messages
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'elian.nienow46@ethereal.email',
                pass: '2qumgE9XYRaGWXMPHS'
            }
        });
        const source= fs.readFileSync(path.join(__dirname, template), "utf8")
        const compiledTemplate= handlebars.compile(source)
        const options = ()=> {
            return {
                from: "no-reply@email.com",
                to: email, 
                subject: subject, 
                html: compiledTemplate(payload)
            }
        }
           //send email
        //Since we are using a fake email sender, the response will return the link to preview the message that has been sent
        //This is for testing purposes
        //In a production environment, a message sent confirmation would be sent
        const emailSentPreviewLink = await transporter.sendMail(options())
        return nodemailer.getTestMessageUrl(emailSentPreviewLink)



    } catch(err){
        return err
    }
}


export default sendEmail