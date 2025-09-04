import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonToast,
  IonProgressBar,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonRadioGroup,
  IonRadio,
} from "@ionic/react";
import { person, calendar, time, documentText, people } from "ionicons/icons";
import CustomInput from "../../components/ui/customInput/CustomInput";
import CustomButton from "../../components/ui/customButton/CustomButton";
import "./CreateVisitorCodePage.css";
import { useHistory } from "react-router";
import { ApiResponse, useApi } from "../../hooks/useApi";
import { CodeData } from "../../types";

interface CreateCodeRequest {
  visitor_name: string;
  visit_purpose?: string;
  start_time?: string;
  end_time?: string;
  notes?: string;
  multiple_persons?: boolean;
  visitor_count?: number;
}

const CreateVisitorCodePage: React.FC = () => {
  const [visitorName, setVisitorName] = useState<string>("");
  const [visitPurpose, setVisitPurpose] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isMultipleVisitor, setIsMultipleVisitor] = useState<boolean>(false);
  const [visitorCount, setVisitorCount] = useState<string>("2");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [visitorType, setVisitorType] = useState<"single" | "multiple">(
    "single"
  );
  const history = useHistory();
  const { usePost } = useApi();

  // Create the mutation for generating access code
  const createCodeMutation = usePost<ApiResponse<CodeData>, CreateCodeRequest>(
    "/access-codes"
  );

  const handleGenerateCode = async (): Promise<void> => {
    if (!visitorName) {
      setToastMessage("Please fill in all required fields");
      setShowToast(true);
      return;
    }

    if (isMultipleVisitor && (!visitorCount || parseInt(visitorCount) < 2)) {
      setToastMessage("Please enter a valid visitor count (minimum 2)");
      setShowToast(true);
      return;
    }

    try {
      const requestData: CreateCodeRequest = {
        visitor_name: visitorName,
        visit_purpose: visitPurpose,
        notes: notes,
        multiple_persons: isMultipleVisitor,
        ...(isMultipleVisitor && { visitor_count: parseInt(visitorCount) }),
      };

      const response = await createCodeMutation.mutateAsync(requestData);
      console.log(response);
      // Navigate to success page with the generated code data
      history.push("/success-code", {
        codeData: {
          ...response?.data,
          notes,
          is_multiple_visitor: isMultipleVisitor,
          visitor_count: isMultipleVisitor ? parseInt(visitorCount) : undefined,
        },
      });
    } catch (error: any) {
      setToastMessage(
        error?.message || "Failed to generate code. Please try again."
      );
      setShowToast(true);
    }
  };

  const isFormValid =
    visitorName.trim() &&
    (!isMultipleVisitor || (visitorCount && parseInt(visitorCount) >= 2));

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle className="create-header-title">
            Create Visitor Code
          </IonTitle>
        </IonToolbar>
        {createCodeMutation.isPending && (
          <IonProgressBar type="indeterminate" color="primary" />
        )}
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="page-description">
          <p>
            Generate a secure access code for your visitor with custom time
            restrictions.
          </p>
        </div>

        <CustomInput
          icon={person}
          label="Visitor Name"
          value={visitorName}
          onIonInput={(e) => setVisitorName(e.detail.value!)}
          placeholder="Enter visitor's full name"
          required
        />

        <CustomInput
          label="Visit Purpose"
          value={visitPurpose}
          onIonInput={(e) => setVisitPurpose(e.detail.value!)}
          placeholder="Select purpose"
        />

        <div className="visitor-type-section">
          <h3 className="create-visitor-section-title">Visitor Type</h3>
          <IonList className="visitor-type-list">
            <IonRadioGroup
              value={visitorType}
              onIonChange={(e) => setVisitorType(e.detail.value)}
            >
              <IonItem className="visitor-option">
                <IonLabel>Single Visitor</IonLabel>
                <IonRadio slot="start" value="single" />
              </IonItem>

              <IonItem className="visitor-option">
                <div className="multiple-visitor-content">
                  <div className="radio-label-section">
                    <IonLabel>Multiple Visitors</IonLabel>
                    <IonRadio slot="start" value="multiple" />
                  </div>
                  {visitorType === "multiple" && (
                    <div className="visitor-count-section">
                      <CustomInput
                        icon={people}
                        label="Number of Visitors"
                        value={visitorCount}
                        onIonInput={(e) => setVisitorCount(e.detail.value!)}
                        placeholder="Enter number of visitors"
                        type="number"
                        min="2"
                        required
                      />
                    </div>
                  )}
                </div>
              </IonItem>
            </IonRadioGroup>
          </IonList>
        </div>

        <CustomInput
          icon={documentText}
          label="Optional Notes"
          value={notes}
          onIonInput={(e) => setNotes(e.detail.value!)}
          placeholder="Add any special instructions or details"
          multiline={true}
        />

        <CustomButton
          onClick={handleGenerateCode}
          disabled={!isFormValid || createCodeMutation.isPending}
          loading={createCodeMutation.isPending}
        >
          {createCodeMutation.isPending ? "Generating..." : "Generate Code"}
        </CustomButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          cssClass={
            toastMessage.includes("Failed") ? "toast-error" : "toast-success"
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateVisitorCodePage;
