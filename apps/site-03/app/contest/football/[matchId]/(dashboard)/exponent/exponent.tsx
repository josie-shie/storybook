'use client';
import type { GetExponentResponse } from 'data-center';
import { creatExponentStore } from './exponentStore';
import ExponentTable from './exponentTable';

function Exponent({ exponentData }: { exponentData: GetExponentResponse }) {
    creatExponentStore({ exponentData });
    return <ExponentTable />;
}

export default Exponent;
