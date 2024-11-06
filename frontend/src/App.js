import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Root from './components/Root';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
  
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,  
  },
  {
    path: "/register",
    element: <Register />, 
  },
  {
    path: "/",
    element: <Root />, 
    children: [
      {
        path: "/",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;