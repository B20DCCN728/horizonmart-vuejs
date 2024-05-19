// Created by B20DCCN728

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "admin",
        component: () => import("../views/admin/Admin.vue"),
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("../views/admin/pages/Dashboard.vue"),
            },
            {
                path: "product",
                name: "product",
                component: () => import("../views/admin/pages/catalogs/Product.vue"),
            },
            {
                path: "category",
                name: "category",
                component: () => import("../views/admin/pages/catalogs/Category.vue"),
            }
        ]
    },
    {
        path: "/home",
        name: " home",
        component: () => import("../views/customer/Home.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "Not Found", 
        component: () => import("../views/NotFound.vue"),
    }
];

const router = createRouter({   
    history: createWebHistory(),
    routes,
});

export default router;

