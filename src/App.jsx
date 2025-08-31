import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/Home";
import MovieDetails from "./components/MovieDetails";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:type/:id" element={<MovieDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
