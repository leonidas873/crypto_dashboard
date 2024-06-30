import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/cryptoDetails/Chart'), {
    ssr: false,
});
const CryptoDetails = dynamic(
    () => import('@/components/cryptoDetails/CryptoDetails'),
    {
        ssr: false,
    }
);

const CryptoPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <CryptoDetails />
            <Chart limit={1000} symbol={id as string} />
        </div>
    );
};

export default CryptoPage;
