import React from 'react';

function DataIcon({ fill }: { fill?: string }) {
    return (
        <svg
            fill="red"
            height="25"
            viewBox="0 0 24 25"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Home">
                <path
                    d="M2.81727 8.734C2.30352 9.11075 2 9.70972 2 10.3468V22C2 23.1046 2.89543 24 4 24H20C21.1046 24 22 23.1046 22 22V10.3468C22 9.70972 21.6965 9.11075 21.1827 8.734L13.1827 2.86733C12.4787 2.35108 11.5213 2.35108 10.8173 2.86733L2.81727 8.734Z"
                    fill={fill}
                    id="Vector"
                />
                <rect
                    fill="white"
                    height="6"
                    id="Rectangle 3466944"
                    rx="2"
                    width="6"
                    x="9"
                    y="14"
                />
            </g>
        </svg>
    );
}

export default DataIcon;
