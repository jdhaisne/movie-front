import { BrowserRouter, Routes, Route } from "react-router-dom";
import MHome from "../pages/MHome/MHome";
import App from "../App";
import NotFound from "../pages/NotFound";
// Page MMovie
import MMovie from "../pages/MMovie/MMovie";
import Notes from "../pages/MMovie/NavMovie/Notes";
import Critiques from "../pages/MMovie/NavMovie/Critiques";
import Comments from "../pages/MMovie/NavMovie/Comments";
//
import MMovies from "../pages/MMovies/MMovies";
import { MRegister } from "../pages/MRegister/MRegister";
import { MHeader } from "../components/MHeader/MHeader";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<MHome />} />
        <Route path="/movie/:id" element={<MMovie />}>
          <Route path="notes" element={<Notes />} />
          <Route path="critiques" element={<Critiques />} />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="/movies" element={<MMovies />} />
        <Route
          path="/register"
          element={
            <>
              <MHeader></MHeader>
              <MRegister />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
