import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home/home.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("dashboard", "routes/dashboard/dashboard.tsx"),
    route("product/:productId", "routes/product/product.tsx"),
    route("addproduct", "routes/addProduct/addProduct.tsx"),
    route("admin", "routes/admin/admin.tsx"),
] satisfies RouteConfig;
