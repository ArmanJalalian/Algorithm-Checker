import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./components/Start')
    },
    {
        path: '/name',
        component: require('./components/Name')
    },
    {
        path: '/facebook',
        component: require('./components/Facebook')
    },
    {
        path: '/timeline',
        component: require('./components/Timeline')
    },
    {
        path: '/test',
        component: require('./components/Test')
    },
    {
        path: '/privacypolicy',
        component: require('./components/PrivacyPolicy')
    }
];

export default new VueRouter({
    routes
});