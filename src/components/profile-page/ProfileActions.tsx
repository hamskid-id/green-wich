import React, { useState } from "react";
import { IonButton, IonIcon, IonSpinner } from "@ionic/react";
import { logOutOutline, trash, close } from "ionicons/icons";
import { useAuthStore } from "../../stores/authStore";
import AlertModal from "../ui/alert-modal/AlertModal";
import { useHistory } from "react-router";

interface ProfileActionsProps {
  className?: string;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ className = "" }) => {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuthStore();
  const history = useHistory();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      history.replace("/login");
      setIsLoggingOut(false);
      setShowLogoutAlert(false);
    }
  };

  return (
    <div className={`profile-actions ${className}`}>
      {/* Logout Section */}
      <div className="logout-section">
        <IonButton
          expand="block"
          fill="outline"
          color="danger"
          onClick={() => setShowLogoutAlert(true)}
          disabled={isLoggingOut}
          className="logout-button"
          aria-label="Sign out of your account"
        >
          {isLoggingOut ? (
            <>
              <IonSpinner name="crescent" className="logout-spinner" />
              <span className="logout-text">Signing out...</span>
            </>
          ) : (
            <>
              <IonIcon icon={logOutOutline} slot="start" aria-hidden="true" />
              <span className="logout-text">Sign Out</span>
            </>
          )}
        </IonButton>
      </div>
      <AlertModal
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        confirmText="Yes, Sign Out"
        cancelText="Cancel"
        type="danger"
        confirmIcon={trash}
        cancelIcon={close}
      />
    </div>
  );
};

export default ProfileActions;
