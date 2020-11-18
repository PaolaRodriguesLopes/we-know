var User = require("../models/User");
var jwt = require("jsonwebtoken");
var PasswordToken = require("../models/PasswordToken")
var send = require("../utils/EmailController")

var secret = "Facens2020programacaoweb";
var bcrypt = require("bcrypt");

class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUserByEmail(request, response) {
        console.log('request');
        console.log(request);
        const email = request.query.value;
        const user = await User.findByEmail(email);

        if (!user) {
            response.status(404);
            response.json({});
        }
        else {
            response.status(200);
            response.json(user);
        }
    }

    async findUser (req,res){
        var id = req.params.id;
        var user = await User.findById(id);

        if (user == undefined){
            res.status(404);
            res.json({});
        }else{
            //por padrao ja passa o 200 e so para deixa elegivel no codigo
            res.status(200);
            res.json(user);
        }
    }

    async create(req,res){
       var {email,name, password,course,ra} = req.body;

        if (email == undefined || email == '' || email == ' '){
            res.status(400);
            res.json({err: "O e-mail é inválido"});
            return; // para encerrar a requisicao
        }

        if (name == undefined || name == '' || name == ' '){
            res.status(400);
            res.json({err: "O nome é inválido"});
            return;
        }

        if (password == undefined || password == '' || password == ' '){
            res.status(400);
            res.json({err: "A senha é inválida"});
            return;
        }

        if (course == '0'){
            res.status(400);
            res.json({err: "Você precisa selecionar um curso"});
            return;
        }

        var emailExists = await User.findEmail(email);
        var raExists = await User.findRA(ra);

        console.log(emailExists);

        if (emailExists){
            //nao aceitavel
            res.status(406);
            res.json({err:"O e-mail já está cadastrado !"});
            return;
        }

        if (raExists){
            //nao aceitavel
            res.status(406);
            res.json({err:"O RA já está cadastrado !"});
            return;
        }
        
        await User.new(email,password,name,course,ra);

        res.status(200);
        
        res.send("Tudo ok!");
    }

    async edit(req, res){
        var {id, name, role, email,course,ra} = req.body;
        var result = await User.update(id,email,name,role,course,ra);
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

        var result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if(result.status){
            await send.sendEmail(email,result.token);
           res.status(200);
           //Convertendo para string
           res.send("" + result.token);
        }else{
            res.status(406)
            res.send(result.err);
        }
    }

    async changePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;
        var isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
            await User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        }else{
            res.status(406);
            res.send("Token inválido!");
        }
    }

    async login(req, res){
        var {email, password } = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined){

            var resultado = await bcrypt.compare(password,user.password);

            if(resultado){

                var token = jwt.sign({ email: user.email, role: user.role }, secret, {
                    expiresIn: 1800 // expires in 30 min
                  });

                res.status(200);
                res.json({token: token});

            }else{
                res.status(406);
                res.json({err: "Senha incorreta"});
            }

        }else{
            res.status(406);
            res.json({status: false, err: "O usuário não existe"});
            
        }
    }

}
module.exports = new UserController();