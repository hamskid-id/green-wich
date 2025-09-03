import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonBadge,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { notificationsOutline, chevronForward } from "ionicons/icons";
import "./HomePage.css";
import { useAuth } from "../../hooks/useAuth";
import { ApiResponse, useApi } from "../../hooks/useApi";
import { Stat } from "../../types/auth";
import { formatDate } from "../../utils/helpers";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { useGet } = useApi();

  const { data, refetch } = useGet<ApiResponse<Stat>>(
    ["stats"],
    `access-codes/stats`
  );

  const statInformation = data?.data;

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonTitle>
            <div className="header-content">
              <h1 className="header-title">Greenwich</h1>
              <p className="header-subtitle">Resident Portal</p>
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton className="notification-btn">
              <IonIcon icon={notificationsOutline} />
              <IonBadge
                color="success"
                className="notification-badge"
              ></IonBadge>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon="chevron-down-circle-outline"
            pullingText="Pull to stats"
            refreshingSpinner="circular"
            refreshingText="loading..."
          />
        </IonRefresher>
        <div className="welcome-section">
          <h1>Welcome, {user?.first_name}</h1>
          <p>What would you like to do today?</p>
        </div>

        <div className="action-grid">
          {/* Generate Visitor Code Card */}
          <IonCard
            className="action-card"
            button
            routerLink="/create-visitor-code"
          >
            <IonCardContent className="card-content-wrapper">
              <div className="action-icon">
                <img
                  src="/div.svg"
                  alt="Greenwich Garden Estates Logo"
                  className="logo-image"
                />
              </div>
              <div className="card-text-content">
                <IonCardTitle>Generate Visitor Code</IonCardTitle>
                <p className="card-description">
                  Create a secure access code for visitors
                </p>
              </div>
              <IonIcon
                icon={chevronForward}
                color="medium"
                className="card-arrow"
              />
            </IonCardContent>
          </IonCard>

          {/* View Visitor History Card */}
          <IonCard
            className="action-card"
            button
            routerLink="/manage-acess-codes"
          >
            <IonCardContent className="card-content-wrapper">
              <div className="action-icon">
                <img
                  src="/div (1).svg"
                  alt="Greenwich Garden Estates Logo"
                  className="logo-image"
                />
              </div>
              <div className="card-text-content">
                <IonCardTitle>View Access code History</IonCardTitle>
                <p className="card-description">
                  See past and active codes
                </p>
              </div>
              <IonIcon
                icon={chevronForward}
                color="medium"
                className="card-arrow"
              />
            </IonCardContent>
          </IonCard>

          {/* Quick Stats Section */}
          <IonCard className="action-card">
            <IonCardHeader>
              <IonCardTitle className="stat-card-title">
                Quick Stats
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="stats-grid">
                <IonRow className="stats-row">
                  <IonCol className="stat-col">
                    <div className="stat-box">
                      <div className="stat-number">
                        {statInformation?.active_codes}{" "}
                      </div>
                      <div className="stat-label">Active Codes</div>
                    </div>
                  </IonCol>
                  <IonCol className="stat-col">
                    <div className="stat-box">
                      <div className="stat-number">
                        {statInformation?.monthly_visitors}{" "}
                      </div>
                      <div className="stat-label">Visitors This Month</div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          <IonCard className="action-card">
            <IonCardHeader>
              <IonCardTitle className="stat-card-title">
                Recent Activity
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="activity-card">
              {statInformation?.activities?.map((activity, index) => (
                <IonItem lines="none" key={index}>
                  <div className="recent-icon">
                    <img
                      src={
                        activity?.message.includes("Access code")
                          ? "/div (3).svg"
                          : "/div (2).svg"
                      }
                      alt="Greenwich Garden Estates Logo"
                      className="logo-image"
                    />
                  </div>
                  <IonLabel>
                    <h3>{activity?.message} </h3>
                    <p>
                      {activity?.time && formatDate(activity?.time?.toString())}{" "}
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
