const ProjectService = require("../services/projects");

exports.getProjects = async (req, res) => {
    try {
        let projects = await ProjectService.getProjects();
        res.json({
            projects:projects,
        });
    }catch(err){
        console.error("err", err);
        res.status(500).json({
            message:"Projects were not retrieved",
        });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        let project = await ProjectService.getProjectById(req.params.id)
        console.log(project);
        res.json({
            project: project,
        })
    } catch (err){
        console.error("err",err);
        res.status(404).json({
            message:"Project was not found",
        });
    }
};

exports.createProject = async (req,res) => {
    try{
        let projectSaved = await ProjectService.createProject(req.body)
        res.status(201).json({
            message:"Project created",
            projectSaved: projectSaved
        })
    } catch (err){
        console.err("err", err);
        res.status(400).json({
            message: "Was not able to create the project",
        });
    }
};

exports.updateProject = async () => {

};
