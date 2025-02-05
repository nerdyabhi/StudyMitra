import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';

const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path:"/",
    element : <Home/>
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;