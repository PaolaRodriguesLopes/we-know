<template>
  <section class="section secHome">
    <header>
      <h1 class="is-size-5 has-text-weight-bold tituloPrincipal">
        {{ headerTitle }}
      </h1>
    </header>

    <!-- articles -->
    <div class="home" v-if="articles.length !== 0">
      <div class="card box-article" v-for="art in articles" :key="art.id">
        <header class="card-header">
          <p class="card-header-title">
            <font-awesome-icon icon="book" style="margin-right: 10px" />
            {{ art.title }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>{{ art.description }}</p>
            <span class="author"> Autor: </span> {{ art.author }} <br />
            <span class="author"> Categoria: </span> {{ art.category }}
            <p class="is-italic">
              Publicado às {{ art.last_changed | formatDatetime }}
            </p>
          </div>
          <button type="button" class="button is-info mx-1 my-1 is-small">
            Detalhes
          </button>
        </div>
      </div>
    </div>

    <!-- empty -->
    <p class="is-size-5 has-text-centered" v-if="articles.length == 0">
      Nenhum artigo encontrado !
    </p>
  </section>
</template>

<script>
import Filters from "../js/others/Filters";
import ArticleServices from "../js/services/ArticleServices";
export default {
  created() {
    this.currentLocation = window.location.href;
    const params = new URLSearchParams(window.location.search);
    if (params) {
      if (params.get("value") && params.get("criteria")) {
        const criteria = params.get("criteria");
        const value = params.get("value");

        if (criteria === "subjects-subject-description") {
          this.headerTitle += ` sobre ${value}`;
        }

        this.findByValueAndCriteria(value, criteria);
      } else {
        this.findAll();
      }
    } else {
      this.findAll();
    }
  },
  data() {
    return {
      articles: [],
      headerTitle: "Últimos Artigos",
      currentLocation: "",
    };
  },
  methods: {
    findAll() {
      ArticleServices.getArticles()
        .then((response) => (this.articles = response.data))
        .catch(() => (this.articles = []));
    },

    findByValueAndCriteria(value, criteria) {
      ArticleServices.findByValueAndCriteria(value, criteria)
        .then((response) => (this.articles = response.data))
        .catch(() => (this.articles = []));
    },
  },
  filters: {
    formatDatetime: Filters.formatDatetime,
  },
};
</script>

<style scoped>
.box-article {
  border: 1px solid #ccc8c8;
  width: 45%;
  min-height: 250px;
  margin: 2%;
  font-size: 14px;
  text-align: justify;
}

.box-article p {
  margin-top: 0;
}

.box-article h3 {
  font-size: 18px;
  font-weight: 600;
}

.author {
  font-weight: 600;
}

.home {
  display: flex;
  flex-wrap: wrap;
}

.home h2 {
  width: 100%;
  margin-top: 15px;
  font-weight: 600;
  font-size: 20px;
  text-align: left;
  padding-left: 2%;
}

.secHome {
  margin: 0;
  padding: 0;
}

.tituloPrincipal {
  background: #292525;
  padding: 10px;
  margin: 0;
  color: #fff;
}

.card-header-title {
  background: #ddd;
}
</style>
