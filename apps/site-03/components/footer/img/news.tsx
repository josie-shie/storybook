import React from 'react';

function DataIcon({ fill }: { fill?: string }) {
    return (
        <svg
            fill="none"
            height="25"
            viewBox="0 0 24 25"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="News">
                <path
                    d="M22 24V9H12L12.55 12.75L13.1 16.5L13.65 20.25H11V24H22Z"
                    fill={fill}
                    id="Vector"
                />
                <path
                    d="M14 17H17"
                    id="Vector_2"
                    stroke="white"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    d="M14 14H17"
                    id="Vector_3"
                    stroke="white"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    d="M1 5H11.7391L12.3043 9L12.8696 13L13.4348 17L14 21H9.47826H1V5Z"
                    fill={fill}
                    id="Vector_4"
                />
                <path
                    d="M5 10H8"
                    id="Vector_5"
                    stroke="white"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    d="M5 13H9"
                    id="Vector_6"
                    stroke="white"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
}

export default DataIcon;
