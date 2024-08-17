import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.tsx";
import DashboardV2 from "./pages/dashboardv2/index.tsx";
import MainLayout from "./pages/layout.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'home/dashboardv2',
        element: <DashboardV2 />
      }
    ]
  }  
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={ store }>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
