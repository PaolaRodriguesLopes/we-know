var knex = require("../database/connection");
var bcrypt = require("bcrypt");


class Article{

    async findAll(){
        try{
            var result = await knex.select(["id","title","description","text","category","author","subject","published_date","last_changed","status"]).table("articles");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","title","description","text","category","author","subject","published_date","last_changed","status"]).where({id:id}).table("articles");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }    

    async new(title,description,text,category,author,subject){
        try{
            await knex.insert({title,description,text,category,author,subject,published_date: new Date(),last_changed: new Date(),status:0}).table("articles");
        }catch(err){
            return {status: false,err: err}
        }
    }       

    async update(id,title,description,text,category,author,subject,status){

        var article = await this.findById(id);

        if(article != undefined){

            var editArticle = {};

            if(title != undefined){
                editArticle.title = title;
            }

            if(description != undefined){
                editArticle.description = description;
            }

            if(text != undefined){
                editArticle.text = text;
            }

            if(category != undefined){
                editArticle.category = category;
            }

            if(author != undefined){
                editArticle.author = author;
            }

            if(subject != undefined){
                editArticle.subject = subject;
            }            

            var last_changed = new Date();
            editArticle.last_changed = last_changed;
            

            if(status != undefined){
                editArticle.status = status;
            }        
         

            try{
                await knex.update(editArticle).where({id: id}).table("articles");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O trabalho/artigo não existe!"}
        }
    }

    async delete(id){
        var article = await this.findById(id);
        if(article != undefined){

            try{
                await knex.delete().where({id: id}).table("articles");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O trabalho/artigo não existe, portanto não pode ser deletada."}
        }
    }
    
}

module.exports = new Article();