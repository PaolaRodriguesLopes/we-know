<template>
    <article>
        <header>
            <h1 class="title">
                Painel Administrador de Artigos
            </h1>
        </header>

        <div class="box mx-3">
            <div class="table-container">
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
                            <td> 
                                <p :class="article.status_article | getTextColorFromArticleStatus">
                                    {{ article.status_article | processArticleStatus }} 
                                </p>
                                <p v-if="(article.status_article === 2) && (article.comments)"> 
                                    <a @click="showCommentsArticleModal (article.comments)">
                                        Comentários...
                                    </a>
                                </p>
                            </td>
                            <td> {{ article.last_changed | formatDatetime }} </td>
                            <td>

                                <!-- details -->
                                <router-link :to="{ name: 'ArticleDetails', params: { id: article.id }}">
                                    <button type="button" class="button is-light"> 
                                        Detalhes 
                                    </button>
                                </router-link>

                                <!-- edit -->
                                <div v-if="compareUserWithAuthor(article.author)">
                                    <button type="button" class="button is-success" @click="gotoUpdate(article.author, article.id);"> 
                                        Editar 
                                    </button>
                                </div>
                                
                                <!-- delete -->
                                <div v-if="compareUserWithAuthor(article.author) || (userRole === 1 || userRole === 2)">
                                    <button type="button" class="button is-danger" @click="showModalArticle(article.id);">
                                        Deletar
                                    </button>
                                </div>
                                
                                <!-- approve -->
                                <div v-if="(article.status_article === 0) && (userRole === 1 || userRole === 2)">
                                    <button type="button" class="button is-success is-light" @click="updateStatus (article.id, 1);">
                                        Aprovar
                                    </button>
                                </div>
                                
                                <!-- repprove -->
                                <div v-if="(article.status_article === 0) && (userRole === 1 || userRole === 2)">
                                    <button type="button" class="button is-danger is-light" @click="showReproveArticleModal (article.id);">
                                        Reprovar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

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

        <!-- reprove modal -->
        <div :class="{modal: true, 'is-active': showReproveModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title has-text-white">
                            Reprovar Artigo
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label" for="commentsTextarea">
                                    Comentários :
                                </label>
                                <div class="control">
                                    <textarea id="commentsTextarea" class="textarea mx-1" cols="30" rows="8" placeholder="Comentários" maxlength="500" v-model="comments"></textarea>
                                </div>
                                <p class="help"> {{ comments.length }} / 500 caracteres. </p>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <button type="button" class="card-footer-item button button is-light" @click="hideModal();">
                            Cancelar
                        </button>
                        <button type="button" class="card-footer-item button button is-danger" @click="updateComments();">
                            Reprovar
                        </button>
                    </footer>
                </div>
            </div>
        </div>

        <!-- comments modal -->
        <div :class="{modal: true, 'is-active': showCommentsModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title has-text-white">
                            Comentários sobre a reprovação
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <p> {{ comments }} </p>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <button type="button" class="card-footer-item button button is-light" @click="hideModal();">
                            Cancelar
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    </article>
</template>

<script src="../js/Articles.js"></script>
<style src="../css/global.css"></style>