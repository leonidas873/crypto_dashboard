import { FC } from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';

interface ReverseComponentProps {
    handleReverse: () => void;
}

const ReverseComponent: FC<ReverseComponentProps> = ({ handleReverse }) => {
    return (
        <div className="flex justify-center">
            <button onClick={handleReverse}>
                <CgArrowsExchangeAltV className="cursor-pointer text-[40px] opacity-65 hover:opacity-100" />
            </button>
        </div>
    );
};

export default ReverseComponent;
