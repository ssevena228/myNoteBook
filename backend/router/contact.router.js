const express = require("express")
const MessageModel = require("../schema/contact.model")
const router = express.Router();
const nodemailer = require("nodemailer")



// router.post('/message', async (req, res) => {

//     const { name, email, subject, message } = req.body;

//     const transporter = nodemailer.createTransport({

//         service: "gmail",
//         auth: {
//             user: process.env.SENDER_EMAIL,
//             pass: process.env.SMTP_PASS
//         },

//     });

//     try {

//         const sms = await MessageModel.create({
//             name, email, subject, message
//         });

//         const mailOption = {
//             from: process.env.SENDER_EMAIL,
//             to: email,
//             subject: "Thank you for contact us -Shukla Pvt.Ltd.",
//             html: `<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
//   <head>
//     <meta charset="UTF-8">
//     <meta content="width=device-width, initial-scale=1" name="viewport">
//     <meta name="x-apple-disable-message-reformatting">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta content="telephone=no" name="format-detection">
//     <title></title>
//     <!--[if (mso 16)]>
//     <style type="text/css">
//     a {text-decoration: none;}
//     </style>
//     <![endif]-->
//     <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
//     <!--[if gte mso 9]>
// <noscript>
//          <xml>
//            <o:OfficeDocumentSettings>
//            <o:AllowPNG></o:AllowPNG>
//            <o:PixelsPerInch>96</o:PixelsPerInch>
//            </o:OfficeDocumentSettings>
//          </xml>
//       </noscript>
// <![endif]-->
//     <!--[if mso]><xml>
//     <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
//       <w:DontUseAdvancedTypographyReadingMail/>
//     </w:WordDocument>
//     </xml><![endif]-->
//   </head>
//   <body class="body">
//     <div dir="ltr" class="es-wrapper-color">
//       <!--[if gte mso 9]>
// 			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
// 				<v:fill type="tile" color="#fafafa"></v:fill>
// 			</v:background>
// 		<![endif]-->
//       <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
//         <tbody>
//           <tr>
//             <td valign="top" class="esd-email-paddings">
//               <table cellpadding="0" cellspacing="0" align="center" class="es-content">
//                 <tbody>
//                   <tr>
//                     <td align="center" class="esd-stripe">
//                       <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
//                         <tbody>
//                           <tr>
//                             <td align="left" class="esd-structure es-p15t es-p20r es-p20l">
//                               <table cellpadding="0" cellspacing="0" width="100%">
//                                 <tbody>
//                                   <tr>
//                                     <td width="560" align="center" valign="top" class="esd-container-frame">
//                                       <table cellpadding="0" cellspacing="0" width="100%">
//                                         <tbody>
//                                           <tr>
//                                             <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size:0px">
//                                               <a target="_blank">
//                                                 <img src="https://ftapbdn.stripocdn.email/content/guids/CABINET_f3fc38cf551f5b08f70308b6252772b8/images/96671618383886503.png" alt="" width="100" style="display:block">
//                                               </a>
//                                             </td>
//                                           </tr>
//                                           <tr>
//                                             <td align="center" esd-links-underline="none" class="esd-block-text es-p15t es-p15b">
//                                               <h1 class="es-m-txt-c">
//                                                 Thanks for contact us us!
//                                               </h1>
//                                             </td>
//                                           </tr>
//                                           <tr>
//                                             <td align="left" class="esd-block-text es-p10t es-p10b">
//                                               <p style="font-size:16px">
//                                                 Hello ${name}, Thanks for joining us! You are now on our mailing list. This means you'll be the first&nbsp;to hear about our fresh&nbsp;collections and offers!
//                                               </p>
//                                               <p style="font-size:14px">
//                                                ${message}
//                                               </p>
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td align="left" class="esd-structure esdev-adapt-off es-p20">
//                               <table width="560" cellpadding="0" cellspacing="0" class="esdev-mso-table">
//                                 <tbody>
//                                   <tr>
//                                     <td valign="top" class="esdev-mso-td">
//                                       <table cellpadding="0" cellspacing="0" align="left" class="es-left">
//                                         <tbody>
//                                           <tr>
//                                             <td width="146" align="left" class="esd-container-frame">
//                                               <table cellpadding="0" cellspacing="0" width="100%">
//                                                 <tbody>
//                                                   <tr>
//                                                     <td align="center" height="40" class="esd-block-spacer"></td>
//                                                   </tr>
//                                                 </tbody>
//                                               </table>
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                     <td valign="top" class="esdev-mso-td">
//                                       <table cellpadding="0" cellspacing="0" align="left" class="es-left">
//                                         <tbody>
//                                           <tr>
//                                             <td width="121" align="left" class="esd-container-frame">
//                                               <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#e8eafb" style="background-color:#e8eafb;border-radius:10px 0 0 10px;border-collapse:separate">
//                                                 <tbody>
//                                                   <tr>
//                                                     <td align="right" class="esd-block-text es-p10t">
//                                                       <p>
//                                                         Login:
//                                                       </p>
//                                                     </td>
//                                                   </tr>
//                                                   <tr>
//                                                     <td align="right" class="esd-block-text es-p10b">
//                                                       <p>
//                                                         Password:
//                                                       </p>
//                                                     </td>
//                                                   </tr>
//                                                 </tbody>
//                                               </table>
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                     <td valign="top" class="esdev-mso-td">
//                                       <table cellpadding="0" cellspacing="0" align="left" class="es-left">
//                                         <tbody>
//                                           <tr>
//                                             <td width="155" align="left" class="esd-container-frame">
//                                               <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#e8eafb" style="background-color:#e8eafb;border-radius:0 10px 10px 0;border-collapse:separate">
//                                                 <tbody>
//                                                   <tr>
//                                                     <td align="left" class="esd-block-text es-p10t es-p10l">
//                                                       <p>
//                                                         <strong>USER-1000</strong>
//                                                       </p>
//                                                     </td>
//                                                   </tr>
//                                                   <tr>
//                                                     <td align="left" class="esd-block-text es-p10b es-p10l">
//                                                       <p>
//                                                         <strong>FYTerg243okr</strong>
//                                                       </p>
//                                                     </td>
//                                                   </tr>
//                                                 </tbody>
//                                               </table>
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                     <td valign="top" class="esdev-mso-td">
//                                       <table cellpadding="0" cellspacing="0" align="right" class="es-right">
//                                         <tbody>
//                                           <tr>
//                                             <td width="138" align="left" class="esd-container-frame">
//                                               <table cellpadding="0" cellspacing="0" width="100%">
//                                                 <tbody>
//                                                   <tr>
//                                                     <td align="center" height="40" class="esd-block-spacer"></td>
//                                                   </tr>
//                                                 </tbody>
//                                               </table>
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
//                 <tbody>
//                   <tr>
//                     <td align="center" class="esd-stripe">
//                       <table align="center" cellpadding="0" cellspacing="0" width="640" class="es-footer-body" style="background-color:transparent">
//                         <tbody>
//                           <tr>
//                             <td align="left" class="esd-structure es-p20t es-p20b es-p20r es-p20l">
//                               <table cellpadding="0" cellspacing="0" width="100%">
//                                 <tbody>
//                                   <tr>
//                                     <td width="600" align="left" class="esd-container-frame">
//                                       <table cellpadding="0" cellspacing="0" width="100%">
//                                         <tbody>
//                                           <tr>
//                                             <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
//                                               <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
//                                                 <tbody>
//                                                   <tr>
//                                                     <td align="center" valign="top" class="es-p40r">
//                                                       <a target="_blank" href="">
//                                                         <img title="Facebook" src="https://ftapbdn.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32">
//                                                       </a>
//                                                     </td>
//                                                     <td align="center" valign="top" class="es-p40r">
//                                                       <a target="_blank" href="">
//                                                         <img title="X" src="https://ftapbdn.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png" alt="X" width="32">
//                                                       </a>
//                                                     </td>
//                                                     <td align="center" valign="top" class="es-p40r">
//                                                       <a target="_blank" href="">
//                                                         <img title="Instagram" src="https://ftapbdn.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32">
//                                                       </a>
//                                                     </td>
//                                                     <td align="center" valign="top">
//                                                       <a target="_blank" href="">
//                                                         <img title="Youtube" src="https://ftapbdn.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32">
//                                                       </a>
//                                                     </td>
//                                                   </tr>
//                                                 </tbody>
//                                               </table>
//                                             </td>
//                                           </tr>
//                                           <tr>
//                                             <td align="center" class="esd-block-text es-p35b">
//                                               <p>
//                                                 Style Casual&nbsp;© 2021 Style Casual, Inc. All Rights Reserved.
//                                               </p>
//                                               <p>
//                                                 4562 Hazy Panda Limits, Chair Crossing, Kentucky, US, 607898
//                                               </p>
//                                             </td>
//                                           </tr>
//                                           <tr>
//                                             <td esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#cccccc" esd-tmp-menu-color="#999999" class="esd-block-menu">
//                                               <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
//                                                 <tbody>
//                                                   <tr>
//                                                     <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:5px;padding-bottom:5px">
//                                                       <div>
//                                                         <a target="_blank" href="https://" style="color:#999999">
//                                                           Visit Us
//                                                         </a>
//                                                       </div>
//                                                     </td>
//                                                     <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:5px;padding-bottom:5px;border-left:1px solid #cccccc">
//                                                       <div>
//                                                         <a target="_blank" href="https://" style="color:#999999">
//                                                           Privacy Policy
//                                                         </a>
//                                                       </div>
//                                                     </td>
//                                                     <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:5px;padding-bottom:5px;border-left:1px solid #cccccc">
//                                                       <div>
//                                                         <a target="_blank" href="https://" style="color:#999999">
//                                                           Terms of Use
//                                                         </a>
//                                                       </div>
//                                                     </td>
//                                                   </tr>
//                                                 </tbody>
//                                               </table>
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <table cellpadding="0" cellspacing="0" align="center" class="es-content esd-footer-popover">
//                 <tbody>
//                   <tr>
//                     <td align="center" class="esd-stripe">
//                       <table align="center" cellpadding="0" cellspacing="0" width="600" bgcolor="rgba(0, 0, 0, 0)" class="es-content-body" style="background-color: transparent">
//                         <tbody>
//                           <tr>
//                             <td align="left" class="esd-structure es-p20">
//                               <table cellpadding="0" cellspacing="0" width="100%">
//                                 <tbody>
//                                   <tr>
//                                     <td width="560" align="center" valign="top" class="esd-container-frame">
//                                       <table cellpadding="0" cellspacing="0" width="100%">
//                                         <tbody>
//                                           <tr>
//                                             <td align="center" class="esd-block-text es-infoblock">
//                                               <p>
//                                                 <a target="_blank"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank">Unsubscribe</a>.<a target="_blank"></a>
//                                               </p>
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </body>
//             </html>`
//         };

