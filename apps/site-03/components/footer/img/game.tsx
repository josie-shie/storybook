import React from 'react';

function GameIcon({ fill }: { fill?: string }) {
    return (
        <svg
            fill="none"
            height="24"
            viewBox="0 0 22 24"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Game">
                <path
                    d="M20 1H2C1.44772 1 1 1.4701 1 2.05V20.95C1 21.5299 1.44772 22 2 22H20C20.5523 22 21 21.5299 21 20.95V2.05C21 1.4701 20.5523 1 20 1Z"
                    fill={fill}
                    id="Vector"
                />
                <path
                    d="M11 3.05554L11 19.6667"
                    id="Vector_2"
                    stroke="#D9D9D9"
                    strokeDasharray="3 3"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    clipRule="evenodd"
                    d="M14.2002 8.48611V15.1944H17.7002V8.48611H14.2002Z"
                    fillRule="evenodd"
                    id="Vector_3"
                    stroke="white"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    d="M4.51953 8.48611H8.01953V15.1944H4.51953"
                    id="Vector_4"
                    stroke="white"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    d="M8.08301 11.8403H5.45801"
                    id="Vector_5"
                    stroke="white"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
}

export default GameIcon;
