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
        return;
      case "OccupationalHealthcare":
        const newEntries = util.toNewEntryEntriesOccupationalHealthcare(req.body);
        const addedEntries = patientService.addEntriesOccupationalHealthcare(newEntries, id);
        return res.json(addedEntries);
      case "HealthCheck":
        return;
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