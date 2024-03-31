import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { Header } from './components/Header.jsx';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Redirect to login if the path is not found */}
        <Route path="*" element={< NotFoundPage />} />
      </Routes>
    </Router>
  );
}


export default App
