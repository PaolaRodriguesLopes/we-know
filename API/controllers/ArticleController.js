var Article = require("../models/Article");


class ArticleController{
    async getArticles(req, res){
        var articles = await Article.findAll();
        res.json(articles);
    }

    async getArticleByID (req,res){
        var id = req.params.id;
        var article = await Article.findById(id);

        if (article == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200);
            res.json(article);
        }
    }

    async create(req,res){
        var {title,description,text,category,author,subject} = req.body;
 
        if (title == undefined || title == '' || title == ' '){
            res.status(400);
            res.json({err: "O título é inválido"});
            return; 
        }   
        if (description == undefined || description == '' || description == ' '){
            res.status(400);
            res.json({err: "A descrição é inválida"});
            return; 
        }  
        if (text == undefined || text == '' || text == ' '){
            res.status(400);
            res.json({err: "O texto é inválido"});
            return; 
        }  
        if (category == undefined || category == '' || category == ' '|| category == 0){
            res.status(400);
            res.json({err: "A categoria é inválida"});
            return; 
        }  
        if (author == undefined || author == '' || author == ' ' || author == 0){
            res.status(400);
            res.json({err: "O autor é inválido"});
            return; 
        }  
        if (subject == undefined || subject == '' || subject == ' ' || subject == 0){
            res.status(400);
            res.json({err: "A matéria é inválida"});
            return; 
        }  
        
         
        await Article.new(title,description,text,category,author,subject);
 
         res.status(200);
         res.send("Tudo ok!");
     }

     async edit(req, res){
        var {id, title,description,text,category,author,subject, status} = req.body;
        var result = await Article.update(id,title,description,text,category,author,subject, status);
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

        var result = await Article.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    
}
module.exports = new ArticleController();