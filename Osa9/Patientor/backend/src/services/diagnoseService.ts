import diagnoseData from '../../data/diagnoses'

import { DiagnoseEntry } from '../types';

//const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoseData;
};

const getEntry = ( name: string ): DiagnoseEntry | undefined => {
  const patient = diagnoseData.find(diagnosis => diagnosis.name === name)
  return patient;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getEntry,
  addEntry
};