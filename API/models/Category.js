var knex = require("../database/connection");
var bcrypt = require("bcrypt");


class Category{

    async findAll(){
        try{
            var result = await knex.select(["id","description"]).table("categories");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","description"]).where({id:id}).table("categories");
            
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

    

    async new(description){
        try{
            await knex.insert({description}).table("categories");
        }catch(err){
            return {status: false,err: err}
        }
    }       

    async update(id,description){

        var category = await this.findById(id);

        if(category != undefined){

            var editCategory = {};

           
            if(description != undefined){
                editCategory.description = description;
            }
         

            try{
                await knex.update(editCategory).where({id: id}).table("categories");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "A categoria não existe!"}
        }
    }

    async delete(id){
        var category = await this.findById(id);
        if(category != undefined){

            try{
                await knex.delete().where({id: id}).table("categories");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "A categoria não existe, portanto não pode ser deletada."}
        }
    }
    
}

module.exports = new Category();