import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";

function AppRoutes() {
  return (
    <Routes>
      {/* its like saying saying showHero={true} */}
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      ></Route>
      <Route
        path="/auth-callback"
        element={<AuthCallBackPage></AuthCallBackPage>}
      ></Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        ></Route>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        ></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
}
export default AppRoutes;
