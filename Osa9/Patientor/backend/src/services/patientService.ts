import patients from '../../data/patients';

import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

const addEntry = ( entry: NewPatientEntry): PatientEntry => {
    let id = 'd' + String(Math.floor(Math.random() * Math.floor(9999999))) + '-f723-11e9-8f0b-362b9e155667'
    const newPatientEntry = {
      id: id,
      ...entry
    }
  
  patients.push(newPatientEntry);
  return newPatientEntry;  
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};