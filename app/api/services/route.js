import dbConnect from "@/lib/mongoose"
import Service from "@/models/Service"
export async function GET(request) {
    try {
        await dbConnect()
        const services = await Service.find({})
        return Response.json({ status: "SUCCESS", services }, { status: 200 })
    }
    catch (error) {
        return Response.json({ status: "FAILED", message: error.message }, { status: 500 })
    }
}