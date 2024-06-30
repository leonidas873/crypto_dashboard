export interface iAmountInputProps {
    formData: IFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedOption: IPrices | null;
    error: string | undefined;
    inputsAreDirty: boolean;
    defaultOptions: IPrices[];
    min: number | undefined;
    max: number | undefined;
    inputName: 'from' | 'to';
}

export interface IPrices {
    symbol: string;
    unitPrice: number;
    minConvertableAmount: number;
    maxConvertableAmount: number;
}

export interface IFormData {
    from: {
        coin: {
            symbol: string;
            unitPrice: number;
        };
        amount: string;
        price: number;
    };
    to: {
        coin: {
            symbol: string;
            unitPrice: number;
        };
        amount: string;
        price: number;
    };
}
