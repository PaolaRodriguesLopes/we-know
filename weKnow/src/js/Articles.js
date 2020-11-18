import Filters from './others/Filters';
import Helpers from './others/Helpers';
import ArticleServices from './services/ArticleServices';

export default {

    created() {
        this.getUserRole();

        const params = this.$router.params;
        if (params !== undefined &&  params.id !== undefined) {
            //
        }
        else {
            this.findAll();
        }
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
            comments: ''
        }
    },

    methods: {
        findAll() {
            ArticleServices.getArticles().then(response => {
                console.log('response get article', response);
                this.articles = response.data;
            }).catch(error => { 
                console.log('error get article', error);
                this.articles = [];
            });
        },

        findByAuthors() {
            // TODO!
            console.log('aaa');
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
                this.articles = this.articles.filter(article => article.id != this.deleteArticleId);
            }).catch(error => {
                console.log('error delete article', error);
                this.showModal = false;
            });
        },

        updateStatus(id, status_article) {
            const payload = { id, status_article }
            ArticleServices.updateStatus(payload).then(response => { 
                console.log('response updateStatus article', response);
                this.showReproveModal = false;
                this.findAll();
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
            const sessionUser = Helpers.getSessionUser();
            if (sessionUser) {
                this.userRole = sessionUser.role;
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