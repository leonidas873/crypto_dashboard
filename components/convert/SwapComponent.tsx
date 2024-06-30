import useSWR from 'swr';
import { useEffect, useReducer } from 'react';
import AmountInput from './AmountInput';
import { IFormData, IPrices } from './types';
import { reducer, initialState } from './reducer';
import ReverseComponent from './ReverseComponent';
import { fetcher } from '@/services/fetcher';
import { toast } from 'react-toastify';

const SwapComponent: React.FC = () => {
    const { data, error } = useSWR<IPrices[]>(
        '/api/crypto-data-prices',
        fetcher
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (data) {
            dispatch({ type: 'SET_DATA', payload: data });
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (
            (value.startsWith('0') && value.length > 1 && value[1] !== '.') ||
            isNaN(Number(value))
        ) {
            return;
        }

        dispatch({
            type: 'UPDATE_AMOUNT',
            payload: { name: name as 'from' | 'to', value },
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: 'UPDATE_COIN',
            payload: { name: name as 'from' | 'to', value },
        });
    };

    const handleReverse = () => {
        dispatch({ type: 'SWAP_OPTIONS' });
    };

    const generateMinMaxError = (
        amount: number,
        min?: number,
        max?: number,
        symbol?: string
    ) => {
        if (min === undefined || max === undefined || symbol === undefined)
            return;
        if (amount < min) {
            return `Amount is less than the minimum amount (${min} ${symbol}).`;
        }
        if (amount > max) {
            return `Amount is more than the maximum amount (${max} ${symbol}).`;
        }
    };

    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    const { formData, selectedOption, inputsAreDirty } = state;
    const fromMin = selectedOption?.from.minConvertableAmount;
    const fromMax = selectedOption?.from.maxConvertableAmount;
    const toMin = selectedOption?.to.minConvertableAmount;
    const toMax = selectedOption?.to.maxConvertableAmount;

    const fromError = generateMinMaxError(
        Number(formData.from.amount),
        fromMin,
        fromMax,
        selectedOption?.from.symbol
    );
    const toError = generateMinMaxError(
        Number(formData.to.amount),
        toMin,
        toMax,
        selectedOption?.to.symbol
    );

    const handleConversion = (formdata: IFormData) => {
        toast.success(
            `you have converted  ${formdata.from.coin.symbol} into ${formdata.to.coin.symbol}`
        );
        toast.success(
            `you gained ${formdata.to.amount} ${formdata.from.coin.symbol}`
        );
        dispatch({ type: 'RESET' });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md rounded-lg bg-gray-800 p-4 shadow-md">
                <AmountInput
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    selectedOption={selectedOption ? selectedOption.from : null}
                    error={fromError}
                    inputsAreDirty={inputsAreDirty}
                    defaultOptions={data || []}
                    min={fromMin}
                    max={fromMax}
                    inputName="from"
                />
                <ReverseComponent handleReverse={handleReverse} />
                <AmountInput
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    selectedOption={selectedOption ? selectedOption.to : null}
                    error={toError}
                    inputsAreDirty={inputsAreDirty}
                    defaultOptions={data || []}
                    min={toMin}
                    max={toMax}
                    inputName="to"
                />
                <button
                    className="w-full rounded-lg bg-yellow-600 py-3 font-semibold text-gray-900"
                    onClick={() => handleConversion(formData)}
                    disabled={!formData.from.amount || !formData.to.amount}
                >
                    {!!formData.from.amount || !!formData.to.amount
                        ? 'Convert'
                        : 'Enter an amount'}
                </button>
            </div>
        </div>
    );
};

export default SwapComponent;
