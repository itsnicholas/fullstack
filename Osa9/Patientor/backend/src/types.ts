// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum EntryType {
  HospitalEntry = 'Hospital',
  OccupationalHealthcareEntry = 'OccupationalHealthcare',
  HealthCheckEntry = 'HealthCheck',
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NewEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type EntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

export type HospitalEntryWithoutID = Omit<HospitalEntry, 'id'>;

export type OccupationalHealthcareEntryWithoutID = Omit<OccupationalHealthcareEntry, 'id'>;

export type HealthCheckEntryWithoutID = Omit<HealthCheckEntry, 'id'>;