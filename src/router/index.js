import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Course from '../components/Course.vue'
import Search from '../components/Search.vue'

Vue.use(VueRouter)

const routes = [
  // 默认首页
  {
    path: '/',
    redirect: '/index',
  },
  // 密码登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '密码登录'
    }
  },
  // 验证码登录
  {
    path: '/set-pass',
    name: 'set-pass',
    component: () => import('../views/login/set-pass.vue'),
    meta: {
      title: '验证码登录'
    }
  },
  // 设置密码
  {
    path: '/sms-login',
    name: 'sms-login',
    component: () => import('../views/login/sms-login.vue'),
    meta: {
      title: '设置密码'
    }
  },
  // 修改个人信息
  {
    path: '/set-info',
    name: 'set-info',
    component: () => import('../components/set-info.vue'),
    meta: {
      title: '修改个人信息'
    }
  },
  // 设置信息
  {
    path: '/set-message',
    name: 'set-message',
    component: () => import('../views/login/set-message.vue'),
    meta: {
      title: '设置信息'
    }
  },
  // 每时每课
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
      title: '每时每课',
      active: 0,
    },
  },
  // 课程
  {
    path: '/course',
    name: 'course',
    component: () => import('../components/Course.vue'),
    meta: {
      title: '特色课',
      active: 1,
    }
  },
  // 会员课程
  {
    path: '/huiyuan',
    name: 'huiyuan',
    component: () => import('../components/huiyuan.vue'),
    meta: {
      title: '每时每课'
    }
  },
  // 会员课程
  {
    path: '/yueke',
    name: 'yueke',
    component: () => import('../components/yueke.vue'),
    meta: {
      title: '会员课程'
    }
  },
  // 约课记录
  {
    path: '/record',
    name: 'record',
    component: () => import('../views/record.vue'),
    meta: {
      title: '约课记录',
      active: 2,
    }
  },
  // 练习
  {
    path: '/practise',
    name: 'practise',
    component: () => import('../views/practise.vue'),
    meta: {
      title: '练习',
      active: 3,
    }
  },
  // 我的
  {
    path: '/person',
    name: 'Per',
    component: () => import('../views/Per.vue'),
    meta: {
      title: '个人中心',
      active: 4,
    },
    beforeEnter: (to, from, next) => {
      let zqd_token = localStorage.getItem('token')
      if (zqd_token) {
        next()
      } else {
        next('/login')
      }
    }

  },
  // 我的
  {
    path: '/Course',
    name: 'Course',
    component: Course,
    meta: {
      title: '特色课'
    }
  },
  // 课程详情
  {
    path: '/Course-detail',
    name: 'Course-detail',
    component: () => import('../components/Course-detail.vue'),
    meta: {
      title: '课程详情'
    }

  },
  // 学习详情
  {
    path: '/study-detail',
    name: 'study-detail',
    component: () => import('../components/study-detail.vue'),
    meta: {
      title: '学习详情'
    }

  },
  // 搜索页面
  {
    path: '/Search',
    name: 'Search',
    component: Search,
    meta: {
      title: '搜索'
    }
  },
  // 个人信息
  {
    path: '/info',
    name: 'info',
    component: () => import('../components/info.vue'),
    meta: {
      title: '个人信息'
    }

  },
  // 我的学习
  {
    path: '/my-study',
    name: 'my-study',
    component: () => import('../components/my-study.vue'),
    meta: {
      title: '我的学习'
    }

  },
  // 学习币
  {
    path: '/my-currency',
    name: 'my-currency',
    component: () => import('../components/my-currency.vue'),
    meta: {
      title: '我的余额'
    }

  },
  // 关注的老师
  {
    path: '/concern',
    name: 'concern',
    component: () => import('../components/concern.vue'),
    meta: {
      title: '我的关注'
    }

  },
  // 收藏的东西
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../components/collect.vue'),
    meta: {
      title: '我的收藏'
    }

  },
  // 课程订单
  {
    path: '/order',
    name: 'order',
    component: () => import('../components/order.vue'),
    meta: {
      title: '订单'
    }

  },
  // 优惠券
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('../components/coupon.vue'),
    meta: {
      title: '优惠券'
    }

  },
  // 学习卡
  {
    path: '/card',
    name: 'card',
    component: () => import('../components/card.vue'),
    meta: {
      title: '学习卡'
    }

  },
  // 会员
  {
    path: '/vip',
    name: 'vip',
    component: () => import('../components/vip.vue'),
    meta: {
      title: '会员'
    }

  },
  // 信息
  {
    path: '/message',
    name: 'message',
    component: () => import('../components/message.vue'),
    meta: {
      title: '信息中心'
    }

  },
  // 信息通知详情
  {
    path: '/message-detail',
    name: 'message-detail',
    component: () => import('../components/message-detail.vue'),
    meta: {
      title: '信息'
    }

  },
  // 意见反馈
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../components/feedback.vue'),
    meta: {
      title: '意见反馈'
    }

  },
  // 设置
  {
    path: '/options',
    name: 'options',
    component: () => import('../components/options.vue'),
    meta: {
      title: '设置'
    }

  },
  //学习日历
  {
    path: '/study-calendar',
    name: 'study-calendar',
    component: () => import('../views/study-calendar.vue'),
    meta: {
      title: '学习日历'
    }
  },
  //讲师详情
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('../views/Teacher.vue'),
    meta: {
      title: '讲师详情'
    }
  },
  //测评记录
  {
    path: '/assess',
    name: 'assess',
    component: () => import('../views/assess.vue'),
    meta: {
      title: '测评记录'
    }
  },
  //习题收藏
  {
    path: '/ques-collect',
    name: 'ques-collect',
    component: () => import('../views/ques-collect.vue'),
    meta: {
      title: '习题收藏'
    }
  },
  //习题详情
  {
    path: '/ques',
    name: 'ques',
    component: () => import('../views/ques.vue'),
    meta: {
      title: '做题'
    }
  },

  //一对一辅导
  {
    path: '/oto',
    name: 'oto',
    component: () => import('../views/oto.vue'),
    meta: {
      title: '一对一辅导'
    }
  },
  // 预约课程
  {
    path: '/oto-plan',
    name: 'oto-plan',
    component: () => import('../views/oto-plan.vue'),
    meta: {
      title: '预约课程'
    }
  },
  {
    //题库选择
    path: '/point',
    name: 'point',
    component: () => import('../views/point.vue'),
    meta: {
      title: '考点练习'
    }
  },
  {
    //套卷练习
    path: '/paper-package',
    name: 'paper-package',
    component: () => import('../views/paper-package.vue'),
    meta: {
      title: '套卷练习'
    }
  },
  // 找回密码
  {
    path: '/forget-pass',
    name: 'forget-pass',
    component: () => import('../views/login/forget-pass.vue'),
    meta: {
      title: '找回密码'
    }
  },
  // 设置密码
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/login/new.vue'),
    meta: {
      title: "设置密码"
    }
  },
  // 学习卡兑换
  {
    path: '/exchange',
    name: 'exchange',
    component: () => import('../components/exchange.vue'),
    meta: {
      title: '学习卡兑换'
    }
  },


  {
    //仿真练习
    path: '/exam',
    name: 'exam',
    component: () => import('../views/exam.vue'),
    meta: {
      title: '仿真练习'
    }
  },
  {
    //错题练习
    path: '/error-ques',
    name: 'error-ques',
    component: () => import('../views/error-ques.vue'),
    meta: {
      title: '错题练习'
    }
  },
  {
    //
    path: '/error-list',
    name: 'error-list',
    component: () => import('../views/error-list.vue'),
    meta: {
      title: '错题练习'
    }
  },



]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})

export default router