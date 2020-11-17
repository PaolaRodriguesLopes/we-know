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

                <router-link :to="{ name: 'Articles' }">
                    <button type="button" class="button is-outlined">
                        Voltar para Artigos
                    </button>
                </router-link>
            </div>
        </div>
    </article>
</template>

<script src="../js/ArticleDetails.js"></script>