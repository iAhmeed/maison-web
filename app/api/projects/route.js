import dbConnect from "@/lib/mongoose"
import Project from "@/models/Project"
export async function GET(request) {
    try {
        await dbConnect()
        const projects = await Project.find({})
        return Response.json({ status: "SUCCESS", projects }, { status: 200 })
    }
    catch (error) {
        return Response.json({ status: "FAILED", message: error.message }, { status: 500 })
    }
}