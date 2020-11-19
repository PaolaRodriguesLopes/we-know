<template>
    <article>
        <div class="box">
            <div class="content">
                <header>
                    <h1> {{ title }} </h1>
                    <h6 class="has-text-right is-italic"> {{ author }} </h6>
                </header>

                <hr>
                
                <div class="other">
                    <header>
                        <h3> {{ subject }} </h3>
                    </header>
                    
                    <p class="is-italic is-family-sans-serif"> {{ description }} </p>
                    <p> {{ text }} </p>
                    <p>
                        Publicado às <span class="has-text-weight-bold"> {{ published_date | formatDatetime }}, </span>
                        última modificação feita às <span class="has-text-weight-bold"> {{ last_changed | formatDatetime }} </span>
                    </p>
                </div>

                <hr>

                <a :href="lastPath" class="button is-outlined">
                    Voltar
                </a>
            </div>
        </div>
    </article>
</template>

<script>
    import Filters from '../js/others/Filters';
    import ArticleServices from '../js/services/ArticleServices';

    export default {

        created() {
            const currentId = this.$route.params.id;
            const lastPath = this.$route.params.lastPath;
            if (lastPath) {
                this.lastPath = lastPath;
            }

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
                title: '',
                lastPath: '/articles'
            }
        },
        
        filters: {
            formatDatetime: Filters.formatDatetime,
        }
    }
</script>