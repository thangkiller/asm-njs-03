import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";
import Home from "../Home/Home";
import Chat from "../Chat/Chat";
import Users from "../Users/Users";
import Products from "../Products/Products";
import History from "../History/History";
import NewProduct from "../New/NewProduct";
import Login from "../Login/Login";

{
   /* <Route exact path='/' component={Home} />
<Route path='/chat' component={Chat} />
<Route path='/users' component={Users} />
<Route path='/products' component={Products} />
<Route path='/history' component={History} />
<Route path='/login' component={Login} />
<Route path='/new' component={NewProduct} /> */
}

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: "/chat",
            element: <Chat />,
         },
         {
            path: "/users",
            element: <Users />,
         },
         {
            path: "/products",
            element: <Products />,
         },
         {
            path: "/history",
            element: <History />,
         },
         {
            path: "/login",
            element: <Login />,
         },
         {
            path: "/new",
            element: <NewProduct />,
         },
      ],
   },
]);

export default router;
