<template>
  <div class="dikeyHizalama">
    <div class="container-fluid">
      <div class="row">
        <form
          class="card pl-0 pr-0 col-xs-12 col-sm-12 col-md-4 offset-md-4 border-primary shadow-lg animated zoomIn"
          @submit.prevent="onSubmit"
        >
          <div class="card-header shadow-lg m-3 bg-primary text-white pt-3 animated backInDown">
            <label>Üye Kayıt Formu</label>
          </div>

          <div class="card-body mr-3">
            <div class="form-group row animated backInLeft">
              <label class="col-md-3 text-left">E-posta:</label>
              <input
                v-model="user.email"
                type="email"
                class="form-control col-md-9 text-primary"
                placeholder="E-posta adresinizi giriniz"
              />
            </div>
            <div class="form-group row animated backInLeft">
              <label class="col-md-3 text-left">Şifre:</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control col-md-9 text-primary"
                placeholder="Yeni bir şifre giriniz."
              />
            </div>
            <div class="row">
              <button
                type="submit"
                class="btn btn-outline-primary col-sm-12 col-md-4 offset-md-4 animated flash"
              >Kayıt Ol</button>
            </div>
          </div>

          <div class="card-footer m-0 p-3">
            <div class="row">
              <router-link
                class="col-md-6 text-success animated heartBeat"
                tag="a"
                to="/login"
              >Zaten Üyeyim</router-link>
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
      this.$store.dispatch("signUp", { ...this.user }).then((response) => {
        alert("Üye kaydı oluşturulmuştur.");
        this.$router.push("/login");
      });
      // Store.js'deki kullancı kaydı fonksiyonuna kullanıcı bilgilerini gönderir ve fonksiyonu tetikler. Daha sonra kullanıcıyı oturum açma sayfasına yönlendirir.
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
    #05022b,
    #f3f5f3,
    #0c0c0c,
    #f3f5f3,
    #05022b,
    #0c0c0c
  );
}
</style>
