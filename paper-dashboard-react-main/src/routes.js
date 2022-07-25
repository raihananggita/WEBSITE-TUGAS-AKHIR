/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Ridrige from "views/Ridrige";
import MetodePrediksi from "views/MetodePrediksi";
import KorelasiPrediksi from "views/KorelasiPrediksi";
import Referensi from "views/Referensi";

var routes = [
  {
    path: "/dashboard",
    name: "Menu Utama",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/metode-prediksi",
    name: "Metode Prediksi",
    icon: "nc-icon nc-app",
    component: MetodePrediksi,
    layout: "/admin"
  },
  {
    path: "/ridge",
    name: "RIDGE REGRESSION",
    icon: "nc-icon nc-chart-bar-32",
    component: Ridrige,
    layout: "/admin"
  },
  {
    path: "/korelasi-metode",
    name: "KORELASI METODE",
    icon: "nc-icon nc-tile-56",
    component: KorelasiPrediksi,
    layout: "/admin"
  },
  {
    path: "/referensi",
    name: "REFERENSI",
    icon: "nc-icon nc-caps-small",
    component: Referensi,
    layout: "/admin"
  }
];
export default routes;
