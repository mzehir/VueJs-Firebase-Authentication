<template>
  <div class="dikeyHizalama">
    <div class="container-fluid">
      <div class="row">
        <form
          class="card pl-0 pr-0 col-sm-12 col-md-4 offset-md-4 border-success shadow-lg animated zoomIn"
          @submit.prevent="onSubmit"
        >
          <div class="card-header shadow-lg m-3 bg-success text-white pt-3 animated backInDown">
            <label>Oturum Açma Formu</label>
          </div>

          <div class="card-body mr-3">
            <div class="form-group row animated backInLeft">
              <label class="col-md-3 text-left">E-posta:</label>
              <input
                v-model="user.email"
                type="email"
                class="form-control col-md-9 text-success"
                placeholder="E-posta adresinizi giriniz"
              />
            </div>
            <div class="form-group row animated backInRight">
              <label class="col-md-3 text-left">Şifre:</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control col-md-9 text-success"
                placeholder="Şifrenizi giriniz."
              />
            </div>
            <div class="row">
              <button
                type="submit"
                class="btn btn-outline-success col-sm-12 col-md-4 offset-md-4 animated flash"
              >Oturum Aç</button>
            </div>
          </div>

          <div class="card-footer m-0 p-3">
            <div class="row">
              <router-link
                class="col-md-6 text-primary animated heartBeat"
                tag="a"
                to="/register"
              >Yeni Üye Kaydı</router-link>
              <router-link
                class="col-md-6 text-danger animated heartBeat"
                tag="a"
                to="/passwordreset"
              >Parolamı Unuttum</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("login", { ...this.user }).then((response) => {
        this.$router.push("/home");
      });
      // Store.js'deki oturum açma fonksiyonuna girilen değerleri gönderir ve fonksiyonu tetikler.
    },
  },
};
</script>

<style scoped>
.dikeyHizalama {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    to right,
    #0c0c0c,
    #032c09,
    #f3f5f3,
    #0c0c0c,
    #f3f5f3,
    #032c09,
    #0c0c0c
  );
}
</style>
