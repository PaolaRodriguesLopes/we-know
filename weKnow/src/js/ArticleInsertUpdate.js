import Filters from './others/Filters';
import { getSessionUser } from './others/Helpers';
import ArticleServices from './services/ArticleServices';
import CategoryServices from './services/CategoryServices';
import UserServices from './services/UserServices';

export default {

    created() {
        const currentId = this.$router?.currentRoute?.params?.id || undefined;
        this.headerTitle = (currentId ? 'Atualizar' : 'Novo');
        if (currentId) {
            this.id = currentId;
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
        }

        CategoryServices.getCategories().then(response => {
            this.categories = response.data;
        }).catch(error => { 
            alert('error', error)
            this.categories = [];
        });

        UserServices.getUsers().then(response => {
            this.users = response.data;
        }).catch(error => { 
            alert('error', error)
            this.users = [];
        });
    },

    data() {
        return {
            id: -1,
            description: '',
            last_changed: '',
            published_date: '',
            status_article: '',
            subject: '',
            text: '',
            title: '',
            headerTitle: '',
            author: 0,
            category: 0,
            error: undefined,
            categories: [],
            users: []
        }
    },

    methods: {
        save() {
            const payload = {
                id: this.id,
                description: this.description,
                status_article: this.status_article,
                subject: this.subject,
                text: this.text,
                title: this.title,
                author: this.author,
                category: this.category
            };

            console.log('payload', payload);

            if (this.id === -1) {
                payload.author = getSessionUser().id;
                this.insert(payload);
            }
            else {
                this.update(payload);
            }
        },

        insert(payload) {
            ArticleServices.insert(payload).then(response => { 
                console.log('ArticleServices insert response', response);
                if (response.data && response.data !== '') {
                    alert('Novo artigo criado com sucesso!');
                    this.$router.push({ name: 'Articles', params: { id: payload.author } });
                }
                else {
                    alert('Erro ao inserir o novo artigo!');    
                }
            }).catch(error => { 
                console.log('insert error', error);
                alert('Erro ao inserir o novo artigo!');
            });
        },

        update(payload) {
            ArticleServices.update(payload).then(response => { 
                console.log('ArticleServices update response', response);
                if (response.data && response.data !== '') {
                    alert('Artigo atualizado com sucesso!');
                    this.$router.push({ name: 'Articles', params: { id: payload.author } });
                }
                else {
                    alert('Erro ao inserir o novo artigo!');    
                }
            }).catch(error => { 
                console.log('update error', error);
                alert('Erro ao atualizar o artigo!');
            });
        }
    },
    
    filters: {
        formatDatetime: Filters.formatDatetime,
    }
}