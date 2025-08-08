import nodemailer from 'nodemailer';
import dbConnect from "@/lib/mongoose"
import Service from "@/models/Service";
export async function POST(request) {
    try {
        const { name, email, phone, budget, serviceId, summary } = await request.json();
        await dbConnect();
        const service = await Service.findById(serviceId);
        if (!service) {
            return Response.json({ status: "FAILED", message: "Service non trouvé !" }, { status: 404 });
        }
        await sendEmail(email, name, phone, budget, service, summary)
        return Response.json({ status: "SUCCESS", message: "Demande de projet personnalisé envoyée avec succès !" }, { status: 200 });
    } catch (error) {
        return Response.json({ status: "FAILED", message: error.message }, { status: 500 });
    }
}
async function sendEmail(clientEmail, clientName, clientPhone, clientBudget, service, projectSummary) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NO_REPLY_EMAIL,
            pass: process.env.NO_REPLY_PASS,
        },
    });

    const currentYear = new Date().getFullYear();

    // Email to service provider
    await transporter.sendMail({
        from: process.env.NO_REPLY_EMAIL,
        to: process.env.SERVICE_PROVIDER_EMAIL,
        subject: "Nouvelle demande de projet personnalisé",
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.07);">
                    <h2 style="color: #16a34a; text-align: center; margin-bottom: 24px;">Nouvelle demande de projet personnalisé</h2>
                    <p style="font-size: 16px; color: #333333;">Bonjour,</p>
                    <p style="font-size: 16px; color: #333333;">Vous avez reçu une nouvelle demande de projet personnalisé. Voici les détails :</p>
                    <ul style="font-size: 15px; color: #333333; margin: 20px 0 30px 0; padding-left: 20px;">
                        <li><strong>Nom du client :</strong> ${clientName}</li>
                        <li><strong>Email :</strong> ${clientEmail}</li>
                        <li><strong>Numéro de téléphone :</strong> ${clientPhone}</li>
                        <li><strong>Budget :</strong> ${clientBudget}</li>
                        <li><strong>Service concerné :</strong> ${service.title}</li>
                        <li><strong>Description du projet :</strong> ${projectSummary || 'Non renseignée'}</li>
                    </ul>
                    <p style="font-size: 16px; color: #333333;">Cordialement,<br>Maison Web</p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eeeeee;">
                    <p style="font-size: 12px; color: #aaaaaa; text-align: center;">
                        © ${currentYear} Maison Web — Tous droits réservés
                    </p>
                </div>
            </div>
        `,
    });

    // Confirmation email to client
    await transporter.sendMail({
        from: process.env.NO_REPLY_EMAIL,
        to: clientEmail,
        subject: "Confirmation de votre demande de projet personnalisé",
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.07);">
                    <h2 style="color: #16a34a; text-align: center; margin-bottom: 24px;">Demande bien reçue !</h2>
                    <p style="font-size: 16px; color: #333333;">Bonjour ${clientName},</p>
                    <p style="font-size: 16px; color: #333333;">
                        Nous vous confirmons la réception de votre demande de projet personnalisé concernant le service <strong>${service.title || service}</strong> chez Maison Web.
                    </p>
                    <p style="font-size: 16px; color: #333333;">
                        Notre équipe va étudier votre demande et vous contactera prochainement pour discuter des détails.
                    </p>
                    <p style="font-size: 16px; color: #333333;">
                        Merci d'avoir choisi Maison Web.<br>Excellente journée à vous !
                    </p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eeeeee;">
                    <p style="font-size: 12px; color: #aaaaaa; text-align: center;">
                        © ${currentYear} Maison Web — Tous droits réservés
                    </p>
                </div>
            </div>
        `,
    });
}
