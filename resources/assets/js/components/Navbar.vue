<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="#" class="navbar-brand">{{ title }}</a>
            </div>
            <ul class="nav navbar-nav" v-if="timeline == true">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                       aria-haspopup="true" aria-expanded="false">Menu <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><router-link to="/facebook"><a href="#">Kies opnieuw</a></router-link></li>
                    </ul>
                </li>
            </ul>
            <div class="navbar-right">
                <p class="p navbar-brand">{{ left_title }}</p>
                <p v-if="this.$parent.userName" class="p navbar-brand">{{this.$parent.userName}}</p>
            </div>
        </div>
    </nav>
</template>

<script>

    export default {
        data() {
            return {
                title: 'Algorithm Checker',
                left_title: '',
                timeline: false,
            }
        },
        mounted() {
            this.left_title = "start";
        },
        methods: {
            /**
             * Logout from Facebook
             */
            fbLogout: function () {
                FB.logout(function (reponse) {
                    alert("Je bent nu ook weer uitgelogt van Facebook");
                });
            }
        },
        watch: {
            // Decide wich page you are on and set the correct title
            '$route' () {
                switch (this.$route.path) {
                    case '/':
                        this.left_title = 'Start';
                        break;
                    case '/name':
                        this.left_title = 'Name';
                        break;
                    case '/facebook':
                        this.left_title = 'Facebook';
                        break;
                    case '/timeline':
                        this.left_title = 'Timeline';
                        this.timeline = true;
                        break;
                    case '/privacypolicy':
                        this.left_title = 'Privacy Policy';
                        break;
                    default:
                        break;
                }
            }
        }
    }

</script>

<style>

    .p {
        margin: 0 0 0px;
    }

    body {
        padding-top: 70px;
    }

</style>