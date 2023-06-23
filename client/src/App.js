import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './style/main.css';
import './style/reset.css';
import Header from './components/Header/Header.js';
import Main from './pages/Main/Main.js';
import Footer from './components/Footer/Footer.js';

import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';
import AdmEditProcedure from './pages/Admin/AdmEditProcedure';
import ProcedurePage from './pages/Procedure/ProcedurePage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, RequireAuth, RequireAdmin, AuthorizedRedirect } from './context/Auth';
import { Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
function App() {
  return (
    <div className="App">
            <AuthProvider>
        <Router>
            <Header />
            <Routes>
            <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<RequireAuth><Main /></RequireAuth>} />
              <Route path="/procedure/:procedureid" element={<ProcedurePage />} />
              <Route path="/admin" element={<RequireAdmin><Admin/></RequireAdmin>} />
              <Route path="/admin/procedure/edit/:procedureid" element={<RequireAdmin><AdmEditProcedure/></RequireAdmin>} />

              <Route path="/profile/" element={<RequireAuth><Profile/></RequireAuth>} />
              <Route path="/auth" element={<AuthorizedRedirect><AuthPage /></AuthorizedRedirect>} />
            </Routes>
            <Footer />
        </Router>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          </AuthProvider>
    </div>
  );
}

export default App;
