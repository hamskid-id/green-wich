import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { home, qrCodeOutline, person } from "ionicons/icons";
import HomePage from "../../pages/home-page/HomePage";
import CreateVisitorCodePage from "../../pages/create-visitors-code/CreateVisitorCodePage";
import CodeGeneratedSuccessPage from "../../pages/success-code/CodeGeneratedSuccessPage";
import NotificationsPage from "../../pages/notifications/NotificationsPage";
import HistoryLogsPage from "../../pages/history-logs/HistoryLogsPage";
import ManageAccessCodesPage from "../../pages/manage-accesscode/ManageAccessCodesPage";
import ProfilePage from "../../pages/profile/ProfilePage";

const MobileLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Authenticated routes */}
        <Route path="/home" component={HomePage} exact />
        <Route path="/visitor-access" component={HomePage} exact />
        <Route
          path="/success-code"
          component={CodeGeneratedSuccessPage}
          exact
        />
        <Route path="/notifications" component={NotificationsPage} exact />
        <Route path="/history-logs" component={HistoryLogsPage} exact />
        <Route
          path="/create-visitor-code"
          component={CreateVisitorCodePage}
          exact
        />
        <Route
          path="/manage-acess-codes"
          component={ManageAccessCodesPage}
          exact
        />
        <Route path="/profile" component={ProfilePage} exact />

        {/* Default redirect */}
        <Route exact path="/" render={() => <Redirect to="/home" />} />

        {/* Catch-all */}
        <Route render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="custom-tab-bar">
        <IonTabButton tab="home" href="/home">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>

        <IonTabButton tab="manage-acess-codes" href="/manage-acess-codes">
          <IonIcon icon={qrCodeOutline} />
          <IonLabel>Codes</IonLabel>
        </IonTabButton>

        {/* <IonTabButton tab="notifications" href="/notifications">
          <IonIcon icon={notificationsOutline} />
          <IonLabel>Notifications</IonLabel>
        </IonTabButton> */}

        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MobileLayout;
