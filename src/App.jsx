import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { GET_USERS } from "./graphql/queries/user";
import apolloClient from "./utils/apolloClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Custom404 from "./pages/404";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Detail from "./pages/Detail";
import BrowseBooks from "./pages/BrowseBooks";
import Save from "./pages/Save";
import RequireAuth from "./component/RequireAuth";
import Horror from "./pages/Horror";
import Comedy from "./pages/Comedy";
import Manga from "./pages/Manga";
import Romance from "./pages/Romance";
import Logout from "./pages/Logout";
function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Custom404 />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/logout" element={<Logout />} />
      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/browse-books" element={<BrowseBooks />} />
        <Route path="/saved" element={<Save />} />
        <Route path="/horror" element={<Horror />} />
        <Route path="/comedy" element={<Comedy />} />
        <Route path="/manga" element={<Manga />} />
        <Route path="/romance" element={<Romance />} />
        <Route
          path="/:genre/details/bookId=:id/mode=view-details"
          element={<Detail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
