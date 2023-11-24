import React, { FC } from 'react';
import { Modal, Box } from '@mui/material';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activarItem: any;
  component: any;
  setRoute: (route: string) => void;
};

const CustomModal: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        className="w-full bg-white dark:bg-slate-900 rounded-lg p-4"
        style={{ maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }}
      >
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
