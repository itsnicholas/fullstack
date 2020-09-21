import React from "react";
import { Icon } from "semantic-ui-react";

import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";


interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }, ] = useStateValue();
  
  const codes: string[] | undefined = entry.diagnosisCodes;

  if (codes !== undefined && diagnoses !== undefined) { 
      return (
        <div className="App">
          {entry.date} <Icon name='doctor' size='big' />
          <br /><i>{entry.description}</i>
          {codes.map((code: string, index) => 
            <li key={index}>{code} {diagnoses[code]?.name}</li>
          )} 
        </div>
      );
    } else {
      return (
        <div className="App">
          {entry.date} <Icon name='doctor' size='big' /> {entry.employerName}
          <br /><i>{entry.description}</i>
        </div>
      );
    }
};

export default OccupationalHealthcare;