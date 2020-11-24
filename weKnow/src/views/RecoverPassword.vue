<template>
  <div class="default">
    <div id="box-login" class="box-login">
      <h3><img src="../assets/WeKnow.png" alt="We Know" /></h3>

      <div v-if="status != 200">
        <small class="aviso">Preencha seu email para receber o TOKEN.</small>

        <label class="label-login">E-mail</label>
        <input
          type="email"
          placeholder="email@email.com"
          class="input"
          v-model="email"
        />

        <button class="button is-primary" @click="recover">
          RECUPERAR SENHA
        </button>
      </div>

      <div v-if="status == 200">
        <small class="aviso-sucesso"
          >Token foi enviado. Confira seu email!</small
        >

        <label class="label-login">Token</label>
        <input
          type="token"
          placeholder="Cole o Token que você recebeu no seu email aqui"
          class="input"
          v-model="token"
        />

        <label class="label-login">Nova Senha</label>
        <input
          type="password"
          placeholder="Nova Senha"
          class="input"
          v-model="password"
        />

        <button class="button is-info" @click="saveNewPassword">SALVAR</button>
      </div>

      <div v-if="error">
        <div class="notification is-danger">
          {{ mensagem }}
        </div>
      </div>

      <router-link :to="{ name: 'Login' }"
        ><p class="forgotKey"><a>Voltar</a></p></router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      error: false,
      status: "",
      token: "",
      password: "",
      mensagem: "",
    };
  },
  methods: {
    recover() {
      axios
        .post("http://localhost:8686/recoverpassword", {
          email: this.email,
        })
        .then((res) => {
          this.status = res.status;
          this.error = false;
          document.getElementById("box-login").style.height = "500px";
        })
        .catch((err) => {
          console.log(err);
          this.error = true;
          this.mensagem = " Email inválido!";
          document.getElementById("box-login").style.height = "500px";
        });
    },

    saveNewPassword() {
      axios
        .post("http://localhost:8686/changepassword", {
          email: this.email,
          password: this.password,
          token: this.token,
        })
        .then((res) => {
          this.status = res.status;
          document.getElementById("box-login").style.height = "500px";
          this.error = false;
          alert("Senha atualizada com sucesso!");
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);

          this.error = true;
          this.mensagem = "Token inválido!";
        });
    },
  },
};
</script>

<style scoped>
body {
  background: #ccc8c8 !important;
}

.default {
  background: #ccc8c8;
  min-height: 100%;
  width: 100%;
  display: flex;
}
.box-login {
  background: #ffffff;
  border: 1px solid #ccc;
  margin: auto;
  width: 500px;
  height: 370px;
  padding: 20px 50px;
  box-shadow: 3px 1px 13px 7px #ada8a8;
}

.label-login {
  float: left;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 15px 0 5px 0;
}

button {
  font-weight: 600;
  margin: 25px 15px;
  width: 40%;
}

.forgotKey a:link,
.forgotKey a:visited {
  color: #999999;
  text-decoration: underline;
}

.aviso {
  background: #fffc50;
  border-radius: 10px;
  width: 100%;
  float: left;
  margin: 12px 0;
  padding: 12px;
  border: 1px solid #f7e2e2;
  font-weight: 600;
  color: #707070;
}

.aviso-sucesso {
  background: #0cc75a;
  border-radius: 10px;
  width: 100%;
  float: left;
  margin: 12px 0;
  padding: 12px;
  border: 1px solid #f7e2e2;
  font-weight: 600;
  color: #ffffff;
}
</style>