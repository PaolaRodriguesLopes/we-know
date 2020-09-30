<template>
  <div id="app">
    <div class="menuDefault">
      <div class="logo"><img src="./assets/WeKnow.png" border=0 alt="weknow"></div>
      <nav class="menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Meus Artigos</a></li>
          <li><a href="#">Novo Arigo</a></li>
          <li><a href="#">Ajuda</a></li>
          <hr>
          <li><a href="#">Últimos Artigos</a></li>
          <li><a href="#">Engenharia Computação</a></li>
          <li><a href="#">Engenharia Elétrica</a></li>
          <li><a href="#">Engenharia Produção</a></li>
          <li><a href="#">IoT</a></li>
          <li><a href="#">Física</a></li>
        </ul>
      </nav>
    </div>
    <div class="filterBar">
      <div class="filters">
          <div class="field field1">
            
            <input type="text" placeholder="Buscar">
          </div>

          <div class="field field2">
           
            <select name="" id="">
              <option value="">All</option>
            </select>            
          </div>

          <div class="field field3">
            <button class="btn-filtrar">FILTRAR</button>
          </div>
      </div>

      <div class="profile">
        <p>Seja bem-vindo, <span class="p-nome">Fernando</span><br>
        <a href="#">Editar Perfil</a> - <a href="#">Sair</a>        
        </p>
      </div>

    </div>
<router-view class="mainContent"/>

    
  </div>
</template>

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

html, body, #app{
  min-height: 100%;
  height: 100%;
}

.menuDefault{
  width: 20%;
  min-height: 100%;
  background: #6D6D6D;
  float: left;
}

.logo{
  background: #ffdd57;
    height: 60px;
    padding: 5px;
}

.menu ul{
    list-style: inside;
    text-align: left;
    padding: 10px 25px 10px;
    margin: 0;
    color: #fff;
}

.menu ul li{
  margin: 10px 0;
}

.menu ul li a:link, .menu ul li a:visited{
  color: #ffffff;
}

.menu ul li a:hover{
  text-decoration: underline;
}

.filterBar{
    width: 80%;
    background: #E6E6E6;
    float: left;
    height: 60px;
    display: flex;
}
.filters{
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile{
  display: flex;
  width: 28%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.profile a:link{
  color: #2c3e50;
  text-decoration: underline;
  font-size: 12px;
}

label{
  font-weight: 600;
  font-size: 14px;
}

input, select{
  padding: 10px;
  border: 1px solid #cccccc;
}


.field{
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  margin: 5px;
 
}

.field1{
  width: 50%;
  
}
.field2{
  width: 20%;
  
}
.field3{
  width: 15%;
}

.btn-filtrar{
    background: #ffdd57;
    padding: 11px;
    color: #000;
    border: none;
    margin-top:-5px;  
}

.p-nome{
  font-weight: 600;
}


.mainContent{
  float: left;
  width: 80%;
}
</style>
