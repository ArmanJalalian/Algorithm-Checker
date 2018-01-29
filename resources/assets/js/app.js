import Vue from 'vue';
import router from './routes';
import VueRouter from 'vue-router';
import FBSignInButton from 'vue-facebook-signin-button';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * All components the prototype needs to run.
 */

Vue.use(VueRouter);
Vue.use(FBSignInButton);

/**
 * Facebook login.
 */
window.fbAsyncInit = function () {
    FB.init({
        appId: 149315649017860,
        cookie: true,
        xfml: true,
        version: 'v2.10'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('navbar', require('./components/Navbar.vue'));

const app = new Vue({
    el: '#app',
    data: {
        userName: "",
        tagsArray: []
    },
    mounted() {

    },
    router
});
