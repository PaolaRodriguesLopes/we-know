var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const { Exception } = require("handlebars");


class Article{

    constructor() {
        this.allColumns = [
            "id", "title", "description", "text", "category",
            "author", "subject", "published_date", "last_changed", "status_article",
            "comments"
        ];
    }

    async findAll(){
        try{
            var result = await knex.select(this.allColumns).table("articles");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findByValueAndCriteria(value, criteria){
        try {
            let result = null;
            console.log('model');
            if (criteria.indexOf('-') !== -1) {
                criteria = criteria.split('-');
                const table = criteria[0];
                const key = criteria[1];
                const column = criteria[2];
                console.log('findByValueAndCriteria -- ', 'table', table, 'column', column, 'value', value);
                result = await knex.select('articles.*').from('articles')
                                   .leftJoin(table, `articles.${key}`, `${table}.id`)
                                   .where(`${table}.${column}`, 'like', `%${value}%`);
            }
            else {
                result = await knex.select('articles.*').from('articles').where(criteria, 'like', `%${value}%`);
            }

            if (result == null) {
                throw new Exception('result cannot be null!');
            }

            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(this.allColumns).where({id:id}).table("articles");
            
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
        try {
            const payload = {
                title, description, text, category, author,
                subject, published_date: new Date(), last_changed: new Date(), status_article: 0,
                comments: null
            };
            await knex.insert(payload).table("articles");
        }catch(err){
            return {status: false,err: err}
        }
    }       

    async update(id,title,description,text,category,author,subject,status_article){

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
            

            if(status_article != undefined){
                editArticle.status_article = status_article;
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

    async updateStatus(id,status_article){

        var article = await this.findById(id);

        if(article != undefined){

            var editArticle = {};

            
            if(status_article != undefined){
                editArticle.status_article = status_article;
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

    async updateComments(id, comments){
        const article = await this.findById(id);
        if (article != undefined) {
            const editArticle = {
                comments: (comments ? comments : null)
            };

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