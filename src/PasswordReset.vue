<template>
  <div class="dikeyHizalama">
    <div class="container-fluid">
      <div class="row">
        <form
          class="card pl-0 pr-0 col-sm-12 col-md-4 offset-md-4 border-danger shadow-lg"
          @submit.prevent="onSubmit"
        >
          <div class="card-header shadow-lg m-3 bg-danger text-white pt-3">
            <label>Parola Sıfırlama Formu</label>
          </div>

          <div class="card-body mr-3">
            <div class="form-group row">
              <label class="col-md-3 text-left">E-posta:</label>
              <input
                v-model="user.email"
                type="email"
                class="form-control col-md-9 text-danger"
                placeholder="E-posta adresinizi giriniz"
              />
            </div>
            <div class="row">
              <button
                type="submit"
                class="btn btn-outline-danger col-sm-12 col-md-4 offset-md-4"
              >Parola Sıfırla</button>
            </div>
          </div>

          <div class="card-footer m-0 p-3">
            <div class="row">
              <router-link class="col-md-6 text-success" tag="a" to="/login">Zaten Üyeyim</router-link>
              <router-link class="col-md-6 text-primary" tag="a" to="/login">Yeni Üye Kaydı</router-link>
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
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("passwordReset", { ...this.user })
        .then((response) => {
          this.$router.push("/login");
        });
      // Store.js'deki parola sıfırlama fonksiyonunu tetikler. Başarı sağlanırsa kullanıcıyı oturum açma sayfasına yönlendirir.
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
    #530303,
    #f3f5f3,
    #0c0c0c,
    #f3f5f3,
    #530303,
    #0c0c0c
  );
}
</style>
