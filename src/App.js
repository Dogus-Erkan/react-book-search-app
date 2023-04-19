import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import { BookProvider } from "./context/BooksContext";
import Header from "./components/layout/header";
import Page404 from "./components/404";
import BookDetail from "./components/bookDetail";

function App() {
  return (
    <BookProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/detail/:id" element={<BookDetail />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default App;
