import dbConnect from "@/lib/mongoose"
import Project from "@/models/Project"
export async function GET(_request, { params }) {
    try {
        await dbConnect()
        const { id } = await params
        const project = await Project.findById(id)
        if (!project) {
            return Response.json({ status: 'FAILED', message: 'Project not found' }, { status: 404 })
        }
        return Response.json({ status: 'SUCCESS', project }, { status: 200 })
    } catch (error) {
        console.error("Error fetching project:", error)
        return Response.json({ status: 'FAILED', message: error.message }, { status: 500 })
    }
}