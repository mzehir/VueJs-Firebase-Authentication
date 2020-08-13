import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { router } from "./router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: "",
        apiKey: "AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
        activeUser: "",
        time: 150,
        remainingTime: null,
        localStorageIntegerRemainingTime: null,
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== "";
            //True yada false değeri döner. Bu dönüt bağlamında kullanıcıya gezebileceği sayfa izinleri verilir.
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            // Oturum açan kullanıcının firebase id'sini token değişkenine aktarır.
        },
        clearToken(state) {
            state.token = ""
            // Oturum kapatan kullancının firebase id'sini token değişkeninden siler.
        },
        setActiveUser(state, activeUserEmail) {
            state.activeUser = activeUserEmail
            // Oturum açan kullanıcının email adresini activeUserEmail değişkenine aktarır.
        },
    },
    actions: {
        initAuth({ dispatch, commit }) {
            let activeUser = localStorage.getItem("activeUserEmail")
            let token = localStorage.getItem("token");
            if (token) {
                commit("setToken", token);
                commit("setActiveUser", activeUser);
                dispatch("localStorageIntegerRemainingTime");
                router.push("/home")
            } else {
                router.push("/login").catch(() => { });

            }
            //Bu fonksiyon ile sayfa yenilenmelerinde otomatik oturum kapatmaların önüne geçilir.
        },

        signUp({ commit }, data) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        email: data.email,
                        password: data.password,
                        returnSecureToken: true,
                    }
                )
                .then((response) => {
                    commit("setToken", response.data.idToken);
                })
            // Bu fonksiyon ile yeni kullanıcı kaydı oluşturulur.
        },

        login({ commit, dispatch, state }, data) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        email: data.email,
                        password: data.password,
                        returnSecureToken: true,
                    }
                )
                .then((response) => {
                    commit("setActiveUser", response.data.email);
                    localStorage.setItem("activeUserEmail", response.data.email);
                    commit("setToken", response.data.idToken);
                    localStorage.setItem("token", response.data.idToken);
                    localStorage.setItem("remainingTime", state.time);
                    state.remainingTime = state.time;
                    dispatch("userTimeOut");
                });
            // Bu fonksiyon ile kullanıcı oturum açar.
        },

        logout({ commit, state }) {
            commit("clearToken");
            localStorage.removeItem("token");

            state.remainingTime = 1
            router.push("/login").catch(() => { });
            // Bu fonksiyon ile kullanıcı oturumu kapatılır.
        },

        passwordReset({ commit, dispatch, state }, data) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        email: data.email,
                        requestType: "PASSWORD_RESET"
                    }
                ).then((response) => {
                    router.push("/login");
                })
            // Bu fonksiyon ile unutulan parola sıfırlanır.(Gerçek email kayıtları)
        },

        passwordRefnesh({ state }, data) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        password: data.newPassword,
                        idToken: state.token,
                        returnSecureToken: true,
                    }
                ).then((response) => {
                })
            // Oturum açan kullanıcının şifre değiştirmesini sağlar.
        },

        deleteUser({ dispatch, state }) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        idToken: state.token
                    }
                ).then((response) => {
                    dispatch("logout")
                })
            // Oturum açan kullanıcının hesabı firebase'den silinir.
        },

        userTimeOut({ dispatch, state }) {
            var setInterval1 = setInterval(() => {

                state.remainingTime -= 1;
                localStorage.setItem("remainingTime", state.remainingTime);
                if (state.remainingTime === 0) {
                    clearInterval(setInterval1);
                    dispatch("logout")
                }
            }, 1000);
            // Açılan oturuma süre sınırlaması getirilir.
        },

        localStorageIntegerRemainingTime({ state, dispatch }) {
            var timeStr = localStorage.getItem("remainingTime");
            state.localStorageIntegerRemainingTime = +timeStr;
            state.remainingTime = state.localStorageIntegerRemainingTime;
            dispatch("userTimeOut");
            // Sayfa yenilenmesinden sonra süre sınırlandırılmasının kaldığı yerden devam etmesi noktasına işlem yapar.
        }
    },
})
export default store