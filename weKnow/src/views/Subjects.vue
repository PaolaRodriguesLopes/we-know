<template>
    <article>
        <header>
            <h1 class="title">
                Painel Administrador de Matérias
            </h1>
        </header>

        <!-- new subject -->
        <div class="container">
            <div class="py-3 table-form">
            <input type="text" class="mx-1" placeholder="Descrição" maxlength="50" v-model="description" style="width:80%">
            <button type="button" class="button mx-1 is-warning" @click="insertSubject();">
                Adicionar Matéria
            </button>
            </div>
        </div>

        <!-- subjects -->
        <div class="box mx-3 my-3">
            <div class="table-container">
                <table class="table is-bordered is-fullwidth is-stripped">
                    <thead>
                        <tr class="headTable">
                            <th width="70%"> Descrição  </th>
                            <th> Ações </th>
                        </tr>
                    </thead>
                    <tbody class="textTable">
                        <tr v-for="sub in subjects" :key="sub.id">
                            <td> {{ sub.description }} </td>
                            <td>  
                                <button type="button" class="button is-success mx-1" @click="showEditModalSubject(sub.id);">
                                    <font-awesome-icon icon="edit" title="Editar Matéria" />
                                </button>
                                <button type="button" class="button is-danger mx-1" @click="showDeleteModalSubject(sub.id);">
                                    <font-awesome-icon icon="trash" title="Remover Matéria" />
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
                            Você realmente deseja excluir essa matéria ?
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
                        <button type="button" class="card-footer-item button btn-deletar" @click="deleteSubject();">
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
                            Edição de Matéria
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
                        </div>
                    </div>
                    <footer class="card-footer">
                        <button type="button" class="card-footer-item button button is-light" @click="hideModal();">
                            Cancelar
                        </button>
                        <button type="button" class="card-footer-item button button is-success" @click="updateSubject();">
                            Atualizar!
                        </button>
                    </footer>
                </div>
            </div>
        </div>

    </article>
</template>

<script>
    import SubjectServices from '../js/services/SubjectServices';

    export default {

        created() {
            this.findAll();
        },

        data() {
            return {
                subjects: [],
                showDeleteModal: false,
                showEditModal: false,
                deleteSubjectId: -1,
                editSubjectId: -1,
                description: '',
                currentDescription: ''
            }
        },

        methods: {
            findAll() {
                SubjectServices.getSubjects().then(response => {
                    this.subjects = response.data;
                }).catch(error => { 
                    console.log('error get subject', error);
                    this.subjects = [];
                });
            },

            hideModal() {
                this.showDeleteModal = this.showEditModal = false;
            },

            showDeleteModalSubject(id) {
                this.deleteSubjectId = id;
                this.showDeleteModal = true;
            },

            showEditModalSubject(id) {
                SubjectServices.getById(id).then(response => { 
                    if (response.data) {
                        this.editSubjectId = id;
                        this.currentDescription = response.data.description;
                        this.showEditModal = true;
                    }
                    else {
                        alert('Erro ao buscar a matéria!');
                    }
                }).catch(error => {
                    console.log('error find by id subject', error);
                    alert('Erro ao buscar a matéria!');
                });
            },

            deleteSubject() {
                SubjectServices.remove(this.deleteSubjectId).then(response => { 
                    this.showDeleteModal = false;

                    if (response.data && response.data !== '') {
                        alert('Matéria excluida com sucesso!');
                        this.findAll()
                    }
                    else {
                        alert ('Ocorreu um erro ao excluir a Matéria!')
                    }

                }).catch(error => {
                    console.log('error delete subject', error);
                    this.showDeleteModal = false;
                    alert ('Ocorreu um erro ao excluir a Matéria!')
                });
            },

            updateSubject() {
                if (this.currentDescription === '') {
                    alert('Descrição precisa ser preenchida!');
                    return;
                }

                const payload = { id: this.editSubjectId, description: this.currentDescription };
                SubjectServices.update(payload).then(response => { 
                    this.showEditModal = false;
                    this.currentDescription = '';
                    this.editSubjectId = -1;

                    if (response.data && response.data !== '') {
                        alert('Matéria atualizada com sucesso!');
                        this.findAll()
                    }
                    else {
                        alert ('Ocorreu um erro ao atualizar a Matéria!')
                    }

                }).catch(error => {
                    console.log('error delete subject', error);
                    this.showDeleteModal = false;
                    alert ('Ocorreu um erro ao excluir a Matéria!')
                });
            },

            insertSubject() {
                if (this.description === '') {
                    alert('Descrição precisa ser preenchida!');
                    return;
                }

                const payload = { description: this.description};
                SubjectServices.insert(payload).then(response => { 
                    if (response.data && response.data !== '') {
                        alert('Matéria inserida com sucesso!');
                        this.description = '';
                        this.findAll();
                    }
                    else {
                        alert ('Ocorreu um erro ao inserir a Matéria!')
                    }
                }).catch(() => alert ('Ocorreu um erro ao inserir a Matéria!'));
            }
        }
    }
</script>

<style src="../css/global.css"></style>