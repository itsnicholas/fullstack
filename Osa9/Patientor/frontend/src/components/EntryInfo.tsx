import React from "react";

import { Entry } from "../types";

interface Props {
  entry: Entry;
}

const EntryInfo: React.FC<Props> = ({ entry }) => {
  
  const codes: string[] | undefined = entry.diagnosisCodes;

  if (codes !== undefined) { 
    return (
      <div className="App">
        {entry.date} <i>{entry.description}</i>
          {codes.map((code: string | undefined, index) => 
            <li key={index}>{code}</li>
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