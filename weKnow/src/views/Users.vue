<template>
    <div>
        <header>
            <h1 class="title">Painel Administrador de Usuários</h1>
        </header>

        <router-link :to="{name: 'UserEdit', params:{ previousUrl: currentLocation }}">
            <button class="button is-link my-3"> Novo Usuário </button>
        </router-link>&nbsp; &nbsp; 

        <div class="box mx-3 my-3">
            <div class="table-container">
                <table class="table is-bordered is-fullwidth is-striped">
                    <thead>
                        <tr class="headTable">
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody class="textTable">
                        <tr v-for="user in users" :key="user.id">
                            <td class="nameItem">{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{ user.role | processRole }}</td>
                            <td>
                                <router-link :to="{name: 'UserEdit', params:{ id: user.id, previousUrl: currentLocation }}">
                                    <button class="button is-success"> <font-awesome-icon icon="edit" title="Editar Usuário" /> </button>
                                </router-link>&nbsp; &nbsp; 
                                <button class="button is-danger" @click="showModalUser(user.id)"><font-awesome-icon icon="trash" title="Remover Usuário" /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <div :class="{modal: true, 'is-active': showModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                
                <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                    Você realmente deseja exlcuir este usuário?
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        <div class="message-excluir">
                            <img src="../assets/users.png" class="imageUser" alt="Placeholder image" width=150px>
                            <p>Depois não sera possível reverter este processo?</p>
                        </div>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item btn-cancelar" @click="hideModal()">Cancelar</a>
                    <a href="#" class="card-footer-item btn-deletar" @click="deleteUser()">Sim, quero excluir!</a>
                </footer>
                </div>

            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
        </div>


    </div>    
</template>

<script>
import axios from 'axios';
export default {
    created(){

        this.currentLocation = window.location.href;

        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.get("http://localhost:8686/user",req).then(res => {
            console.log(res);
            this.users = res.data;
        }).catch(err => {
            console.log(err);
        })
    },
    data()
    {
        return {
            users: [],
            showModal: false,
            deleteUserId: -1,
            currentLocation: ''
        }
    },
    methods: {
        hideModal(){
            this.showModal = false;
        },
        showModalUser(id){
            this.deleteUserId = id;
            this.showModal = true;
        },
        deleteUser(){

            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }

            axios.delete("http://localhost:8686/user/"+this.deleteUserId, req).then(res => {
                console.log(res);
                this.showModal = false;
                this.users = this.users.filter(u => u.id != this.deleteUserId);
            }).catch(err => {
                console.log(err);
                this.showModal = false;
            });
        }
    },
    filters: {
        processRole: function(value){
            if(value == 0){
                return "Usuário Comum";
            }else if(value == 1){
                return "Administrador"
            }else if(value == 2){
                return "Professor(a)"
            }
        }
    }
}
</script>

<style scoped>
.nameItem{
text-transform:capitalize;

}
.title{
    background: #713a3a;
    color: #ffffff;
    padding: 10px;
    font-size: 20px;
    margin-bottom: 0 ;
}


thead{
    background: #cccccc;
}

.btn-cancelar{
    background: #cccccc;
    color: #333333;
}

.btn-cancelar:hover{
    background: #9b9b9b;
    color: #333333;
}


.btn-deletar{
    background: rgb(122, 32, 32);
    color: #fff;
}

.btn-deletar:hover{
    background: rgb(59, 6, 6);
    color: #fff;
}


.card-header-title{
    justify-content: center;
    background: #000000;
    color: #ffffff;
}


.message-excluir{
    display: flex;
    justify-content: center;
}

.message-excluir p::before{
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background:#ffffff;
    position: absolute;
    top:60px;
    left: -20px;
    border-radius: 30px;
    border: 1px solid #eeeeee;
    box-shadow: 1px 5px 5px #cccccc;
    
}


.message-excluir p{
width: 250px;
border: 1px solid #eeeeee;
box-shadow: 1px 5px 5px #cccccc;
border-radius: 30px;
padding: 10px;
height: 80px;
position: relative;
margin-left: 28px;

}

.box-add-user{
    background: #671313;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.box-add-user input, .box-add-user select{
    width: 26%;
}

.addUser{
    width: 15%;
}

.title{
    margin-bottom: 0;
}








</style>