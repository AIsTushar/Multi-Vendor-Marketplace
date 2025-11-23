import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { ChatRoutes } from "../modules/chat/chat.Routes";
import { SellerShopRoutes } from "../modules/sellershop/sellerShop.route";
import { CategoryRoutes } from "../modules/category/category.route";

const router = Router();
const routes = [
  {
    path: "/user",
    component: userRoutes,
  },
  {
    path: "/auth",
    component: authRoutes,
  },
  {
    path: "/chats",
    component: ChatRoutes,
  },
  {
    path: "/seller-shop",
    component: SellerShopRoutes,
  },
  {
    path: "/categories",
    component: CategoryRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.component));
export default router;
