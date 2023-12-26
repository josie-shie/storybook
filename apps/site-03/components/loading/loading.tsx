import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import style from './loading.module.scss';

function Loading({
    backgroundColor,
    loadingText
}: {
    backgroundColor?: string;
    loadingText?: string;
}) {
    return (
        <div className={`ui-loading ${style.loading}`} style={{ backgroundColor }}>
            <CircularProgress size={24} style={{ color: '#4489ff' }} />
            {loadingText}
        </div>
    );
}

export default Loading;
