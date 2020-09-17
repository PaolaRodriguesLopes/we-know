var Course = require("../models/Course");


class CourseController{
    async getCourses(req, res){
        var courses = await Course.findAll();
        res.json(courses);
    }

    async getCourseByID (req,res){
        var id = req.params.id;
        var course = await Course.findById(id);

        if (course == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200);
            res.json(course);
        }
    }

    async create(req,res){
        var {description,duration} = req.body;
 
         if (description == undefined || description == '' || description == ' '){
             res.status(400);
             res.json({err: "A descrição é inválida"});
             return; // para encerrar a requisicao
         }
 
         if (duration == undefined || duration == '' || duration == ' '){
             res.status(400);
             res.json({err: "A duração é inválida"});
             return;
         }        
         
         await Course.new(description,duration);
 
         res.status(200);
         res.send("Tudo ok!");
     }

     async edit(req, res){
        var {id, description,duration} = req.body;
        var result = await Course.update(id,description,duration);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo OK!");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req, res){
        var id = req.params.id;

        var result = await Course.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    
}
module.exports = new CourseController();