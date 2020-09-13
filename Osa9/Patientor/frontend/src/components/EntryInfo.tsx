import React from "react";
import axios from "axios";

import { Entry, DiagnoseEntry } from "../types";
import { setDiagnosisList } from "../state/reducer";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

interface Props {
  entry: Entry;
}

const EntryInfo: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  
  React.useEffect(() => {
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
    }, [dispatch]);

    console.log(diagnoses, 'diagnoses in EntryInfo')
    console.log(entry, 'entry in EntryInfo')
  
  const codes: string[] | undefined = entry.diagnosisCodes;

  if (codes !== undefined && diagnoses !== undefined) { 
  //  const diagnosesFiltered: DiagnoseEntry[] | undefined = 
  //  diagnoses.map((diagnosis: DiagnoseEntry) =>
  //  codes.includes(diagnosis.code)
  //);
      return (
        <div className="App">
          {entry.date} <i>{entry.description}</i>
          {codes.map((code: string, index) => 
            <li key={index}>{code} {diagnoses[code]?.name}</li>
          )} 
        </div>
      );
    } else {
      return (
        <div className="App">
          {entry.date} <i>{entry.description}</i>
        </div>
      );
    }
};

export default EntryInfo;