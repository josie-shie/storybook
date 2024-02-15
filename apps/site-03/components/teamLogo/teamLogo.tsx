'use client';

import Image from 'next/image';
import { useState } from 'react';
import DefaultTeamLogoIcon from './img/defaultTeamLogo.png';
import style from './teamLogo.module.scss';

interface TeamLogoType {
    src: string;
    height?: number;
    width?: number;
    alt?: string;
    className?: string;
}

function TeamLogo({ src, height, width, alt, className }: TeamLogoType) {
    const [teamLogoStatus, setTeamLogoStatus] = useState(true);
    return (
        <>
            {src &&
            teamLogoStatus &&
            !(!src.startsWith('/') && !src.startsWith('http://') && !src.startsWith('https://')) ? (
                <Image
                    alt={alt || ''}
                    className={`${style.teamLogo} ${className}`}
                    height={height}
                    onError={() => {
                        setTeamLogoStatus(false);
                    }}
                    src={src || ''}
                    width={width}
                />
            ) : (
                <Image alt={alt || ''} height={height} src={DefaultTeamLogoIcon} width={width} />
            )}
        </>
    );
}

export default TeamLogo;
