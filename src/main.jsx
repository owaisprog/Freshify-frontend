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
import "react-toastify/dist/ReactToastify.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// SUPER ADMIN COMPONENTS IMPORTS
import OrganizationOwnerLayout from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerLayout.jsx";
import OrganizationOwnerDashboard from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerDashboard/OrganizationOwnerDashboard.jsx";
import OrganizationOwnerServices from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerServices/OrganizationOwnerServices.jsx";
import OrganizationOwnerUsers from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerUsers/OrganizationOwnerUsers.jsx";
import OrganizationOwnerCalendar from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerCalendar/OrganizationOwnerCalendar.jsx";
import OrganizationOwnerLogin from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerLogin.jsx";
import OrganizationOwnerRegister from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerRegister.jsx";
import OrganizationOwnerResetPassword from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerResetPassword.jsx";
import OrganizationOwnerVerifyEmail from "./pages/OrganizationOwner/OrganizationOwnerAuth/OrganizationOwnerVerifyEmail.jsx";
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
import SuperAdminLogin from "./pages/SuperAdmin/SuperAdminAuth/SuperAdminLogin.jsx";

import SuperAdminVerifyEmail from "./pages/SuperAdmin/SuperAdminAuth/SuperAdminVerifyEmail.jsx";
import SuperAdminResetPassword from "./pages/SuperAdmin/SuperAdminAuth/SuperAdminResetPassword.jsx";
import SuperAdminResendOTP from "./pages/SuperAdmin/SuperAdminAuth/SuperAdminResendOTP.jsx";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminDashboard/SuperAdminDashboard.jsx";
import SuperAdminLayout from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminLayout.jsx";
import CustomerLogin from "./pages/Customer/CustomerAuth/CustomerLogin.jsx";
import CustomerRegister from "./pages/Customer/CustomerAuth/CustomerRegister.jsx";
import CustomerVerifyEmail from "./pages/Customer/CustomerAuth/CustomerVerifyEmail.jsx";
import CustomerResetPassword from "./pages/Customer/CustomerAuth/CustomerPassword.jsx";
import CustomerResendOTP from "./pages/Customer/CustomerAuth/CustomerResendOTP.jsx";

import CustomerLayout from "./pages/Customer/CustomerLayout/CustomerLayout.jsx";
import CustomerDashboard from "./pages/Customer/CustomerLayout/CustomerDashboard/CustomerDashboard.jsx";
import NewPassword from "./components/NewPassword.jsx";
import CustomerSettings from "./pages/Customer/CustomerLayout/CustomerSettings/CustomersSettings.jsx";
import CustomersSettings from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerSettings.jsx";
import CustomerNotification from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerNotification.jsx";
import CustomerProfile from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerProfile.jsx";
import CustomerDelete from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerDelete.jsx";
import SuperAdminsSettings from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/components/SuperAdminSettings.jsx";
import SuperAdminNotification from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/components/SuperAdminNotification.jsx";
import SuperAdminProfile from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/components/SuperAdminProfile.jsx";
import SuperAdminDelete from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/components/SuperAdminDelete.jsx";
import SuperAdminSettings from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/SuperAdminSettings.jsx";
import AdminsLayout from "./pages/Admins/AdminsLayout/AdminsLayout.jsx";
import AdminsDashboard from "./pages/Admins/AdminsLayout/AdminsDashboard/AdminsDashboard.jsx";
import AdminsServices from "./pages/Admins/AdminsLayout/AdminsServices/AdminsServices.jsx";
import AdminsLocations from "./pages/Admins/AdminsLayout/AdminsLocation/AdminsLocation.jsx";
import AdminSettings from "./pages/Admins/AdminsLayout/AdminsSettings/AdminSettings.jsx";
import AdminsSettings from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminsSettings.jsx";
import AdminNotification from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminsNotification.jsx";
import AdminProfile from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminsProfile.jsx";
import AdminDelete from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminsDelete.jsx";
import ProfessionalLayout from "./pages/Professionals/ProfessionalLayout/ProfessionalLayout.jsx";
import ProfessionalDashboard from "./pages/Professionals/ProfessionalLayout/ProfessionalDashboard/ProfessionalDashboard.jsx";
import ProfessionalSettings from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/ProfessionalSettings.jsx";
import ProfessionalsSettings from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalsSettings.jsx";
import ProfessionalNotification from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalNotification.jsx";
import ProfessionalProfile from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalProfile.jsx";
import ProfessionalDelete from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalDelete.jsx";
import OrganizationOwnerPayout from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerPayout/OrganizationOwnerPayout.jsx";

