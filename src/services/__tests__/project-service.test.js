const Chance = require("chance");

const ProjectService = require("../projects");

const Project = require("../../models/project");

const chance = new Chance ();

jest.mock("../../models/project");

describe("when calling the project service method", () =>{ 
    let id, projectData, updatedProject;

    beforeEach(() => {
        id = chance.guid();
        projectData = {
            name: chance.name(),
            describe: chance.string(),   
        };
        updatedProject = projectData;

        Project.findByIdAndUpdate = jest.fn().mockReturnThis();
        Project.lean = jest.fn().mockReturnThis();
        Project.exec = jest.fn().mockResolvedValue(updatedProject);

    });

    it("should call project.findByIdAndUpdate with the id, project data and return document new property", async () =>{
        await ProjectService.updateProject(id, projectData);

        expect(Project.findByIdAndUpdate).toBeCalledWith(id, projectData, {
            new: true,
        });
    });

    it("should call Project.lean", async () => {
        await ProjectService.updateProject(id, projectData);

        expect(Project.lean).toBeCalled();
    });

    it("should call project.exec", async () =>{
        await ProjectService.updateProject(id, projectData);

        expect(Project.exec).toBeCalled();

    });

    it("should return the update project data", async () => {
        const result = await ProjectService.updateProject(id, projectData);

        expect(result).toEqual(updatedProject);
    });

});

describe("when a calling deleteProject method",() =>{
    let id;
    beforeEach( () => {
        id = chance.string();
        Project.findByIdAndDelete = jest.fn().mockReturnThis();
        Project.exec = jest.fn().mockResolvedValue();
    });
     it("should call deleteProject with an ID property", async () => {
        await ProjectService.deleteProject(id);
        expect(Project.findByIdAndDelete).toBeCalledWith(id);
     });
});



