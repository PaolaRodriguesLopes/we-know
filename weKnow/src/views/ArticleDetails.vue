<template>
    <article>
        <h1 class="is-size-5 has-text-weight-bold tituloPrincipal"> <font-awesome-icon icon="book" style="margin-right: 10px" /> {{ title }} </h1>
        <div class="box">
            
            <div class="content">
                                                
                <div class="other">
                    <header>
                        <h3> {{ subject }} </h3>
                    </header>
                    
                    <p class="is-italic is-family-sans-serif"> {{ description }} </p>
                    <p class="texto" > {{ text }} </p>

                    <div class="info-article">
                    <p>
                        <span class="has-text-weight-bold">Categoria: </span> {{ category }} <br>
                        <span class="has-text-weight-bold">Autor: </span> {{ author }} <br>
                        Publicado às <span class="has-text-weight-bold"> {{ published_date | formatDatetime }}, </span>
                        última modificação feita às <span class="has-text-weight-bold"> {{ last_changed | formatDatetime }} </span>
                    </p>
                    </div>
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
                const article = response.data;
                if (article && article.id) {
                    this.author = article.author_name;
                    this.category = article.category_description;
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

<style scoped>
.tituloPrincipal {
  background: #292525;
  padding: 10px;
  margin: 0;
  color: #fff;
}

.box{
    padding-top:0;
}

.texto{
    text-align: justify;
    padding: 20px;
    text-indent: 50px;
}

.info-article{
    background: #ddd;
    text-align: left;
    padding: 15px;
    line-height: 30px;
    border: 1px dashed #999;
}

</style>