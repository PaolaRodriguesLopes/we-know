<template>
    <article>
        <header>
            <h1 class="title">
                Painel Administrador de Categorias
            </h1>
        </header>

        <!-- new category -->
        <div class="table-form">
            <div class="container py-3">
            <input type="text" class="mx-1" placeholder="Descrição" maxlength="50" v-model="description" style="width:80%;">
            <button type="button" class="button mx-1 is-warning" @click="insertCategory();">
                Adicionar Categoria
            </button>
            </div>
        </div>

        <!-- categories -->
        <div class="box mx-3 my-3">
            <div class="table-container">
                <table class="table is-bordered is-fullwidth is-stripped">
                    <thead>
                        <tr>
                            <th width="80%"> Descrição</th>
                            <th> Ações </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cat in categories" :key="cat.id">
                            <td> {{ cat.description }} </td>
                            <td>  
                                <button type="button" class="button is-success mx-1" @click="showEditModalCategory(cat.id);">
                                    Editar
                                </button>
                                <button type="button" class="button is-danger mx-1" @click="showDeleteModalCategory(cat.id);">
                                    Deletar
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
                            Você realmente deseja excluir essa categoria ?
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
                        <button type="button" class="card-footer-item button btn-deletar" @click="deleteCategory();">
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
                            Edição de Categoria
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
                        <button type="button" class="card-footer-item button button is-success" @click="updateCategory();">
                            Atualizar!
                        </button>
                    </footer>
                </div>
            </div>
        </div>

    </article>
</template>


<script src="../js/Categories.js"></script>
<style src="../css/global.css"></style>