import React from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import AddEntryModal from "../AddPatientModal/AddEntryModal";
import EntryDetails from "./EntryDetails";
import { updatePatientList2, setDiagnosisList } from "../state/reducer";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { EntryFormValues, DetailedPatient, Gender, Entry, DiagnoseEntry } from "../types";

const PatientInfo: React.FC = () => {
  const [{ detailedPatients }, dispatch] = useStateValue();
  const [{ patients }, ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
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
      closeModal();
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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
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