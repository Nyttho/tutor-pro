import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Subscribe from "./pages/Subscribe";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Lesson from "./pages/Lesson";
import LessonDetail from "./pages/LessonDetail";
import PrivateRoutes from "./components/PrivateRoutes";
import DayCourses from "./pages/DayCourses";
import PrivacyPolicy from "./pages/PrivatePolicy";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/private-policy" element={<PrivacyPolicy />} />

          {/* routes protégées */}
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/calendar"
              element={
                <Layout>
                  <Calendar />
                </Layout>
              }
            />
            <Route
              path="/students"
              element={
                <Layout>
                  <Students />
                </Layout>
              }
            />
            <Route
              path="/student/:id"
              element={
                <Layout>
                  <StudentDetail />
                </Layout>
              }
            />
            <Route
              path="/lessons"
              element={
                <Layout>
                  <Lesson />
                </Layout>
              }
            />
            <Route
              path="/lessons/:id"
              element={
                <Layout>
                  <LessonDetail />
                </Layout>
              }
            />
            <Route
              path="/courses"
              element={
                <Layout>
                  <DayCourses />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
