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
import { CreateSessionPage } from './pages/CreateSessionPage.jsx';
import SessionDetails from './pages/SessionDetails.jsx';
import { Layout } from './components/Layout.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-session" element={<CreateSessionPage />} />
          <Route path="/session-details/:sessionId" element={<SessionDetails />} />
          {/* Redirect to login if the path is not found */}
          <Route path="*" element={< NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App
