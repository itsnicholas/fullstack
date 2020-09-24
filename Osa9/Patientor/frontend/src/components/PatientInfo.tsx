import React from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import AddHospitalModal from "../AddPatientModal/AddHospitalModal";
import AddOccupationalHealthcareModal from "../AddPatientModal/AddOccupationalHealthcareModal";
import EntryDetails from "./EntryDetails";
import { updatePatientList2, setDiagnosisList } from "../state/reducer";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { EntryFormValues, DetailedPatient, Gender, Entry, DiagnoseEntry } from "../types";

const PatientInfo: React.FC = () => {
  const [{ detailedPatients }, dispatch] = useStateValue();
  const [{ patients }, ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalHospitalFormOpen, setHospitalFormModalOpen] = React.useState<boolean>(false);
  const [modalOccupationalHealthcareFormOpen, setOccupationalHealthcareFormModalOpen] = React.useState<boolean>(false);
  
  const [error, setError] = React.useState<string | undefined>();

  const openHospitalFormModal = (): void => setHospitalFormModalOpen(true);
  const openOccupationalHealthcareFormModal = (): void => setOccupationalHealthcareFormModalOpen(true);

  const closeHospitalFormModal = (): void => {
    setHospitalFormModalOpen(false);
    setError(undefined);
  };

  const closeOccupationalHealthcareFormModal = (): void => {
    setOccupationalHealthcareFormModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const updatePatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<DetailedPatient>(
          `${apiBaseUrl}/api/patients/${id}`
        );
        dispatch(updatePatientList2(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (detailedPatients[id] !== patients[id]) {
      updatePatient();
    }
    const fetchPatientList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<DiagnoseEntry[]>(
          `${apiBaseUrl}/api/diagnoses`
          );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
      };
        fetchPatientList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values, 'values in post function in PatientInfo.tsx')
      const { data: updatedPatient } = await axios.post<DetailedPatient>(
        `${apiBaseUrl}/api/patients/${id}/entries`,
        values
      );
      console.log(values, 'values in post function in PatientInfo.tsx')
      dispatch(updatePatientList2(updatedPatient));
      closeOccupationalHealthcareFormModal();
      closeHospitalFormModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
  
  if (detailedPatients[id] !== undefined) {
    var button;

    if (detailedPatients[id].gender === Gender.Female) {
      button = <Icon name='venus' size='big' />;
    } else if (detailedPatients[id].gender === Gender.Male) {
      button = <Icon name='mars' size='big' />;
    } else {
      button = <Icon name='genderless' size='big' />;
    }

    return (
      <div className="App">
        <Container textAlign="left">
          <h3>{detailedPatients[id].name} {button}</h3> 
          <div>ssn: {detailedPatients[id].ssn}</div>
          <div>occupation: {detailedPatients[id].occupation}</div>
          <h4>entries</h4>
            {detailedPatients[id].entries.map((entry: Entry, index) => 
              <EntryDetails key={index} entry={entry} />
            )}
          <br />
          <AddHospitalModal
            modalOpen={modalHospitalFormOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeHospitalFormModal}
          />
          <Button onClick={() => openHospitalFormModal()}>Add New Hospital Entry</Button>
          <br />
          <br />
          <AddOccupationalHealthcareModal
            modalOpen={modalOccupationalHealthcareFormOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeOccupationalHealthcareFormModal}
          />
          <Button onClick={() => openOccupationalHealthcareFormModal()}>Add New Occupational Healthcare Entry</Button>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
      </div>
    );
  }
};


export default PatientInfo;