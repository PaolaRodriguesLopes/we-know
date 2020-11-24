<template>
    <article>
        <header>
            <h1 class="title">
                Painel Administrador de Cursos
            </h1>
        </header>

        <!-- new course -->
        <div class="table-form">
            <div class="container py-3">
            <input type="text" class="mx-1" placeholder="Descrição" maxlength="50" v-model="description" style="width:60%;">
            <input type="text" class="mx-1" placeholder="Duração" maxlength="150" v-model="duration" style="width:20%;">
            <button type="button" class="button mx-1 is-warning" @click="insertCourse();">
                Adicionar Curso
            </button>
            </div>
        </div>

        <!-- courses -->
        <div class="box mx-3 my-3">
            <div class="table-container">
                <table class="table is-bordered is-fullwidth is-stripped">
                    <thead>
                        <tr class="headTable">
                        <th width="60%"> Descrição </th>
                            <th width="10%">Duração</th>
                            <th> Ações </th>
                        </tr>
                    </thead>
                    <tbody class="textTable">
                        <tr v-for="course in courses" :key="course.id">
                            <td> {{ course.description }} </td>
                            <td> {{ course.duration }} </td>
                            <td>  
                                <button type="button" class="button is-success mx-1" @click="showEditModalCourse(course.id);">
                                   <font-awesome-icon icon="edit" title="Editar Curso" />
                                </button>
                                <button type="button" class="button is-danger mx-1" @click="showDeleteModalCourse(course.id);">
                                    <font-awesome-icon icon="trash" title="Remover Curso" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- delete modal -->
        <div :class="{modal: true, 'is-active': showDeleteModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Você realmente deseja excluir essa curso ?
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="message-excluir">
                                <!-- <img src="../assets/" alt=""> -->
                                <p> Depois não será possível reverter esse processo... </p>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <button type="button" class="card-footer-item button btn-cancelar" @click="hideModal();">
                            Cancelar
                        </button>
                        <button type="button" class="card-footer-item button btn-deletar" @click="deleteCourse();">
                            Sim, quero excluir!
                        </button>
                    </footer>
                </div>
            </div>
        </div>

        <!-- edit modal -->
        <div :class="{modal: true, 'is-active': showEditModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title has-text-white">
                            Edição de Curso
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label" for="currentDescriptionInput">
                                    Descrição:
                                </label>
                                <div class="control">
                                    <input type="text" id="currentDescriptionInput" class="input mx-1" placeholder="Descrição" maxlength="50" v-model="currentDescription">
                                </div>
                                <p class="help"> {{ currentDescription.length }} / 50 caracteres. </p>
                            </div>
                            <div class="field">
                                <label class="label" for="currentDurationInput">
                                    Duração:
                                </label>
                                <div class="control">
                                    <input type="text" id="currentDurationInput" class="input mx-1" placeholder="Duraçao" maxlength="150" v-model="currentDuration">
                                </div>
                                <p class="help"> {{ currentDuration.length }} / 150 caracteres. </p>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <button type="button" class="card-footer-item button button is-light" @click="hideModal();">
                            Cancelar
                        </button>
                        <button type="button" class="card-footer-item button button is-success" @click="updateCourse();">
                            Atualizar!
                        </button>
                    </footer>
                </div>
            </div>
        </div>

    </article>
</template>

<script>
    import CourseServices from '../js/services/CourseServices';

    export default {

        created() {
            this.findAll();
        },

        data() {
            return {
                courses: [],
                showDeleteModal: false,
                showEditModal: false,
                deleteCourseId: -1,
                editCourseId: -1,
                description: '',
                duration: '',
                currentDescription: '',
                currentDuration: ''
            }
        },

        methods: {
            findAll() {
                CourseServices.getCourses().then(response => {
                    this.courses = response.data;
                }).catch(error => { 
                    console.log('error get course', error);
                    this.courses = [];
                });
            },

            hideModal() {
                this.showDeleteModal = this.showEditModal = false;
            },

            showDeleteModalCourse(id) {
                this.deleteCourseId = id;
                this.showDeleteModal = true;
            },

            showEditModalCourse(id) {
                CourseServices.getById(id).then(response => { 
                    if (response.data) {
                        this.editCourseId = id;
                        this.currentDescription = response.data.description;
                        this.currentDuration = response.data.duration;
                        this.showEditModal = true;
                    }
                    else {
                        alert('Erro ao buscar a curso!');
                    }
                }).catch(error => {
                    console.log('error find by id course', error);
                    alert('Erro ao buscar a curso!');
                });
            },

            deleteCourse() {
                CourseServices.remove(this.deleteCourseId).then(response => { 
                    this.showDeleteModal = false;

                    if (response.data && response.data !== '') {
                        alert('Curso excluido com sucesso!');
                        this.findAll()
                    }
                    else {
                        alert ('Ocorreu um erro ao excluir a Curso!')
                    }

                }).catch(error => {
                    console.log('error delete course', error);
                    this.showDeleteModal = false;
                    alert ('Ocorreu um erro ao excluir a Curso!')
                });
            },

            updateCourse() {
                if (this.currentDescription === '') {
                    alert('Descrição precisa ser preenchida!');
                    return;
                }

                if (this.currentDuration === '') {
                    alert('Duração precisa ser preenchida!');
                    return;
                }

                const payload = { 
                    id: this.editCourseId, 
                    description: this.currentDescription,
                    duration: this.currentDuration
                };

                CourseServices.update(payload).then(response => { 
                    this.showEditModal = false;
                    this.currentDescription = this.currentDuration = '';
                    this.editCourseId = -1;

                    if (response.data && response.data !== '') {
                        alert('Curso atualizado com sucesso!');
                        this.findAll()
                    }
                    else {
                        alert ('Ocorreu um erro ao atualizar a Curso!')
                    }

                }).catch(error => {
                    console.log('error delete course', error);
                    this.showDeleteModal = false;
                    alert ('Ocorreu um erro ao excluir a Curso!')
                });
            },

            insertCourse() {
                if (this.description === '') {
                    alert('Descrição precisa ser preenchida!');
                    return;
                }

                if (this.duration === '') {
                    alert('Duração precisa ser preenchida!');
                    return;
                }

                const payload = { 
                    description: this.description,
                    duration: this.duration
                };

                CourseServices.insert(payload).then(response => { 
                    if (response.data && response.data !== '') {
                        alert('Curso inserido com sucesso!');
                        this.description = this.duration = '';
                        this.findAll();
                    }
                    else {
                        alert ('Ocorreu um erro ao inserir a Curso!')
                    }
                }).catch(() => alert ('Ocorreu um erro ao inserir a Curso!'));
            }
        }
    }
</script>

<style src="../css/global.css"></style>