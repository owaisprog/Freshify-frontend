// maintine ui library imports
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";

import { MantineProvider } from "@mantine/core";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// SUPER ADMIN COMPONENTS IMPORTS
import OrganizationOwnerLayout from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerLayout.jsx";
import OrganizationOwnerDashboard from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerDashboard/OrganizationOwnerDashboard.jsx";
import OrganizationOwnerServices from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerServices/OrganizationOwnerServices.jsx";
import OrganizationOwnerUsers from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerUsers/OrganizationOwnerUsers.jsx";
import OrganizationOwnerLogin from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerLogin.jsx";
import OrganizationOwnerRegister from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerRegister.jsx";
import OrganizationOwnerResetPassword from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerResetPassword.jsx";
import OrganizationOwnerVerifyEmail from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerVerifyEmail.jsx";
import OrganizationOwnerNewPassword from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerNewPassword.jsx";
import OrganizationOwnerLocations from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerLocation/OrganizationOwnerLocation.jsx";
import ProtectedRoute from "../src/components/ProtectedRoute.jsx";
import OrganizationOwnerResendOTP from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationResenOTP.jsx";
import OrganizationOwnerSentPassword from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerSentPassword.jsx";

// create router from createBrowserRouter
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="OrganizationOwnerLogin"
        element={<OrganizationOwnerLogin />}
      />
      <Route
        path="OrganizationOwnerRegister"
        element={<OrganizationOwnerRegister />}
      />

      <Route
        path="OrganizationOwnerVerifyEmail"
        element={<OrganizationOwnerVerifyEmail />}
      />

      <Route
        path="OrganizationOwnerResetPassword"
        element={<OrganizationOwnerResetPassword />}
      />
      <Route
        path="OrganizationOwnerNewPassword/:resetToken"
        element={<OrganizationOwnerNewPassword />}
      />
      <Route
        path="OrganizationOwnerResendOTP"
        element={<OrganizationOwnerResendOTP />}
      />
      <Route
        path="OrganizationOwnerSentPassword/:userKey"
        element={<OrganizationOwnerSentPassword />}
      />
      <Route
        path="OrganizationOwnerDashboard"
        element={
          <ProtectedRoute requiredRole="organization_owner">
            <OrganizationOwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OrganizationOwnerDashboard />} />
        <Route path="Services" element={<OrganizationOwnerServices />} />
        <Route path="Users" element={<OrganizationOwnerUsers />} />
        <Route path="locations" element={<OrganizationOwnerLocations />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <MantineProvider theme={{ fontFamily: ["Poppins", "serif"] }}>
    <RouterProvider router={router} />
  </MantineProvider>
);
