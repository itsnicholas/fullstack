/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HealthCheckRating, Discharge, NewPatientEntry, Gender, Entry, EntryType, DiagnoseEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from './types';
//import { FinnishSSN } from 'finnish-ssn'

const toNewPatientEntry = (object: any): NewPatientEntry => {
  console.log(object.entries, 'object.entries in utils.ts');
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };

  return newEntry;
};

const toNewDiagnoseEntry = (object: any): DiagnoseEntry => {
  if (!object.latin) {
    const newDiagnoseEntry: DiagnoseEntry = {
      code: parseCode(object.code),
      name: parseName(object.name),
    };

    return newDiagnoseEntry;
  } else {
  const newDiagnoseEntry: DiagnoseEntry = {
    code: parseCode(object.code),
    name: parseName(object.name),
    latin: parseLatin(object.latin),
  };

  return newDiagnoseEntry;
  }
};

const toNewEntryEntries = (object: any): HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry => {
  switch(object.type) {
    case "Hospital":
      if (!object.diagnosisCodes) {
      const newEntry1: HospitalEntry = {
        id: parseId(object.id),
        description: parseDescription(object.id),
        date: parseDate(object.id),
        specialist: parseSpecialist(object.id),
        type: object.type,
        discharge: parseDischarge(object.discharge),
      };
        return newEntry1;
      } else {
        const newEntry1: HospitalEntry = {
          id: parseId(object.id),
          description: parseDescription(object.id),
          date: parseDate(object.id),
          specialist: parseSpecialist(object.id),
          type: object.type,
          discharge: parseDischarge(object.discharge),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
        return newEntry1;
      }
    case "OccupationalHealthcare":
      if (!object.diagnosisCodes) {
      const newEntry2: OccupationalHealthcareEntry = {
        id: parseId(object.id),
        description: parseDescription(object.id),
        date: parseDate(object.id),
        specialist: parseSpecialist(object.id),
        type: object.type,
        employerName: parseEmployerName(object.employerName)
      };
        return newEntry2;
      } else {
        const newEntry1: OccupationalHealthcareEntry = {
          id: parseId(object.id),
          description: parseDescription(object.id),
          date: parseDate(object.id),
          specialist: parseSpecialist(object.id),
          type: object.type,
          employerName: parseEmployerName(object.employerName),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
        return newEntry1;
      }     
    case "HealthCheck":
      if (!object.diagnosisCodes) {
        const newEntry3: HealthCheckEntry = {
          id: parseId(object.id),
          description: parseDescription(object.id),
          date: parseDate(object.id),
          specialist: parseSpecialist(object.id),
          type: object.type,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newEntry3;
      } else {
        const newEntry1: HealthCheckEntry = {
          id: parseId(object.id),
          description: parseDescription(object.id),
          date: parseDate(object.id),
          specialist: parseSpecialist(object.id),
          type: object.type,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
        return newEntry1;
      }     
    default:
      return assertNever(object);
    }
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
  //if (!FinnishSSN.validate(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
    
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseGender = (gender: any): Gender => {
  console.log(gender);
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseCode = (code: any): string => {
  if (!code || !isString(code)) {
    throw new Error('Incorrect or missing code: ' + code);
  }

  return code;
};

const parseLatin = (latin: any): string => {
  if (latin) {
    if (!isString(latin)) {
      throw new Error('Incorrect or missing comment: ' + latin);
    }
  }
 return latin;
};

const parseEntries = (entries: any[]): Entry[] => {
  if (!entries || entries.length === 0) {
    return [];
  }
  console.log(entries, 'entires in utils.ts');
  entries.forEach((entry: any) => {
    if (!isEntry(entry.type)) {
      throw new Error('Incorrect or missing entry: ' + entry);
    }
  });

  return entries;
};

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id: ' + id);
  }

  return id;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }

  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }

  return specialist;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }

  return employerName;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isString(discharge.date) || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  return discharge;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }

  return healthCheckRating;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (!diagnosisCodes) {
    throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes)
  }
  var i;
  for (i = 0; i < diagnosisCodes.length; i++) {
    if (!isString(diagnosisCodes[i])) {
      throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
    }
  }

  return diagnosisCodes;
};

const assertNever = (entry: any): any => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(entry)}`
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntry = (param: any): param is EntryType => {
  console.log(param, 'param in tuils.ts');
  return Object.values(EntryType).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export default { toNewPatientEntry, toNewDiagnoseEntry, toNewEntryEntries };