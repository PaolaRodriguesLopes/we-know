<template>
  <div id="app">
    <div class="menuDefault" v-if="!hideBars">
      <div class="logo">
        <img src="./assets/WeKnow.png" border="0" alt="weknow" />
      </div>
      <nav class="menu">
        <ul>
          <li>
            <a href="/"> Home </a>
          </li>
          <li v-if="sessionUser">
            <a href="#" @click="redirectToArticles()"> Meus Artigos </a>
          </li>
          <li v-if="sessionUser">
            <router-link :to="{ name: 'InsertArticle' }">
              Novo Artigo
            </router-link>
          </li>
          <div
            v-if="
              sessionUser != null &&
              (sessionUser.role === 1 || sessionUser.role === 2)
            "
          >
            <li v-for="link of sideBarMenuLinks" :key="link.home">
              <a :href="buildSideMenuLinkPath(link)" target="_self">
                {{ link.text }}
              </a>
            </li>
          </div>
          <div v-if="sessionUser">
            <li v-if="sessionUser.role === 1">
              <router-link :to="{ name: 'Categories' }">
                Adicionar Categoria
              </router-link>
            </li>
            <li v-if="sessionUser.role === 1">
              <router-link :to="{ name: 'Courses' }">
                Adicionar Curso
              </router-link>
            </li>
            <li v-if="sessionUser.role === 1">
              <router-link :to="{ name: 'Subjects' }">
                Adicionar Matéria
              </router-link>
            </li>
          </div>
          <li><a href="#">Ajuda</a></li>
          <hr />
          <li>
            <a href="/"> Últimos Artigos </a>
          </li>
          <li v-for="link of subjectLinks" :key="link.home">
            <a :href="buildSideMenuLinkPath(link)" target="_self">
              {{ link.text }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="filterBar" v-if="!hideBars">
      <div class="filters">
        <div class="field field1">
          <input
            type="text"
            placeholder="Buscar"
            v-model="currentSearchValue"
          />
        </div>

        <div class="field field2">
          <select v-model="currentCriteria">
            <option value="">Escolha um critério</option>
            <option
              v-for="criteria of searchCriterias"
              :key="criteria.value"
              v-bind:value="criteria.value"
            >
              {{ criteria.text }}
            </option>
          </select>
        </div>

        <div class="field field3">
          <button type="button" class="btn-filtrar" @click="searchInArticles()">
            FILTRAR
          </button>
        </div>
      </div>

      <div class="mx-5 my-2" v-if="!isAuthenticated">
          <button type="button" class="button is-info is-outlined" @click="logout">
            Fazer Login
          </button>
      </div>

      <div class="profile" v-if="isAuthenticated">
        <p>
          Seja bem-vindo(a), <span class="p-nome"> {{ fullName }} </span><br />
          <a href="#"> Editar Perfil </a> -
          <a @click="logout" href=""> Sair </a>
        </p>
      </div>
    </div>
    <router-view class="mainContent" />
  </div>
</template>


<script>
import Helpers from "./js/others/Helpers";
import SubjectServices from "./js/services/SubjectServices";
export default {
  created() {
    this.checkIfIsToHideBars();
    this.storeLoggedUser();
    this.getSubjects();
  },
  beforeUpdate() {
    this.storeLoggedUser();
    
    const params = this.$route.params;
    if (params.hideBars !== undefined) {
      this.hideBars = params.hideBars;
    }
  },
  data() {
    return {
      componentKey: 0,
      users: [],
      showModal: false,
      deleteUserId: -1,
      isAuthenticated: false,
      fullName: "",
      sessionUser: undefined,
      hideBars: false,
      searchCriterias: [
        { value: "subjects-subject-description", text: "Matéria" },
        { value: "categories-category-description", text: "Categoria" },
        { value: "users-author-name", text: "Autor" },
        { value: "title", text: "Tema" },
      ],
      currentCriteria: "",
      currentSearchValue: "",
      subjectLinks: [],
      sideBarMenuLinks: [
        {
          path: "Articles",
          value: 1,
          text: "Aprovado por mim",
          criteria: "author_status",
        },
        {
          path: "Articles",
          value: 0,
          text: "Aguardando Aprovação",
          criteria: "status_article",
        },
      ],
    };
  },
  methods: {
    checkIfIsToHideBars() {
      const pathname = location.pathname;
      console.log("pathname", pathname);
      this.hideBars =
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/recoverpassword";
    },
    storeLoggedUser() {
      let sessionUser = Helpers.getSessionUser();
      console.log('sessionUser', sessionUser);
      if (sessionUser !== null) {
        this.isAuthenticated = true;
        this.sessionUser = sessionUser;
        this.fullName = sessionUser.name;
      } else {
        this.isAuthenticated = false;
        this.sessionUser = undefined;
        this.fullName = "";
      }
    },
    logout() {
      localStorage.setItem('sessionUser', null);
      localStorage.setItem('token', null);
      location.href = 'login';
    },
    redirectToArticles() {
      location.href = `Articles?id=${this.sessionUser.id}`;
    },

    searchInArticles() {
      location.href = `/?value=${this.currentSearchValue}&criteria=${this.currentCriteria}`;
    },

    buildSideMenuLinkPath(link) {
      return `${link.path}?value=${
        link.value !== undefined ? link.value : link.text
      }&criteria=${link.criteria}`;
    },

    getSubjects() {
      SubjectServices.getSubjects()
        .then((response) => {
          this.subjectLinks = [];
          const subjects = response.data;
          subjects.forEach((sub) => {
            this.subjectLinks.push({
              path: "/",
              text: sub.description,
              criteria: "subjects-subject-description",
            });
          });
        })
        .catch(() => (this.subjectLinks = []));
    },
  },
  filters: {
    processRole: function (value) {
      if (value == 0) {
        return "Usuário Comum";
      } else if (value == 1) {
        return "Administrador";
      } else if (value == 2) {
        return "Professor(a)";
      }
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html,
body,
#app {
  min-height: 100%;
  height: 100%;
}

.menuDefault {
  width: 20%;
  min-height: 100%;
  background: #6d6d6d;
  float: left;
}

.logo {
  background: #ffdd57;
  height: 60px;
  padding: 5px;
}

.menu ul {
  list-style: inside;
  text-align: left;
  padding: 10px 25px 10px;
  margin: 0;
  color: #fff;
}

.menu ul li {
  margin: 10px 0;
}

.menu ul li a:link,
.menu ul li a:visited {
  color: #ffffff;
}

.menu ul li a:hover {
  text-decoration: underline;
}

.filterBar {
  width: 80%;
  background: #e6e6e6;
  float: left;
  height: 60px;
  display: flex;
}
.filters {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile {
  display: flex;
  width: 28%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.profile a:link {
  color: #2c3e50;
  text-decoration: underline;
  font-size: 12px;
}

label {
  font-weight: 600;
  font-size: 14px;
}

input,
select {
  padding: 10px;
  border: 1px solid #cccccc;
}

.field {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  margin: 5px;
}

.field1 {
  width: 50%;
}
.field2 {
  width: 20%;
}
.field3 {
  width: 15%;
}

.btn-filtrar {
  background: #ffdd57;
  padding: 11px;
  color: #000;
  border: none;
  margin-top: -5px;
}

.p-nome {
  font-weight: 600;
}

.mainContent {
  float: left;
  width: 80%;
}
</style>
