import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Welcome from './components/Welcome/Welcome';
import TodoList from './components/TodoList/Todos'
import Footer from './components/Footer/Footer';
import AuthProvider, { useAuth } from './components/Security/AuthContext';
import UpdateTodo from './components/UpdateTodo/UpdateTodo';
import Logout from './components/Logout/Logout';


function AuthenticatedRoute({children}) {
  const authContext = useAuth()
  
  if(authContext.isAuthenticated)
      return children

  return <Navigate to="/" />
}
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome/:username" element={<AuthenticatedRoute><Welcome /></AuthenticatedRoute>} />
            <Route path="/todos" element={<AuthenticatedRoute><TodoList /></AuthenticatedRoute>} />
            <Route path="/todos/update/:id" element={<AuthenticatedRoute><UpdateTodo /></AuthenticatedRoute>} />
            <Route path="/logout" element={<AuthenticatedRoute><Logout /></AuthenticatedRoute>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
