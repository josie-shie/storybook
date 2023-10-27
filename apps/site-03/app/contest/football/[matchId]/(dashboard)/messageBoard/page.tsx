import Image from 'next/image';
import DemoImage from './img/demo.jpg';

function Page() {
    return (
        <Image
            alt=""
            src={DemoImage}
            style={{ width: '100%', height: 'auto', marginTop: '-8px' }}
        />
    );
}

export default Page;
