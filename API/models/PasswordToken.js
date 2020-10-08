var knex = require("../database/connection");

class PasswordToken{
    async create(email){
        var user = await knex.select(["id","email","password","role","name"]).where({email:email}).table("users");
        if(user != undefined){
            try{
                var token = Date.now();
                await knex.insert({
                    user_id: user[0].id,
                    used: 0,
                    token: token // UUID
                }).table("passwordtokens");

                return {status: true,token: token}
            }catch(err){
                console.log(err);
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: "O e-mail passado não existe no banco de dados!"}
        }
    }

    async validate(token){
        try{
            var result = await knex.select().where({token: token}).table("passwordtokens");

            if(result.length > 0){

                var tk = result[0];

                if(tk.used){
                    return {status: false};
                }else{
                    return {status: true, token: tk};
                }

            }else{
                return {status: false};
            }
        }catch(err){
            console.log(err);
            return {status: false};
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table("passwordtokens");
    }
}

module.exports = new PasswordToken();