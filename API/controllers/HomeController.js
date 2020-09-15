class HomeController{

    async index(req, res){
        res.send("Hello");
    }

    async validate(req, res){
        res.send("okay");
    }

}

module.exports = new HomeController();