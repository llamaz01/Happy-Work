import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { history } from "./components/utils/history";

import "./App.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import RegisterOpcion from "./components/auth/register/RegisterOpcions";
import RegisterCompany from "./components/auth/register/RegisterCompany";
import Comments from "./components/comments/home-comments";
import DetailsComments from "./components/comments/details-commets";
import Ranking from "./components/ranking/ranking";
import Footer from "./components/common/footer/Footer";
import PageNotFound from "./components/common/notFound/PageNotFound";

function App() {
  return (
    <Router history={history}>

      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<RegisterOpcion />} />
          <Route path="/auth/register/user" element={<Register />} />
          <Route path="/auth/register/company" element={<RegisterCompany />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/commets/detailscompany/:id" element={<DetailsComments />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound/> } />
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
