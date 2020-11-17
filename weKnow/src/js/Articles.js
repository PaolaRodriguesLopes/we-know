import Filters from './others/Filters';
import ArticleServices from './services/ArticleServices';

export default {

    created() {
        this.findAll();
    },

    data() {
        return {
            articles: [],
            showModal: false,
            deleteArticleId: -1
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

        hideModal() {
            this.showModal = false;
        },

        showModalArticle(id) {
            this.deleteArticleId = id;
            this.showModal = true;
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
                this.findAll();
            }).catch(error => {
                console.log('error updateStatus article', error);
                
            });
        }
    },
    filters: {
        processRole: Filters.processRole,
        formatDatetime: Filters.formatDatetime,
        processArticleStatus: Filters.processArticleStatus,
    }
}