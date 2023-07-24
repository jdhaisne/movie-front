import { BrowserRouter, Routes, Route } from "react-router-dom";
import MHome from "../pages/MHome/MHome";
import App from "../App";
import NotFound from "../pages/NotFound";

// Page MMovie
import MMovie from "../pages/MMovie/MMovie";
import Notes from "../pages/MMovie/NavMovie/Notes";
import Critiques from "../pages/MMovie/NavMovie/Critiques";
import Comments from "../pages/MMovie/NavMovie/Comments";
import Plot from "../pages/MMovie/NavMovie/Plot";
//

import MMovies from "../pages/MMovies/MMovies";
import { MRegister } from "../pages/MRegister/MRegister";
import { MHeader } from "../components/MHeader/MHeader";
import { post } from "../pages/MPost/post";
import { MLogin } from "../pages/Login/MLogin";
import { MFeed } from "../pages/MFeed/MFeed";

//
import TopBar from "../components/TopBar/TopBar";
import Avis from "../components/TopBar/Avis";
import Suivi from "../components/TopBar/Suivi";
import CritiquesC from "../components/TopBar/CritiquesC";
import ContactForm from "../components/TopBar/ContactForm";
import { MUser } from "../pages/MUser/MUser";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopBar />
              <App />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <TopBar />
              <MHome />
            </>
          }
        />
        <Route
          path="/feed"
          element={
            <>
              <TopBar />
              <MFeed />
            </>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <>
              <TopBar />
              <MMovie />
            </>
          }
        >
          <Route path="notes" element={<Notes />} />
          <Route path="critiques" element={<Critiques />} />
          <Route path="comments" element={<Comments />} />
          <Route path="plot" element={<Plot />} />
        </Route>
        <Route
          path="/movies"
          element={
            <>
              <TopBar />
              <MMovies />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <TopBar></TopBar>
              <MRegister />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <TopBar></TopBar>
              <MLogin />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <TopBar></TopBar>
              <MUser />
            </>
          }
        />

        <Route
          path="/user/:id/contact"
          element={
            <>
              <TopBar></TopBar>
              <ContactForm />
            </>
          }
        />
        <Route
          path="/user/:id"
          element={
            <>
              <TopBar></TopBar>
              <MUser />
            </>
          }
        />
        <Route
          path="/user/:id/suivi"
          element={
            <>
              <TopBar></TopBar>
              <Suivi />
            </>
          }
        />
        <Route
          path="/user/:id/avis"
          element={
            <>
              <TopBar></TopBar>
              <Avis />
            </>
          }
        />
        <Route
          path="/user/:id/critiquesC"
          element={
            <>
              <TopBar></TopBar>
              <CritiquesC />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
