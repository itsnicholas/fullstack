import { State } from "./state";
import { Patient, DetailedPatient, DiagnoseEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: DetailedPatient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: DiagnoseEntry[];
    };

export const setPatientList = (patientListFromApi: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST" as const,
    payload: patientListFromApi
  }
}

export const setNewPatient = (newPatient: Patient) => {
  return {
    type: "ADD_PATIENT" as const, 
    payload: newPatient 
  }
}

export const updatePatientList2 = (patientFromApi: DetailedPatient) => {
  return {
    type: "UPDATE_PATIENT" as const,
    payload: patientFromApi
  }
}

export const setDiagnosisList = (diagnosisListFromApi: DiagnoseEntry[]) => {
  return {
    type: "SET_DIAGNOSIS_LIST" as const,
    payload: diagnosisListFromApi
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        detailedPatients: {
          ...state.detailedPatients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