//         transporter.sendMail(mailOption, (error, info) => {
//             if (error) {
//                 console.log(`Mail not send , ${error}`);
//             } else {
//                 console.log(`send message successfully!, ${info.response}`);
//             }
//         });

//         res.status(201).send({
//             success: true,
//             message: "Message sent successfully",
//             sms
//         });

//     } catch (error) {

//         res.status(500).send({
//             success: false,
//             message: "Interval server error!",
//             sms: null,
//         });

//     }
// })

router.post('/message', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const sms = await MessageModel.create({
      name,
      email,
      subject,
      message
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Thank you for contacting us - Shukla Pvt. Ltd.",
      html: `
  <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:10px;">

      <h2 style="color:#333;">Thank You for Contacting Us</h2>

      <p style="font-size:16px; color:#555;">
        Hello <strong>${name}</strong>,
      </p>

      <p style="font-size:15px; color:#555;">
        We have received your message and truly appreciate you reaching out to us.
        Our team will review your request and get back to you as soon as possible.
      </p>

      <hr style="margin:20px 0;" />

      <h3 style="color:#333;">Your Submitted Details:</h3>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>

      <div style="margin-top:15px;">
        <p><strong>Message:</strong></p>
        <p style="background:#f9f9f9; padding:10px; border-radius:5px;">
          ${message}
        </p>
      </div>

      <hr style="margin:20px 0;" />

      <p style="font-size:14px; color:#777;">
        We usually respond within 24–48 hours.  
        Thank you for your patience.
      </p>

      <p style="font-size:14px; color:#777;">
        Regards,<br/>
        <strong>Shukla Pvt. Ltd.</strong>
      </p>

    </div>
  </div>
  `
    };

    const info = await transporter.sendMail(mailOption);
    console.log("Email sent:", info.response);

    return res.status(201).send({
      success: true,
      message: "Message sent successfully",
      sms
    });

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});



module.exports = router; 
