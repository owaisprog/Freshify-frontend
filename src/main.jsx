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

// react tostify imports
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
import OrganizationOwnerSentPassword from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerUsers/Components/OrganizationOwnerSentPassword.jsx";
import OrganizationOwnerUserResetPassword from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerUsers/Components/OrganizationOwnerUserResetPassword.jsx";
import OrganizationOwnerUserNewPassword from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerUsers/Components/OrganizationOwnerUserNewPassword.jsx";
import OrganizationOwnerUserLogin from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerUsers/Components/OrganizationOwnerUserLogin.jsx";
import OrganizationOwnerSettings from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerSettings/OrganizationOwnerSettings.jsx";
import OrganizationsSettings from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerSettings/components/OrganizationsSettings.jsx";
import OrganizationNotification from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerSettings/components/OrganizationNotification.jsx";
import OrganizationProfile from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerSettings/components/OrganizationProfile.jsx";
import OrganizationDelete from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerSettings/components/OrganizationDelete.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

      {/* user auth routes routes  */}
      <Route
        path="OrganizationOwnerSentPassword/:userKey"
        element={<OrganizationOwnerSentPassword />}
      />
      <Route
        path="OrganizationOwnerUserResetPassword"
        element={<OrganizationOwnerUserResetPassword />}
      />
      <Route
        // for user new password set this route in backend
        path="OrganizationOwnerUserNewPassword/:resetToken"
        element={<OrganizationOwnerUserNewPassword />}
      />
      <Route
        path="OrganizationOwnerUserLogin"
        element={<OrganizationOwnerUserLogin />}
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
        <Route path="settings" element={<OrganizationOwnerSettings />}>
          <Route index element={<OrganizationsSettings />} />
          <Route path="email" element={<OrganizationNotification />} />
          <Route path="personal" element={<OrganizationProfile />} />
          <Route path="delete" element={<OrganizationDelete />} />
        </Route>
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <MantineProvider theme={{ fontFamily: ["Poppins", "serif"] }}>
      <RouterProvider router={router} />
    </MantineProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