// create router from createBrowserRouter
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="OrganizationOwnerNewPassword/:resetToken"
        element={<NewPassword />}
      />
      {/* organization owner */}
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
          <ProtectedRoute
            path="/OrganizationOwnerLogin"
            requiredRole="organization_owner"
          >
            <OrganizationOwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OrganizationOwnerDashboard />} />
        <Route path="Services" element={<OrganizationOwnerServices />} />
        <Route path="Users" element={<OrganizationOwnerUsers />} />
        <Route path="Calendar" element={<OrganizationOwnerCalendar />} />
        <Route path="Payout" element={<OrganizationOwnerPayout />} />
        <Route path="locations" element={<OrganizationOwnerLocations />} />
        <Route path="settings" element={<OrganizationOwnerSettings />}>
          <Route index element={<OrganizationsSettings />} />
          <Route path="email" element={<OrganizationNotification />} />
          <Route path="personal" element={<OrganizationProfile />} />
          <Route path="delete" element={<OrganizationDelete />} />
        </Route>
      </Route>

      {/* super admin auth */}

      <Route path="SuperAdminLogin" element={<SuperAdminLogin />} />

      <Route path="SuperAdminVerifyEmail" element={<SuperAdminVerifyEmail />} />

      <Route
        path="SuperAdminResetPassword"
        element={<SuperAdminResetPassword />}
      />

      <Route path="SuperAdminResendOTP" element={<SuperAdminResendOTP />} />

      <Route
        path="SuperAdminDashboard"
        element={
          <ProtectedRoute path="/SuperAdminLogin" requiredRole="superadmin">
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />
        <Route path="settings" element={<SuperAdminSettings />}>
          <Route index element={<SuperAdminsSettings />} />
          <Route path="email" element={<SuperAdminNotification />} />
          <Route path="personal" element={<SuperAdminProfile />} />
          <Route path="delete" element={<SuperAdminDelete />} />
        </Route>
      </Route>

      {/* Customer auth */}

      <Route path="CustomerLogin" element={<CustomerLogin />} />
      <Route path="CustomerRegister" element={<CustomerRegister />} />

      <Route path="CustomerVerifyEmail" element={<CustomerVerifyEmail />} />

      <Route path="CustomerResetPassword" element={<CustomerResetPassword />} />

      <Route path="CustomerResendOTP" element={<CustomerResendOTP />} />

      <Route
        path="CustomerDashboard"
        element={
          <ProtectedRoute path="/customerLogin" requiredRole="customer">
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="settings" element={<CustomerSettings />}>
          <Route index element={<CustomersSettings />} />
          <Route path="email" element={<CustomerNotification />} />
          <Route path="personal" element={<CustomerProfile />} />
          <Route path="delete" element={<CustomerDelete />} />
        </Route>
      </Route>

      {/* Admins  */}
      <Route
        path="AdminsDashboard"
        element={
          <ProtectedRoute
            path="/OrganizationOwnerUserLogin"
            requiredRole="admin"
          >
            <AdminsLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminsDashboard />} />
        {/* <Route path="Services" element={<AdminsServices />} /> */}
        {/* <Route path="Users" element={<AdminsUsers />} /> */}
        {/* <Route path="locations" element={<AdminsLocations />} /> */}
        <Route path="settings" element={<AdminSettings />}>
          <Route index element={<AdminsSettings />} />
          <Route path="email" element={<AdminNotification />} />
          <Route path="personal" element={<AdminProfile />} />
          <Route path="delete" element={<AdminDelete />} />
        </Route>
      </Route>

      {/*Professionals  */}
      <Route
        path="ProfessionalDashboard"
        element={
          <ProtectedRoute
            path="/OrganizationOwnerUserLogin"
            requiredRole="barber"
          >
            <ProfessionalLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfessionalDashboard />} />

        <Route path="settings" element={<ProfessionalSettings />}>
          <Route index element={<ProfessionalsSettings />} />
          <Route path="email" element={<ProfessionalNotification />} />
          <Route path="personal" element={<ProfessionalProfile />} />
          <Route path="delete" element={<ProfessionalDelete />} />
        </Route>
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <MantineProvider
      theme={{ fontFamily: "Roboto, sans-serif" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <RouterProvider router={router} />
    </MantineProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
