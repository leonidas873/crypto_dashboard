import { iAmountInputProps } from './types';

const AmountInput: React.FC<iAmountInputProps> = ({
    formData,
    handleInputChange,
    handleSelectChange,
    selectedOption,
    error,
    inputsAreDirty,
    defaultOptions,
    min,
    max,
    inputName,
}) => {
    return (
        <div className="mb-4">
            <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">
                    {inputName === 'from' ? 'From' : 'To'}
                </span>
            </div>
            <div
                className={
                    'flex items-center justify-between rounded-lg border border-gray-700 bg-gray-700 p-3 focus-within:border-yellow-500' +
                    (error && inputsAreDirty ? ' border-red-500' : '')
                }
            >
                <div>
                    <input
                        type="text"
                        name={inputName}
                        value={formData[inputName].amount}
                        onChange={handleInputChange}
                        placeholder={`${min} - ${max}`}
                        className="border-none bg-transparent text-xl focus:outline-none"
                    />
                    <span className="block text-xs text-gray-400">
                        ≈ ${formData[inputName].price.toFixed(2) || '0.00'}
                    </span>
                </div>
                <div className="flex items-center">
                    <select
                        className="rounded-lg border border-gray-600 bg-gray-800 p-1 text-white"
                        name={inputName}
                        onChange={handleSelectChange}
                        value={selectedOption?.symbol || ''}
                    >
                        {defaultOptions.map((item) => (
                            <option key={item.symbol} value={item.symbol}>
                                {item.symbol}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {error && inputsAreDirty && (
                <div className="text-sm text-red-400">{error}</div>
            )}
        </div>
    );
};

export default AmountInput;
