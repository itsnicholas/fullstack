import React from "react";
import { Icon } from "semantic-ui-react";

import { HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";


interface Props {
  entry: HealthCheckEntry;
}

const HealthCheck: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }, ] = useStateValue();

  const codes: string[] | undefined = entry.diagnosisCodes;

  console.log(entry.healthCheckRating, 'entry.healthCheckRating');
  console.log(HealthCheckRating["Healthy"], 'HealthCheckRating["Healthy"]');

  var button;

  if (entry.healthCheckRating === HealthCheckRating["Healthy"]) {
    button = <Icon color='green' name='heart' size='small' />;
  } else if (entry.healthCheckRating === HealthCheckRating["LowRisk"]) {
    button = <Icon color='yellow' name='heart' size='small' />;
  } else if (entry.healthCheckRating === HealthCheckRating["HighRisk"]) {
    button = <Icon color='purple' name='heart' size='small' />;  
  } else {
    button = <Icon color='black' name='heart' size='small' />;
  }

  if (codes !== undefined && diagnoses !== undefined) { 

     return (
      <div className="App">
        {entry.date} <Icon name='stethoscope' size='big' />
        <br /><i>{entry.description}</i>
        {codes.map((code: string, index) => 
          <li key={index}>{code} {diagnoses[code]?.name}</li>
        )}
        <br />{button}
      </div>
    );
  } else {
    return (
      <div className="App">
        {entry.date}  <Icon name='stethoscope' size='big' />
        <br /><i>{entry.description}</i>
        <br />{button}
      </div>
    );
  }
};

export default HealthCheck;