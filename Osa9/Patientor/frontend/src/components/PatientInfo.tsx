import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import EntryDetails from "./EntryDetails";
import { updatePatientList2, setDiagnosisList } from "../state/reducer";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { DetailedPatient, Gender, Entry, DiagnoseEntry } from "../types";

const PatientInfo: React.FC = () => {
  const [{ detailedPatients }, dispatch] = useStateValue();
  const [{ patients }, ] = useStateValue();
  const { id } = useParams<{ id: string }>();

  
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