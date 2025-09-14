import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonBadge,
  IonLabel,
  IonIcon,
  IonToast,
} from "@ionic/react";
import {
  arrowRedoSharp,
  trashOutline,
} from "ionicons/icons";
import { AccessCode } from "../../types";
import { capitalizeFirstLetter, formatDate } from "../../utils/helpers";

interface Props {
  code: AccessCode & { remaining?: { value: number; unit: string } };
  onShare: (code: AccessCode) => void;
  onDelete: (code: AccessCode) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "expired":
      return "medium";
    case "revoked":
      return "danger";
    default:
      return "primary";
  }
};

const CodeCard: React.FC<Props> = ({ code, onShare, onDelete }) => {
  const isActive = code.status === "active" && code.remaining?.value! > 0;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <IonCard className="code-card" onClick={handleCopy}>
      <IonCardContent>
        <div className="code-header">
          <h3 className="code-name">{capitalizeFirstLetter(code.visitor_name)}</h3>
          <div className="code-actions">
            <button
              className={`action-button share ${!isActive ? "disabled" : ""}`}
              aria-label={`Share code for ${capitalizeFirstLetter(code.visitor_name)}`}
              onClick={() => onShare(code)}
              disabled={!isActive}
            >
              <IonIcon icon={arrowRedoSharp} />
            </button>
            <button
              className={`action-button delete ${!isActive ? "disabled" : ""}`}
              aria-label={`Delete code for ${capitalizeFirstLetter(code.visitor_name)}`}
              onClick={() => onDelete(code)}
              disabled={!isActive}
            >
              <IonIcon icon={trashOutline} />
            </button>
          </div>
        </div>

        <div className="status-row">
          <IonBadge
            color={getStatusColor(code.status)}
            className="status-badge"
          >
            {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
          </IonBadge>
          {code.status === "active" && (
            <IonLabel color={code.remaining?.value! <= 0 ? "danger" : "dark"}>
              {code.remaining?.value! > 0
                ? `Expires in ${code.remaining?.value} ${code.remaining?.unit}`
                : "Expired"}
            </IonLabel>
          )}
        </div>

        <div className="created-code-row">
          <IonLabel>{formatDate(code.created_at)}</IonLabel>
          <div className="code-copy">
            <IonLabel>
              <strong>Code: {code.code}</strong>
            </IonLabel>
          </div>
        </div>
      </IonCardContent>

      {/* Toast for copy feedback */}
      <IonToast
        isOpen={copied}
        onDidDismiss={() => setCopied(false)}
        message="Code copied to clipboard!"
        duration={1500}
        position="top"
        color="success"
      />
    </IonCard>
  );
};

export default CodeCard;
