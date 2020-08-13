<template>
  <div class="container-fluid">
    <div class="row text-center mt-3">
      <div class="col-sm-3 mt-2 animated flipInX">
        <div class="card shadow-lg">
          <div class="card-body">
            <h5 class="card-title">
              <ins>Kullanıcı Bilgisi:</ins>
            </h5>
            <h3 class="card-text badge badge-primary">{{activeUserEmail}}</h3>
            <br />
            <button
              data-toggle="modal"
              data-target="#myModal"
              class="btn btn-secondary btn-sm"
            >Parola Değiştir</button>
          </div>
        </div>
      </div>

      <div class="col-sm-6 mt-2 animated flipInX">
        <div class="card">
          <div class="card-body text-left">
            <h5 class="card-title text-center">VueJs - Firebase Authentication</h5>
            <p>Bu projede VueJs ile beraber firebase authentication işlemleri yapılmıştır.</p>
            <p>
              Bu işlemler sırasında
              <strong>vuex, axios, vue-router ve firebase kullanılmıştır.</strong>
            </p>
            <p>
              Projenin github linkine
              <a
                href="https://github.com/mzehir/VueJs-Firebase-Authentication"
              >
                <strong>buradan</strong>
              </a> ulaşabilir ve aşağıdaki fotoğraf galerisinden proje içeriğini inceleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <div class="col-sm-3 mt-2 animated flipInX">
        <div class="card shadow-lg">
          <div class="card-body">
            <h5 class="card-title">
              Kalan Oturum Süresi:
              <span
                class="badge p-2 rounded-circle"
                :class="activeUserTime < 15 ? 'bg-danger' : 'bg-success'"
              >{{activeUserTime}}</span>
            </h5>
            <button @click.prevent="deleteUser" class="btn btn-secondary btn-sm mb-2">Hesabı Sil</button>
            <br />
            <a @click.prevent="logOut" class="btn btn-outline-danger">Oturumu Kapat</a>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-12 text-center">Burası henüz kullanıma hazır değildir.</div>
    </div>

    <div class="modals">
      <!-- The Modal -->
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header alert alert-success text-dark">
              <h4 class="modal-title">Değiştirilebilir Kullanıcı Bilgileri</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body text-center">
              <label class="text-center">
                <strong>
                  <ins>Yeni Parola</ins>
                </strong>
              </label>
              <input
                v-model="user.newPassword"
                type="email"
                class="form-control text-primary"
                placeholder="Yeni parola giriniz."
              />
              <button @click="passwordRefnesh" class="btn btn-success mt-3">Onayla</button>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Kapat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch("logout");
      // Store.js'deki oturum kapatma fonksiyonunu tetikler.
    },
    passwordRefnesh() {
      this.$store
        .dispatch("passwordRefnesh", { ...this.user })
        .then((response) => {
          alert("Yeni şifreniz başarıyla oluşturuldu.");
        });
      // Store.js'deki parola yenileme fonksiyonunu tetikler. Başarı sağlanırsa kullanıcıya bildirir.
    },
    deleteUser() {
      if (confirm("Onaylarsanız hesabınız silinecektir.")) {
        this.$store.dispatch("deleteUser");
      }
      // Store.js'deki kullanıcı hesabını silme fonksiyonunu tetikler.
    },
  },
  computed: {
    activeUserEmail() {
      return this.$store.state.activeUser;
      // Oturum açan kullanıcının email adresini getirir.
    },
    activeUserTime() {
      return (this.counter = this.$store.state.remainingTime);
      // Oturum açan kullanıcının süre sınırını getirir.
    },
  },
  data() {
    return {
      user: {
        newPassword: "",
      },
      projectLink: "https://github.com/mzehir/VueJs-Firebase-Authentication",
    };
  },
};
</script>

<style scoped>
</style>
