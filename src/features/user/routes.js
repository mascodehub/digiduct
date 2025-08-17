import UserDashboard from './views/UserDashboard.vue';

export default [
  {
    path: '/',
    name: 'user-dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
];