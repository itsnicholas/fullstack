import express from 'express';
import patientService from '../services/patientService';
import util from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('We got patients')
  res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, 'req.params.id in patients.ts')
    res.send(patientService.getEntry(id));
  } catch (e) {
    res.status(404).send(e.message);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = util.toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

export default router;