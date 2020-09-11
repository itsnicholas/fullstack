import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { DetailedPatient, Gender } from "../types";

const PatientInfo: React.FC = () => {
  const [{ detailedPatients }, dispatch] = useStateValue();
  const [{ patients }, ] = useStateValue();
  const { id } = useParams<{ id: string }>();

  
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<DetailedPatient>(
          `${apiBaseUrl}/api/patients/${id}`
        );
        dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    if (detailedPatients[id] !== patients[id]) {
      fetchPatient();
    }
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