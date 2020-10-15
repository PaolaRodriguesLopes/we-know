<template>
    
        
        <div class="default">               
                <div class="box-login">
                    <h3><img src="../assets/WeKnow.png" alt="We Know"></h3>
                    <div v-if="error != undefined">
                        <div class="notification is-danger">
                            {{error}}
                        </div>
                    </div>
                    <label class="label-login">E-mail</label>
                    <input type="email" placeholder="email@email.com" class="input" v-model="email">
                    <label class="label-login">Senha</label>
                    <input type="password" placeholder="******" class="input" v-model="password">
                    
                    <router-link :to="{name: 'Register'}"><button class="button is-primary" >CADASTRAR</button></router-link>
                    <button class="button is-link" @click="login">ENTRAR</button>
                    <router-link :to="{name: 'ForgotPassword'}"><p class="forgotKey"><a href="#">Esqueci minha senha</a></p></router-link>
                </div>
            
        </div>
       
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            password: '',
            email: '',
            error: undefined,
        }
    },
    methods: {
        login(){
            axios.post("http://localhost:8686/login",{
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
                localStorage.setItem('token',res.data.token);
                this.$router.push({name: 'Home'});
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        }
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
    display: flex;
}
.box-login{
    background: #ffffff;
    border: 1px solid #ccc;
    margin: auto;
    width: 500px;
    height: 370px;
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

</style>