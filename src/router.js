import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

Vue.use(VueRouter);


import Login from "./Login";
import Register from "./Register";
import PasswordReset from "./PasswordReset"
import Home from "./Home";

export const router = new VueRouter({
    routes: [
        { path: "*", redirect: '/login' },
        { path: "/", redirect: '/login' },
        { path: "/login", name: "login", component: Login },

        { path: "/register", name: "register", component: Register },
        { path: "/passwordreset", name: "passwordreset", component: PasswordReset },

        {
            path: "/home",
            name: "home",
            component: Home,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/login")
                }
                // Kullanıcı oturum açmamış ise sadece login sayfasını görüntülemesii sağlar.
            }
        },
    ],
    mode: "history",
})
