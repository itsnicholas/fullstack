/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry, EntryType, DiagnoseEntry } from './types';
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
  const newDiagnoseEntry: DiagnoseEntry = {
    code: parseCode(object.code),
    name: parseName(object.name),
    latin: parseLatin(object.latin),
  };

  return newDiagnoseEntry;
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

export default { toNewPatientEntry, toNewDiagnoseEntry };