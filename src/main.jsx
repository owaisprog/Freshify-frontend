// maintine ui library imports
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";

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
import OrganizationOwnerLocations from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerLocation/OrganizationOwnerLocation.jsx";
import ProtectedRoute from "../src/components/ProtectedRoute.jsx";
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

import SuperAdminLayout from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminLayout.jsx";

import CustomerLayout from "./pages/Customer/CustomerLayout/CustomerLayout.jsx";
import SuperAdminNotification from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/components/SuperAdminNotification.jsx";
import SuperAdminProfile from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/components/SuperAdminProfile.jsx";
import SuperAdminDelete from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/components/SuperAdminDelete.jsx";
import SuperAdminSettings from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/SuperAdminSettings.jsx";
import AdminsLayout from "./pages/Admins/AdminsLayout/AdminsLayout.jsx";
import AdminsDashboard from "./pages/Admins/AdminsLayout/AdminsDashboard/AdminsDashboard.jsx";
import AdminsServices from "./pages/Admins/AdminsLayout/AdminsServices/AdminsServices.jsx";
import AdminsPayout from "./pages/Admins/AdminsLayout/AdminsPayout/AdminsPayout.jsx";
import AdminsCalendar from "./pages/Admins/AdminsLayout/AdminsCalendar/AdminsCalendar.jsx";

import AdminSettings from "./pages/Admins/AdminsLayout/AdminsSettings/AdminSettings.jsx";
import AdminsSettings from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminsSettings.jsx";
import AdminNotification from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminsNotification.jsx";
import AdminProfile from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminsProfile.jsx";
import AdminDelete from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminsDelete.jsx";
import ProfessionalLayout from "./pages/Professionals/ProfessionalLayout/ProfessionalLayout.jsx";
import ProfessionalDashboard from "./pages/Professionals/ProfessionalLayout/ProfessionalDashboard/ProfessionalDashboard.jsx";
import ProfessionalSettings from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/ProfessionalSettings.jsx";
import ProfessionalNotification from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalNotification.jsx";
import ProfessionalProfile from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalProfile.jsx";
import ProfessionalDelete from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalDelete.jsx";
import AdminsUsers from "./pages/Admins/AdminsLayout/AdminsUsers/OrganizationOwnerUsers.jsx";
import OrganizationOwnerPayout from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerPayout/OrganizationOwnerPayout.jsx";
import ProfessionalUpdatePassword from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalUpdatePassword.jsx";
import CustomerDashboard from "./pages/Customer/CustomerLayout/CustomerDashboard/CustomerDashboard.jsx";
import CustomerSettings from "./pages/Customer/CustomerLayout/CustomerSettings/CustomerSettings.jsx";
import CustomerProfile from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerProfile.jsx";
import CustomerUpdatePassword from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerUpdatePassword.jsx";
import CustomerNotification from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerNotification.jsx";
import CustomerDelete from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerDelete.jsx";
import SuperAdminsSettings from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminSettings/components/SuperAdminsSettings.jsx";
import SuperAdminServices from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminServices/SuperAdminServices.jsx";
import SuperAdminPayout from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminPayout/SuperAdminPayout.jsx";
import SuperAdminLocations from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminLocation/SuperAdminLocation.jsx";
import SuperAdminUsers from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminUsers/SuperAdminUsers.jsx";
import SuperAdminOrganization from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminOrganization/SuperAdminOrganization.jsx";
import MainLogin from "./components/auth/MainAuth/MainLogin.jsx";
import MainRegister from "./components/auth/MainAuth/MainRegister.jsx";
import MainVerifyEmail from "./components/auth/MainAuth/MainVerifyEmail.jsx";
import MainResetPassword from "./components/auth/MainAuth/MainResetPassword.jsx";
import MainResendOTP from "./components/auth/MainAuth/MainResendOTP.jsx";
import MainNewPassword from "./components/auth/MainAuth/MainNewPassword.jsx";
import BookingLayout from "./components/booking/BookingLayout.jsx";
import LocationStep from "./components/booking/LocationStep.jsx";
import ProfessionalStep from "./components/booking/ProfessionalStep.jsx";
import ServicesStep from "./components/booking/ServicesStep.jsx";
import { BookingProvider } from "./components/booking/BookingContext.jsx";
import DateTimeStep from "./components/booking/DateTimeStep.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import OrganizationLogout from "./pages/OrganizationOwner/OrganizationOwnerLayout/OrganizationOwnerSettings/components/OrganizationLogout.jsx";
import ProfessionalLogout from "./pages/Professionals/ProfessionalLayout/ProfessionalSettings/components/ProfessionalLogout.jsx";
import AdminLogout from "./pages/Admins/AdminsLayout/AdminsSettings/components/AdminLogout.jsx";
import CustomerLogout from "./pages/Customer/CustomerLayout/CustomerSettings/components/CustomerLogout.jsx";
import SuperAdminCalendar from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminCalendar/SuperAdminCalendar.jsx";
import SuccessPage from "./components/SuccessPage.jsx";
import Failure from "./components/FailurePage.jsx";
import OrganizationOwnerPlan from "./pages/OrganizationOwner/OrganizationOwnerPlan/OrganizationOwnerPlan.jsx";
import CheckoutPage from "./components/CheckOutPage.jsx";
import BookingAuth from "./components/booking/BookingAuth.jsx";
import SuperAdminPlan from "./pages/SuperAdmin/SuperAdminLayout/SuperAdminPlan/SuperAdminPlan.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Widget from "./components/widget-component/Widget.jsx";
import NotificationsPage from "./components/notifications/NotificationPage.jsx";
import OrganizationOwnerInvoices from "./pages/OrganizationOwner/OrganizationOwnerInvoices/OrganizationOwnerInvoices.jsx";

