var Subject = require("../models/Subject");


class SubjectController{
    async getSubjects(req, res){
        var subjects = await Subject.findAll();
        res.json(subjects);
    }

    async getSubjectByID (req,res){
        var id = req.params.id;
        var subject = await Subject.findById(id);

        if (subject == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200);
            res.json(subject);
        }
    }

    async create(req,res){
        var {description} = req.body;
 
         if (description == undefined || description == '' || description == ' '){
             res.status(400);
             res.json({err: "A descrição é inválida"});
             return; // para encerrar a requisicao
         }             
         
         await Subject.new(description);
 
         res.status(200);
         res.send("Tudo ok!");
     }

     async edit(req, res){
        var {id, description} = req.body;
        var result = await Subject.update(id,description);
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

        var result = await Subject.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    
}
module.exports = new SubjectController();