import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";
import LoginPage from "../../pages/auth/LoginPage";
import ForgotPasswordPage from "../../pages/auth/ForegetPassword";
import VerifyEmailPage from "../../pages/auth/VerifyEmailPage";
import RegisterPage from "../../pages/auth/RegisterPage";

const AuthLayout = () => {
  return (
    <IonRouterOutlet>
      <Route path="/login" component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} exact />
      <Route path="/forgot-password" component={ForgotPasswordPage} exact />
      <Route path="/verify-email" component={VerifyEmailPage} exact />
    </IonRouterOutlet>
  );
};

export default AuthLayout;
