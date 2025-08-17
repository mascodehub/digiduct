import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from '../features/user/routes.js';
import adminRoutes from '../features/admin/routes.js';

const allRoutes = [...userRoutes, ...adminRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes: allRoutes,
});

router.beforeEach((to, from, next) => {
    const isAdmin = localStorage.getItem("digitoken") != null;
    
    if (to.path.startsWith("/admin")) {
        if (!isAdmin && to.path !== "/admin/login") {
            return next("/admin/login");
        }

        if (isAdmin && to.path === "/admin/login") {
            return next("/admin");
        }
    }

    return next();
});

export default router;
