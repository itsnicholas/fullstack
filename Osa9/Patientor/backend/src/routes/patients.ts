import express from 'express';
import patientService from '../services/patientService';
import util from '../utils';
//import { EntryFormValues } from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    res.send(patientService.getEntry(id));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = util.toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    switch(req.body.type) {
      case "Hospital":
        const newEntries1 = util.toNewEntryEntriesHospital(req.body);
        const addedEntries1 = patientService.addEntriessHospital(newEntries1, id);
        return res.json(addedEntries1);
      case "OccupationalHealthcare":
        const newEntries2 = util.toNewEntryEntriesOccupationalHealthcare(req.body);
        const addedEntries2 = patientService.addEntriesOccupationalHealthcare(newEntries2, id);
        return res.json(addedEntries2);
      case "HealthCheck":
        const newEntries3 = util.toNewEntryEntriesHealthCheckEntry(req.body);
        const addedEntries3 = patientService.addEntriesHealthCheckEntry(newEntries3, id);
        return res.json(addedEntries3);
      default:
        return assertNever(req.body);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

const assertNever = (entry: any): any => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(entry)}`
  );
};

export default router;