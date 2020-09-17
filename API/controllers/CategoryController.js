var Category = require("../models/Category");


class CategoryController{
    async getCategories(req, res){
        var categories = await Category.findAll();
        res.json(categories);
    }

    async getCategoryByID (req,res){
        var id = req.params.id;
        var category = await Category.findById(id);

        if (category == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200);
            res.json(category);
        }
    }

    async create(req,res){
        var {description} = req.body;
 
         if (description == undefined || description == '' || description == ' '){
             res.status(400);
             res.json({err: "A descrição é inválida"});
             return; // para encerrar a requisicao
         }             
         
         await Category.new(description);
 
         res.status(200);
         res.send("Tudo ok!");
     }

     async edit(req, res){
        var {id, description} = req.body;
        var result = await Category.update(id,description);
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

        var result = await Category.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    
}
module.exports = new CategoryController();