<template>
    <div>
        <h2 class="title">Edição de usuário</h2>    
        <hr>

        <div class="columns is-centered content-edit">
            <div class="is-2 box foto-perfil">
                <img src="../assets/users.png" class="imageUser" alt="Placeholder image" width=150px>
            </div>


            <div class="column is-half box box-edit">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        {{error}}
                    </div>
                </div>
                
                <label class="label-login">Nome</label>
                <input type="text" placeholder="Nome do usuário" class="input" v-model="name">
                
                <label class="label-login">Email</label>
                <input type="email" placeholder="email@email.com" class="input" v-model="email">
                <hr>
                
                <div class="btns">
                <router-link :to="{name: 'Users'}"><button class="button is-outlined">Voltar para usuários</button></router-link> &nbsp;
                <button class="button is-success" @click="update">Salvar Edição</button>


                
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';
export default {
    created(){


        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.get("http://localhost:8686/user/" + this.$route.params.id, req).then(res => {
            console.log(res);

            this.name = res.data.name;
            this.email = res.data.email;
            this.id = res.data.id;

        }).catch(err => {
            console.log(err.response);
             this.$router.push({name: 'Users'});
        })

    },
    data(){
        return {
            name: '',
            email: '',
            id: -1,
            error: undefined,
        }
    },
    methods: {
        update(){

            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }


            axios.put("http://localhost:8686/user",{
                name: this.name,
                email: this.email,
                id: this.id
            }, req).then(res => {
                console.log(res);
                this.$router.push({name: 'Users'});
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        }
    }
}
</script>

<style scoped>
.title{
    background: #713a3a;
    color: #ffffff;
    padding: 10px;
    font-size: 20px;
    margin-bottom: 0 ;
}


.label-login{
    float: left;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 5px 0;
}

input{
    margin-bottom: 10px;
}

.btns{
    
    display: flex;
    justify-content: space-between;
}

.box-edit{
padding: 25px;
background: #dddddd;
margin-bottom: 0;
}

.box-edit hr{
    background-color:#cccccc;
    border: none;
    display: block;
    height: 2px;
   
}

.foto-perfil{
    background:#375269;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0 !important;
    
}

.content-edit{
    margin-top: 60px;
}

</style>