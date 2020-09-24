import patients from '../../data/patients';

import { HospitalEntry, HealthCheckEntry, HospitalEntryWithoutID, HealthCheckEntryWithoutID, OccupationalHealthcareEntryWithoutID, OccupationalHealthcareEntry, NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Entry } from '../types';

//export type EntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getEntry = ( id: string ): PatientEntry | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
    entries
  }));
};

const addEntry = ( entry: NewPatientEntry ): PatientEntry => {
    const id = 'd' + String(Math.floor(Math.random() * Math.floor(9999999))) + '-f723-11e9-8f0b-362b9e155667';
    const newPatientEntry = {
      id: id,
      ...entry
    };
  
  patients.push(newPatientEntry);
  return newPatientEntry;  
};

const addEntriessHospital = ( entry: HospitalEntryWithoutID, id: string ): PatientEntry | undefined  => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    const id = 'd' + String(Math.floor(Math.random() * Math.floor(9999999))) + '-c4b4-4fec-ac4d-df4fe1f85f62';
    var entries: Entry[] = [];
    entries = patient.entries;
    const updatedEntry: HospitalEntry = {
      id: id,
      ...entry
    };
    entries.push(updatedEntry);
    const updatedPatientEntry: PatientEntry = {
      ...patient,
      entries: entries
    };
    patients.filter(p => p !== patient);
    patients.push(updatedPatientEntry);
    return updatedPatientEntry; 
  } 
   return patient;
};

const addEntriesOccupationalHealthcare = ( entry: OccupationalHealthcareEntryWithoutID, id: string ): PatientEntry | undefined  => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    const id = 'd' + String(Math.floor(Math.random() * Math.floor(9999999))) + '-c4b4-4fec-ac4d-df4fe1f85f62';
    var entries: Entry[] = [];
    entries = patient.entries;
    const updatedEntry: OccupationalHealthcareEntry = {
      id: id,
      ...entry
    };
    entries.push(updatedEntry);
    const updatedPatientEntry: PatientEntry = {
      ...patient,
      entries: entries
    };
    patients.filter(p => p !== patient);
    patients.push(updatedPatientEntry);
    return updatedPatientEntry; 
  } 
   return patient;
};

const addEntriesHealthCheckEntry = ( entry: HealthCheckEntryWithoutID, id: string ): PatientEntry | undefined  => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    const id = 'd' + String(Math.floor(Math.random() * Math.floor(9999999))) + '-c4b4-4fec-ac4d-df4fe1f85f62';
    var entries: Entry[] = [];
    entries = patient.entries;
    const updatedEntry: HealthCheckEntry = {
      id: id,
      ...entry
    };
    entries.push(updatedEntry);
    const updatedPatientEntry: PatientEntry = {
      ...patient,
      entries: entries
    };
    patients.filter(p => p !== patient);
    patients.push(updatedPatientEntry);
    return updatedPatientEntry; 
  } 
   return patient;
};

export default {
  getEntries,
  addEntry,
  getEntry,
  getNonSensitiveEntries,
  addEntriessHospital,
  addEntriesOccupationalHealthcare,
  addEntriesHealthCheckEntry
};