import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth';

const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;