// create router from createBrowserRouter
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="freshifyWidget/:ownerId" element={<Widget />} />
      {/* plans */}
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/owner-plans" element={<OrganizationOwnerPlan />} />
      {/* strip pages */}
      <Route
        path="success"
        element={
          <SuccessPage
            id="session_id"
            key="success"
            endpoint="/api/success?session_id"
            navigateURL="/OrganizationOwnerDashboard"
          />
        }
      />
      <Route
        path="/payment-success"
        element={
          <SuccessPage
            id="session_id"
            key="success"
            endpoint="/api/payment-success?session_id"
            navigateURL="/CustomerDashboard"
          />
        }
      />
      <Route
        path="connect_success"
        element={
          <SuccessPage
            id="account_id"
            key="success"
            message="Successfully Connected"
            endpoint="/api/connect/success?account_id"
            navigateURL="/OrganizationOwnerDashboard/Payout"
            secondLine={"You have successfully connected your stripe account"}
          />
        }
      />
      <Route path="payment-cancel" element={<Failure />} />
      {/* Customer Booking Routes Start   */}
      <Route
        path="booking"
        element={
          <BookingProvider>
            <BookingLayout />
          </BookingProvider>
        }
      >
        <Route index element={<LocationStep />} />
        <Route path="professional" element={<ProfessionalStep />} />
        <Route path="services" element={<ServicesStep />} />
        <Route path="datetime" element={<DateTimeStep />} />
        <Route path="BookingAuth" element={<BookingAuth />} />
      </Route>
      {/* Customer Booking Routes End   */}
      <Route index element={<LandingPage />} /> {/* main auth */}
      <Route path="NewPassword/:resetToken" element={<MainNewPassword />} />
      <Route path="Login" element={<MainLogin />} />
      <Route path="Register" element={<MainRegister />} />
      <Route path="VerifyEmail" element={<MainVerifyEmail />} />
      <Route path="ResetPassword" element={<MainResetPassword />} />
      <Route path="ResendOTP" element={<MainResendOTP />} />
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
      {/* organization owner */}
      <Route
        path="/OrganizationOwnerDashboard"
        element={
          <ProtectedRoute
            path="/Login?role=organization_owner"
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
        <Route path="invoices" element={<OrganizationOwnerInvoices />} />

        <Route path="settings" element={<OrganizationOwnerSettings />}>
          <Route index element={<OrganizationsSettings />} />
          <Route path="email" element={<OrganizationNotification />} />
          <Route path="personal" element={<OrganizationProfile />} />
          <Route path="delete" element={<OrganizationDelete />} />
          <Route path="logout" element={<OrganizationLogout />} />
        </Route>
      </Route>
      {/* super admin auth */}
      <Route
        path="SuperAdminOrganization"
        element={
          <ProtectedRoute
            path="/Login?role=superadmin"
            requiredRole="superadmin"
          >
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminOrganization />} />
        <Route path="plan" element={<SuperAdminPlan />} />
        <Route path="Services/:ownerId" element={<SuperAdminServices />} />
        <Route path="Users/:ownerId" element={<SuperAdminUsers />} />
        <Route path="calendar/:ownerId" element={<SuperAdminCalendar />} />
        <Route path="Payout/:ownerId" element={<SuperAdminPayout />} />
        <Route path="locations/:ownerId" element={<SuperAdminLocations />} />
        <Route path="settings/:ownerId" element={<SuperAdminSettings />}>
          <Route index element={<SuperAdminsSettings />} />
          <Route path="email" element={<SuperAdminNotification />} />
          <Route path="personal" element={<SuperAdminProfile />} />
          <Route path="delete" element={<SuperAdminDelete />} />
        </Route>
      </Route>
      {/* Customer auth */}
      <Route
        path="CustomerDashboard"
        element={
          <ProtectedRoute path="/Login?role=customer" requiredRole="customer">
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="settings" element={<CustomerSettings />}>
          {/* <Route index element={<CustomersSettings />} /> */}
          <Route index element={<CustomerProfile />} />
          <Route path="password" element={<CustomerUpdatePassword />} />
          <Route path="email" element={<CustomerNotification />} />
          <Route path="delete" element={<CustomerDelete />} />
          <Route path="logout" element={<CustomerLogout />} />
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
        <Route path="Services" element={<AdminsServices />} />
        <Route path="Users" element={<AdminsUsers />} />
        <Route path="Calendar" element={<AdminsCalendar />} />
        <Route path="Payout" element={<AdminsPayout />} />
        {/* <Route path="locations" element={<AdminsLocations />} />  */}
        <Route path="settings" element={<AdminSettings />}>
          <Route index element={<AdminsSettings />} />
          <Route path="email" element={<AdminNotification />} />
          <Route path="personal" element={<AdminProfile />} />
          <Route path="delete" element={<AdminDelete />} />
          <Route path="logout" element={<AdminLogout />} />
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
          {/* <Route index element={<ProfessionalsSettings />} /> */}
          <Route index element={<ProfessionalProfile />} />
          <Route path="password" element={<ProfessionalUpdatePassword />} />
          <Route path="email" element={<ProfessionalNotification />} />
          <Route path="delete" element={<ProfessionalDelete />} />
          <Route path="logout" element={<ProfessionalLogout />} />
        </Route>
      </Route>
      {/* Error Page Route  */}
      <Route path="*" element={<ErrorPage />} />
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
