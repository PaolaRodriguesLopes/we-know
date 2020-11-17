<template>
  <div class="home">
    <h2>Últimos artigos</h2>
    <div v-for="article in articles" :key="article.id" class="box-article">
      <h3>{{ article.title }}</h3>
      <small>Data: {{ article.last_changed }}</small>
      <p>
        {{ article.description }}
      </p>
      <p>
        <span class="author">Author: </span>{{ article.author }} Category:
        {{ article.category }}
      </p>

      <router-link :to="{ name: 'ArticleDetails', params: { id: article.id }}">
        <button type="button" class="button is-light">
          Detalhes
        </button>
      </router-link>

      
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .get("http://localhost:8686/article")
      .then((res) => {
        this.articles = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      articles: [],
    };
  }
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
  padding: 15px;
}

.box-article p {
  margin-top: 10px;
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
</style>
