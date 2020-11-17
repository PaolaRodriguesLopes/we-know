<template>
    <article>
        <header>
            <h2 class="title"> 
                {{ headerTitle }} Artigo 
            </h2>
        </header>

        <div class="columns is-centered content-edit">
            <div class="column is-half box box-edit">

                <!-- response error -->
                <div v-if="error">
                    <div class="notification is-danger">
                        {{ error }}
                    </div>
                </div>

                <!-- title -->
                <label class="label-login" for="titleInput"> Título </label>
                <input type="text" id="titleInput" class="input" placeholder="Título" maxlength="100" v-model="title">

                <!-- description -->
                <label class="label-login" for="descriptionInput"> Descrição </label>
                <input type="text" id="descriptionInput" class="input" placeholder="Descrição" maxlength="250" v-model="description">

                <!-- text -->
                <label class="label-login" for="textTextArea"> Texto </label>
                <textarea id="textTextArea" cols="30" rows="10" class="input" placeholder="Texto" v-model="text"></textarea>

                <!-- category -->
                <label class="label-login" for="categorySelect"> Categoria </label>
                <select id="categorySelect" class="input" v-model="category">
                    <option value="0"> Escolha uma opção </option>
                    <option v-for="c in categories" :key="c.id" v-bind:value="c.id"> 
                        {{ c.description }} 
                    </option>
                </select>

                <!-- author -->
                <label class="label-login" for="authorSelect"> Author </label>
                <select id="authorSelect" class="input" v-model="author">
                    <option value="0"> Escolha uma opção </option>
                    <option v-for="user in users" :key="user.id" v-bind:value="user.id"> 
                        {{ user.name }} 
                    </option>
                </select>

                <!-- subject -->
                <label class="label-login" for="subjectInput"> Sujeito </label>
                <input type="text" id="subjectInput" class="input" placeholder="Sujeito" maxlength="10" v-model="subject">

                <hr>
                <div class="btns">
                    <router-link :to="{ name: 'Articles' }">
                        <button type="button" class="button is-outlined">
                            Voltar para Artigos
                        </button>
                    </router-link>

                    <button type="button" class="button is-success" @click="save();">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<script src="../js/ArticleInsertUpdate.js"></script>

<style scoped>
.title{
    background: #713a3a;
    color: #ffffff;
    padding: 10px;
    font-size: 20px;
    margin-bottom: 0 ;
}


.label-login{
    float: left;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 5px 0;
}

input{
    margin-bottom: 10px;
}

.btns{
    
    display: flex;
    justify-content: space-between;
}

.box-edit{
padding: 25px;
background: #dddddd;
margin-bottom: 0;
}

.box-edit hr{
    background-color:#cccccc;
    border: none;
    display: block;
    height: 2px;
   
}

.foto-perfil{
    background:#375269;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0 !important;
    
}

.content-edit{
    margin-top: 60px;
}

</style>