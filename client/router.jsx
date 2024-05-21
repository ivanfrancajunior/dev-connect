import { createBrowserRouter } from 'react-router-dom';

import Landing from './src/pages/Landing';
import Layout from './src/pages/Layout';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
]);

export default router;
