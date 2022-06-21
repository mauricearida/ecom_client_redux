import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
//components
import Home from "./Home.js";
import Shop from "./Shop.js";
import Cart from "./Cart.js";
import Shipping from "./Shipping.js";
import Signup from "./Signup.js";
import Header from "./Header.js";
import Product from "./Product.js";
import Signin from "./Signin.js";
import NotFound from "./NotFound.js";
import UserRoute from "./UserRoute.js";
import AdminRoute from "./AdminRoute.js";
import UserDashboard from "./UserDashboard.js";
import AdminDashboard from "./AdminDashboard.js";
import AdminEditProduct from "./AdminEditProduct.js";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:productId" component={Product} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/Signin" component={Signin} />
        <UserRoute exact path="/user/dashboard" component={UserDashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute
          exact
          path="/admin/edit/product/:productId"
          component={AdminEditProduct}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
