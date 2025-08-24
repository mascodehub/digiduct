import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from '../features/user/routes.js';
import adminRoutes from '../features/admin/routes.js';
import { verifyToken } from '@/features/admin/services/auth.js';

const allRoutes = [...userRoutes, ...adminRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes: allRoutes,
});

router.beforeEach(async (to, from, next) => {
    
    if (to.path.startsWith("/admin")) {

        const isAdmin = localStorage.getItem("digitoken") != null;

        if (!isAdmin && to.path !== "/admin/login") {
            await verifyToken();
            return next("/admin/login");
        }

        if (isAdmin && to.path === "/admin/login") {
            await verifyToken();
            return next("/admin");
        }
    }

    return next();
});

export default router;
