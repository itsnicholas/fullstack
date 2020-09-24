import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalHealthcareForm from './AddOccupationalHealthcareForm';
import { OccupationalHealthcareEntryWithoutID } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareEntryWithoutID) => void;
  error?: string;
}

const AddOccupationalHealthcareModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a occupational healthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOccupationalHealthcareModal;