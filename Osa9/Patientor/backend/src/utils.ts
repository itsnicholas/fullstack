import { NewPatientEntry, Gender } from './types';
import { FinnishSSN } from 'finnish-ssn'

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  }

  return newEntry;
}

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing comment: ' + name);
  }

  return name;
}

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSsn = (ssn: any): string => {
  if (!FinnishSSN.validate(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
    
  return ssn;
};

const parseOccupation = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing comment: ' + name);
  }

  return name;
}

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }

  return gender;
};

//const parseEntries = (entries: any): Entry => {
//  var i;
//  for (i = 0; i < entries.length; i++) {
//    if (!isEntry(entries[i])) {
//      throw new Error('Incorrect or missing entry: ' + entries[i])
//    }
//  }
//
// return entries;
//};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

//const isEntry = (param: any): param is Entry => {
//  return param instanceof Entry
//  return Object.type(Entry).includes(param);
//};

export default toNewPatientEntry;