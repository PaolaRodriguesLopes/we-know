import Filters from './others/Filters';
import ArticleServices from './services/ArticleServices';

export default {

    created() {
        const currentId = this.$route.params.id;

        ArticleServices.getById(currentId).then(response => {
            console.log('response get article', response);
            const article = response.data;
            if (article && article.id) {
                this.author = article.author;
                this.category = article.category;
                this.description = article.description;
                this.last_changed = article.last_changed;
                this.published_date = article.published_date;
                this.status_article = article.status_article;
                this.subject = article.subject;
                this.text = article.text;
                this.title = article.title;
            }
        }).catch(error => { 
            console.log('error get article', error);
            this.$router.push({ name: 'Articles' });
        });
    },

    data() {
        return {
            author: {},
            category: {},
            description: '',
            last_changed: '',
            published_date: '',
            status_article: '',
            subject: '',
            text: '',
            title: ''
        }
    },
    
    filters: {
        formatDatetime: Filters.formatDatetime,
    }
}