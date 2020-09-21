import React from "react";

import { Entry } from "../types";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

interface Props {
  entry: Entry;
}

const assertNever = (entry: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(entry)}`
  );
};

const EntryDetails: React.FC<Props> = ({ entry }) => {
  switch(entry.type) {
  case "Hospital":
    return <Hospital entry={entry} />  
  case "OccupationalHealthcare":
    return <OccupationalHealthcare entry={entry} /> 
  case "HealthCheck":
    return <HealthCheck entry={entry} />
  default:
    return assertNever(entry);
  }
}

export default EntryDetails;