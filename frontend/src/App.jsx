import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";
import PostJob from "./pages/PostJob";
import Applicants from "./pages/Applicants";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="app-shell">
            <Header />
            <main className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
                <Route path="/applications" element={<PrivateRoute><MyApplications /></PrivateRoute>} />
                <Route path="/post-job" element={<PrivateRoute><PostJob /></PrivateRoute>} />
                <Route path="/applicants" element={<PrivateRoute><Applicants /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;