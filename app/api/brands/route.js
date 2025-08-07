import dbConnect from '@/lib/mongoose'
import Brand from '@/models/Brand'
export async function GET(request) {
    try {
        await dbConnect()
        const brands = await Brand.find({})
        return Response.json({ status: 'SUCCESS', brands }, { status: 200 })
    } catch (error) {
        return Response.json({ status: 'FAILED', message: error.message }, { status: 500 })
    }
}