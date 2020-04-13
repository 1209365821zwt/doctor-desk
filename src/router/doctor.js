export default [{
        path: '/home/search',
        name: 'Search',
        component: () => import('../views/search/index.vue'),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/doctor/resume',
        name: 'DoctorResume',
        component: () => import('../views/doctor/resume'),
        meta: {
            title: '医生简历'
        }
    },
    {
        path: '/doctor/morerecords',
        name: 'MoreRecords',
        component: () => import('../views/doctor/Morerecords/index'),
        meta: {
            title: '更多记录'
        }
    },
    {
        path: '/doctor/visitrecord',
        name: 'VisitRecord',
        component: () => import('../views/doctor/Visitrecord/index'),
        meta: {
            title: '拜访记录'
        }
    },
    {
        path: '/doctor/adddoctor',
        name: 'AddDoctor',
        component: () => import('../views/doctor/addDoctor'),
        meta: {
            title: '新增医生'
        }
    },
    {
        path: '/doctor/visitRegister',
        name: 'VisitRegister',
        component: () => import('../views/doctor/visitRegister'),
        meta: {
            title: '拜访登记'
        }
    },
    {
        path: '/doctor/sign',
        name: 'DoctorSign',
        component: () => import('../views/tags'),
        meta: {
            title: '设置标签'
        }
    },
    {
        path:'/doctor/idea',
        name:'DoctorIdea',
        component:()=>import('../views/doctor/Idea'),
        meta:{
            title:'医生观念'
        }
    }
]