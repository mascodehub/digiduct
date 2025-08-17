import Layout from './components/Layout.vue';
import AdminCategory from './views/AdminCategory.vue';
import AdminDashboard from './views/AdminDashboard.vue';
import AdminLogin from './views/AdminLogin.vue';
import AdminPackage from './views/AdminPackage.vue';
import AdminProduct from './views/AdminProduct.vue';

export default [
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin,
    meta: { requiresAuth: false, requiresAdmin: false }
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: Layout,
    children: [
      { path: "", component: AdminDashboard },
      { path: "category", component: AdminCategory },
      { path: "product", component: AdminProduct },
      { path: "product-package", component: AdminPackage },
    ],
    meta: { requiresAuth: true, requiresAdmin: true }
  },
];