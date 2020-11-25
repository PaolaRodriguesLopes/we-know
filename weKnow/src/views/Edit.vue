<template>
    <section>
        <header>
            <h2 class="title"> {{ headerTitle }} </h2>    
        </header>

        <hr>

        <div>
            <div class="columns is-centered content-edit">
                <div class="is-2 box foto-perfil">
                    <img src="../assets/users.png" class="imageUser" alt="Placeholder image" width=150px>
                </div>

                <!-- notification error -->
                <div class="column is-half box box-edit">
                    <div v-if="error != undefined">
                        <div class="notification is-danger">
                            {{error}}
                        </div>
                    </div>

                    <div>
                        <label class="label-login"> Nome </label>
                        <input type="text" placeholder="Nome do usuário" class="input" v-model="name">
                    </div>

                    <div>
                        <label class="label-login"> Email </label>
                        <input type="email" placeholder="email@email.com" class="input" v-model="email">
                    </div>

                    <div>
                        <label class="label-login"> RA </label>
                        <input type="text" placeholder="180000" maxlength="6" class="input" v-model="ra">
                    </div>

                    <div>
                        <label class="label-login"> Curso </label>
                        <select class="input" v-model="course" required>
                            <option value="" selected>Selecione um Curso</option>
                            <option v-for="c in courses" :key="c.id" :value="c.id">
                                {{c.description}}
                            </option>
                        </select>
                    </div>

                    <div v-if="sessionUser !== undefined && sessionUser.role === 1">
                        <label class="label-login"> Cargo </label>
                        <select class="input" v-model="role" required>
                            <option value="" selected> Selecione um Cargo </option>
                            <option v-for="r in roles" :key="r.value" :value="r.value">
                                {{r.text}}
                            </option>
                        </select>
                    </div>

                    <hr>
                    
                    <div class="btns">
                        <button class="button is-outlined" @click="getBack()">
                            Voltar
                        </button>
                        <button class="button is-success" @click="save();">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>    
    </section>
    
</template>

<script>
    import CourseServices from '../js/services/CourseServices';
    import Helpers from '../js/others/Helpers';
    import UserServices from '../js/services/UserServices';

    export default {
        created(){
            const previousLocation = this.$route.params.previousUrl;
            if (previousLocation !== undefined) {
                this.previousLocation = previousLocation;
            }

            this.loadCourses();
            this.checkSessionUser();
        },

        data(){
            return {
                id: -1,
                name: '',
                email: '',
                ra: '',
                course: '',
                role: '',
                error: undefined,
                courses: [],
                roles: [
                    { value: 0, text: 'Usuário Comum' },
                    { value: 1, text: 'Administrador' },
                    { value: 2, text: 'Professor' },
                ],
                sessionUser: undefined,
                previousLocation: '/',
                headerTitle: ''
            }
        },
        methods: {
            checkSessionUser() {
                const sessionUser = Helpers.getSessionUser();
                if (sessionUser !== null) {
                    this.sessionUser = sessionUser;
                    const selectedUserId = this.$route.params.id;
                    if (selectedUserId !== undefined) {
                        this.headerTitle = 'Edição de Usuário';
                        // caso ser usuario normal e tentar editar outro usuario
                        if (sessionUser.role === 0 && (sessionUser.id != selectedUserId)) {
                            this.$router.push({ name: 'Home' });
                        }
                        else {
                            this.loadUser(selectedUserId);
                        }
                    }
                    else {
                        this.headerTitle = 'Novo Usuário';
                    }
                }
                else {
                    this.$router.push({ name: 'Login' });
                }
            },

            getBack() {
                location.href = this.previousLocation;
            },

            loadCourses() {
                CourseServices.getCourses().then(response => this.courses = response.data).catch (() => this.courses = []);
            },

            loadUser(id) {
                UserServices.getById(id).then(response => {
                    this.id = response.data.id;
                    this.name = response.data.name;
                    this.email = response.data.email;
                    this.ra = response.data.ra;
                    this.course = response.data.course;
                    this.role = response.data.role;

                }).catch(error => {
                    console.log(error.response);
                    this.$router.push({name: 'Users'});
                });
            },

            validation() {
                if (this.name === '' || this.name.length === 0) {
                    alert('Informe o Nome!');
                    return false;
                }

                if (this.email === '' || this.email.length === 0) {
                    alert('Informe o Email!');
                    return false;
                }

                if (this.ra === '' || this.ra.length === 0) {
                    alert('Informe o RA!');
                    return false;
                }

                if (this.course === '' || this.course === 0 || this.course === '0') {
                    alert('Informe o Curso!');
                    return false;
                }

                if (this.role === '' || this.role === -1) {
                    alert('Informe o Cargo!');
                    return false;
                }

                return true;
            },

            save() {
                if (this.validation()) {
                    const payload = {
                        id: this.id,
                        name: this.name,
                        email: this.email,
                        ra: this.ra,
                        course: this.course, 
                        role: this.role
                    };

                    if (this.id === -1) {
                        this.insert(payload);
                    }
                    else {
                        this.update(payload);
                    }
                }
            },

            insert(payload){
                payload.password = 'criado por admin';

                UserServices.insert(payload).then(response => {
                    console.log(response);
                    alert('Usuário criado com sucesso!');
                    this.getBack();

                }).catch(error => {
                    this.error = error.response.data;
                });
            },

            update(payload){
                UserServices.update(payload).then(response => {
                    console.log(response);
                    alert('Usuário atualizado com sucesso!');
                    this.getBack();

                }).catch(error => {
                    this.error = error.response.data;
                });
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