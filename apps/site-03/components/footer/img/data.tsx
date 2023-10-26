import React from 'react';

function DataIcon({ fill }: { fill?: string }) {
    return (
        <svg
            fill="none"
            height="24"
            viewBox="0 0 20 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Data">
                <path d="M7 14H1V23H7V14Z" fill={fill} id="Vector" />
                <path d="M13 9H7V23H13V9Z" fill={fill} id="Vector_2" />
                <path d="M19 3H13V23H19V3Z" fill={fill} id="Vector_3" />
            </g>
        </svg>
    );
}

export default DataIcon;
