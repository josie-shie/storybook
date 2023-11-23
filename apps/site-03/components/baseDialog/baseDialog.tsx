import Dialog from '@mui/material/Dialog';
import type { ReactNode } from 'react';

interface DialogProps {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
}

function BaseDialog({ open, onClose, children }: DialogProps) {
    return (
        <Dialog
            PaperProps={{
                style: {
                    width: '300px',
                    padding: '16px',
                    borderRadius: '15px'
                }
            }}
            onClose={onClose}
            open={open}
        >
            {children}
        </Dialog>
    );
}

export default BaseDialog;
