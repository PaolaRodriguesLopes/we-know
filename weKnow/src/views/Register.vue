<template>
  
    <div class="default">               
                <div class="box-login">
                    <h3><img src="../assets/WeKnow.png" alt="We Know"></h3>
                    <h4>Registro de usuário!</h4> 
                    <div v-if="error != undefined">
                        <div class="notification is-danger">
                            {{error}}
                        </div>
                    </div>

                    <label class="label-login">Nome</label>
                    <input type="text" placeholder="Nome do usuário" class="input" v-model="name">


                    <label class="label-login">E-mail</label>
                    <input type="email" placeholder="email@email.com" class="input" v-model="email">

                    <label class="label-login">Senha</label>
                    <input type="password" placeholder="******" class="input" v-model="password">

                    <label class="label-login">RA</label>
                    <input type="text" placeholder="180000" class="input" maxlength="6" v-model="ra">

                    <label class="label-login">Curso</label>
                    
                    <div class="select">
                    <select v-model="course" required>
                        <option value="0" selected>Selecione um Curso</option>
                        <option v-for="c in getCourses" :key="c.id" :value="c.id">{{c.description}}</option>
                    </select>
                    </div>

                    <router-link :to="{ name: 'Login' }">
                        <button class="button is-light">
                            Voltar
                        </button>
                    </router-link>
                    
                    <button class="button is-success" @click="register">Cadastrar</button>
                </div>
            
        </div>




</template>

<script>
import axios from 'axios';
export default {
    created(){
        axios.get("https://we-know-backend.herokuapp.com/course").then(res => {
            this.getCourses = res.data;
        }).catch(err => {
            console.log(err);
        })
    },
    data(){
        return {
            name: '',
            password: '',
            email: '',
            ra: '',
            course: '0',
            error: undefined,
            getCourses: '',
        }
    },
    methods: {
        register(){
            axios.post("https://we-know-backend.herokuapp.com//user",{
                name: this.name,
                password: this.password,
                ra: this.ra,
                course: this.course,
                email: this.email
            }).then(res => {
                console.log(res);
                alert('Registro criado com sucesso!');
                this.$router.push({name: 'Login'});
            }).catch(err => {
                alert('Erro ao criar o registro');
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        },





    }
}
</script>

<style scoped>
body{
    background: #CCC8C8 !important;
}

.default{
    background: #CCC8C8;
    min-height: 100%;
    width: 100%;
    display: flex;
}
.box-login{
    background: #ffffff;
    border: 1px solid #ccc;
    margin: auto;
    width: 500px;
    height: 600px;
    padding: 20px 50px;
    box-shadow: 3px 1px 13px 7px #ada8a8;
}

.label-login{
    float: left;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 5px 0;
}

button{
    font-weight: 600;
    margin: 25px 15px;
    width: 40%;
}

.forgotKey a:link, .forgotKey a:visited{
    color: #999999;
    text-decoration: underline;
}

.select, select{
    width: 100%;
}
</style>