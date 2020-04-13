export default [{
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/auth/login'),
    meta: {
        title: '登录'
    }
}]