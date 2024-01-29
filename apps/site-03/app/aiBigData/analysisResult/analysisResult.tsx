import Link from 'next/link';
import Bodan from '../components/bodan/bodan';

function AnalysisResult() {
    return (
        <div>
            智能分析結果頁
            <Link href="/football/4053571/analyze">去賽事</Link>
            <Bodan />
        </div>
    );
}

export default AnalysisResult;
