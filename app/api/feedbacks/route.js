import dbConnect from '@/lib/mongoose'
import Feedback from '@/models/Feedback'
export async function GET(request) {
    try {
        await dbConnect()
        const feedbacks = await Feedback.find({})
        return Response.json({ status: 'SUCCESS', feedbacks }, { status: 200 })
    } catch (error) {
        return Response.json({ status: 'FAILED', message: error.message }, { status: 500 })
    }
}
export async function POST(request) {
    try {
        const { clientName, feedbackText, rating, captcha } = await request.json()
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

        const captchaRes = await fetch(verificationUrl, { method: 'POST' });
        const captchaData = await captchaRes.json();

        if (!captchaData.success) {
            return Response.json({ status: "FAILED", message: 'Échec de la vérification reCAPTCHA.' }, { status: 400 });
        }
        await dbConnect()
        const newFeedback = new Feedback({ clientName, feedbackText, rating })
        await newFeedback.save()
        return Response.json({ status: 'SUCCESS', message: 'Feedback submitted successfully!' }, { status: 201 })
    } catch (error) {
        return Response.json({ status: 'FAILED', message: error.message }, { status: 500 })
    }
}