import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import style from './loading.module.scss';

function Loading() {
    return (
        <div className={`ui-loading ${style.loading}`}>
            <CircularProgress size={24} style={{ color: '#4489ff' }} />
        </div>
    );
}

export default Loading;
