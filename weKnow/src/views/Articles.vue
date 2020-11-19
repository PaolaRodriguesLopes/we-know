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
                                <router-link :to="{ name: 'ArticleDetails', params: { id: article.id, lastPath: currentLocation }}">
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

<script>
    import Filters from '../js/others/Filters';
    import Helpers from '../js/others/Helpers';
    import ArticleServices from '../js/services/ArticleServices';

    export default {

        created() {
            this.currentLocation = window.location.href;
            this.getSessionUser();
            this.getUserRole();
            this.checkParams();
        },

        data() {
            return {
                articles: [],
                showModal: false,
                showReproveModal: false,
                showCommentsModal: false,
                deleteArticleId: -1,
                reproveArticleId: -1,
                searchQuery: '',
                searchCriteria: 'All',
                criteria: ['Title', 'Description', 'Status'],
                statusValues: ['Approved', 'Rejected', 'Waiting Approving'],
                userRole: -1,
                comments: '',
                sessionUser: null,
                currentLocation: ''
            }
        },

        methods: {
            checkParams() {
                const params = new URLSearchParams(window.location.search);
                if (params) {
                    if (params.get('id')) {
                        this.findByAuthor(params.get('id'));
                    }
                    else if (params.get('value') && params.get('criteria')) {
                        const criteria = params.get('criteria');
                        const value = params.get('value');
                        console.log('value', value, 'criteria', criteria);

                        if (criteria !== 'author_status') {
                            this.findByValueAndCriteria(value, criteria);
                        }
                        else {
                            this.findByAuthorWhereStatusIs(this.sessionUser.id, value);
                        }
                    }
                    else {
                        this.findAll();
                    }
                }
                else {
                    this.findAll();
                }
            },

            getSessionUser() {
                this.sessionUser = Helpers.getSessionUser();
            },

            findAll() {
                ArticleServices.getArticles().then(response => this.articles = response.data).catch(() => this.articles = []);
            },

            findByAuthor(authorId) {
                ArticleServices.findByAuthor(authorId).then(response => this.articles = response.data).catch(() => this.articles = []);
            },

            findByValueAndCriteria(value, criteria) {
                ArticleServices.findByValueAndCriteria(value, criteria).then(response => this.articles = response.data).catch(() => this.articles = []);
            },

            findByAuthorWhereStatusIs(authorId, statusArticle) {
                ArticleServices.findByAuthorWhereStatusIs(authorId, statusArticle).then(response => this.articles = response.data).catch(() => this.articles = []);
            },

            hideModal() {
                this.showModal = this.showReproveModal = this.showCommentsModal = false;
                this.comments = '';
            },

            showModalArticle(id) {
                this.deleteArticleId = id;
                this.showModal = true;
            },

            showReproveArticleModal(id) {
                this.reproveArticleId = id;
                this.showReproveModal = true;
            },

            showCommentsArticleModal(comments) {
                this.comments = comments;
                this.showCommentsModal = true;
            },

            deleteArticle() {
                ArticleServices.remove(this.deleteArticleId).then(response => { 
                    console.log('response delete article', response);
                    this.showModal = false;
                    this.checkParams();
                }).catch(error => {
                    console.log('error delete article', error);
                    this.showModal = false;
                });
            },

            updateStatus(id, status_article) {
                const payload = { id, status_article }
                ArticleServices.updateStatus(payload).then(response => {
                    console.log('response updateStatus article', response);

                    ArticleServices.updateApprovedBy({ id: payload.id, approved_by: this.sessionUser.id })
                        .then(response => {
                            console.log('response updateApprovedBy article', response);
                            this.showReproveModal = false;
                            this.checkParams();
                        }).catch(error => {
                            console.log('error updateApprovedBy article', error);
                        });
                }).catch(error => {
                    console.log('error updateStatus article', error);
                });
            },

            updateComments() {
                if (this.comments === '') {
                    alert('É necessário informar os comentários.');
                    return;
                }

                const payload = { id: this.reproveArticleId, comments: this.comments };
                console.log('payload', payload);
                ArticleServices.updateComments(payload).then(response => { 
                    console.log('response updateComments article', response);
                    this.updateStatus(payload.id, 2);
                }).catch(error => {
                    console.log('error updateStatus article', error);
                    alert('Erro ao reprovar o artigo');
                });
            },

            compareUserWithAuthor(authorId) {
                const sessionUser = Helpers.getSessionUser();
                if (sessionUser) {
                    if (sessionUser.id === authorId) {
                        return true;
                    }
                }

                return false;
            },

            gotoUpdate(authorId, articleId) {
                console.log('authorId', authorId, 'articleId', articleId);
                if (this.compareUserWithAuthor(authorId)) {
                    this.$router.push({ name: 'UpdateArticle', params: { id: articleId } });
                }
                else {
                    alert('Apenas o author poderá editar seu próprio artigo!');
                }
            },

            getUserRole() {
                if (this.sessionUser) {
                    this.userRole = this.sessionUser.role;
                    console.log('userRole', this.userRole);
                }
            }
        },
        filters: {
            processRole: Filters.processRole,
            formatDatetime: Filters.formatDatetime,
            processArticleStatus: Filters.processArticleStatus,
            getTextColorFromArticleStatus: Filters.getTextColorFromArticleStatus,
        }
    }
</script>

<style src="../css/global.css"></style>