<template>
    <article>
        <header>
            <h1 class="title">
                Painel Administrador de Artigos
            </h1>
        </header>

        <table class="table is-bordered is-fullwidth is-stripped">
            <thead>
                <tr>
                    <th> Título  </th>
                    <th> Descrição </th>
                    <th> Status </th>
                    <th> Última alteração </th>
                    <th> Ações </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="article in articles" :key="article.id">
                    <td> {{ article.title }} </td>
                    <td> {{ article.description }} </td>
                    <td> {{ article.status_article | processArticleStatus }} </td>
                    <td> {{ article.last_changed | formatDatetime }} </td>
                    <td>  
                        <router-link :to="{ name: 'ArticleDetails', params: { id: article.id }}">
                            <button type="button" class="button is-light"> 
                                Detalhes 
                            </button>
                        </router-link>
                        <router-link :to="{ name: 'UpdateArticle', params: { id: article.id }}">
                            <button type="button" class="button is-success"> 
                                Editar 
                            </button>
                        </router-link>
                        <br>
                        <button type="button" class="button is-danger" @click="showModalArticle(article.id);">
                            Deletar
                        </button>
                        <button type="button" class="button is-success is-light" @click="updateStatus (article.id, 1);"
                                v-if="article.status_article === 0">
                            Aprovar
                        </button>
                        <button type="button" class="button is-danger is-light" @click="updateStatus (article.id, 2);" 
                                v-if="article.status_article === 0">
                            Rejeitar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- delete modal -->
        <div :class="{modal: true, 'is-active': showModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Você realmente deseja excluir esse artigo ?
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
                        <button type="button" class="card-footer-item button btn-deletar" @click="deleteArticle();">
                            Sim, quero excluir!
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    </article>
</template>

<script src="../js/Articles.js"></script>
<style src="../css/global.css"></style>