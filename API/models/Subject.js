var knex = require("../database/connection");
var bcrypt = require("bcrypt");


class Subject{

    async findAll(){
        try{
            var result = await knex.select(["id","description"]).table("subjects");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","description"]).where({id:id}).table("subjects");
            
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
            await knex.insert({description}).table("subjects");
        }catch(err){
            return {status: false,err: err}
        }
    }       

    async update(id,description){

        var subject = await this.findById(id);

        if(subject != undefined){

            var editSubject = {};

           
            if(description != undefined){
                editSubject.description = description;
            }
         

            try{
                await knex.update(editSubject).where({id: id}).table("subjects");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "A matéria não existe!"}
        }
    }

    async delete(id){
        var subject = await this.findById(id);
        if(subject != undefined){

            try{
                await knex.delete().where({id: id}).table("subjects");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "A matéria não existe, portanto não pode ser deletada."}
        }
    }
    
}

module.exports = new Subject();