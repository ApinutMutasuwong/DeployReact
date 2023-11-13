import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/Search/search.css";
import Main from "./components/Main/Main";
import Form from "./components/Form/Form";
import Search from "./components/Search/search-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/share" element={<Form />} />
        <Route exact path="/find" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
