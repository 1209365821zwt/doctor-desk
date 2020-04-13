export default [{
    path: '/my/recruit',
    name: 'Recruit',
    component: () => import('../views/my/recruit/index.vue'),
    meta: {
      title: '我的招募'
    }
  },
  {
    path: '/my/points',
    name: 'Points',
    component: () => import('../views/my/Points'),
    meta: {
      title: '我的积分'
    }
  },
  {
    path: '/poinits/subsidiary',
    name: 'Subsidiary',
    component: () => import('../views/my/Subsidiary'),
    meta: {
      title: '积分明细'
    }
  },
  {
    path: '/poinits/changerecord',
    name: 'Changerecord',
    component: () => import('../views/my/Changerecord'),
    meta: {
      title: '兑换记录'
    }
  },
  {
    path: '/poinits/pointsrule',
    name: 'Pointsrule',
    component: () => import('../views/my/Pointsrule'),
    meta: {
      title: '积分规则'
    }
  },
  {
    path: '/poinits/detail',
    name: 'Detail',
    component: () => import('../views/my/Detail'),
    meta: {
      title: '兑换详情'
    }
  },
  {
    path: '/my/follow',
    name: 'Follow',
    component: () => import('../views/my/follow'),
    meta: {
      title: '兑换详情'
    }
  }
]