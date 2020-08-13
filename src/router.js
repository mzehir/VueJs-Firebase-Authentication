import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

import Register from "./Register";
import Login from "./Login";
import PasswordReset from "./PasswordReset"
import Home from "./Home";

export const router = new VueRouter({
    // mode: "history",
    routes: [
        { path: "*", redirect: '/login' },
        { path: "/", redirect: '/login' },

        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/passwordreset", component: PasswordReset },
        {
            path: "/home",
            component: Home,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/login")
                }
                // Kullanıcı oturum açmamış ise sadece login sayfasını görüntülemesini sağlar.
            }
        },
    ],
})
