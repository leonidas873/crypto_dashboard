import { produce } from 'immer';
import { IPrices, IFormData } from './types';

export type Action =
    | { type: 'SET_DATA'; payload: IPrices[] }
    | { type: 'SET_FORM_DATA'; payload: Partial<IFormData> }
    | { type: 'SET_SELECTED_OPTION'; payload: { from: IPrices; to: IPrices } }
    | { type: 'SWAP_OPTIONS' }
    | { type: 'UPDATE_AMOUNT'; payload: { name: 'from' | 'to'; value: string } }
    | { type: 'UPDATE_COIN'; payload: { name: 'from' | 'to'; value: string } }
    | { type: 'RESET' };

export interface IInitialState {
    data: IPrices[] | null;
    formData: IFormData;
    selectedOption: { from: IPrices; to: IPrices } | null;
    inputsAreDirty: boolean;
}

export const initialState: IInitialState = {
    data: null,
    formData: {
        from: { coin: { symbol: '', unitPrice: 0 }, amount: '', price: 0 },
        to: { coin: { symbol: '', unitPrice: 0 }, amount: '', price: 0 },
    },
    selectedOption: null,
    inputsAreDirty: false,
};

export const reducer = (
    state: IInitialState,
    action: Action
): IInitialState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'SET_DATA':
                const [firstCoin, secondCoin] = action.payload;
                draft.data = action.payload;
                draft.selectedOption = { from: firstCoin, to: secondCoin };
                draft.formData = {
                    from: { coin: firstCoin, amount: '', price: 0 },
                    to: { coin: secondCoin, amount: '', price: 0 },
                };
                break;
            case 'SET_FORM_DATA':
                Object.assign(draft.formData, action.payload);
                break;
            case 'SET_SELECTED_OPTION':
                draft.selectedOption = action.payload;
                break;
            case 'SWAP_OPTIONS':
                if (draft.selectedOption) {
                    [draft.selectedOption.from, draft.selectedOption.to] = [
                        draft.selectedOption.to,
                        draft.selectedOption.from,
                    ];
                    [draft.formData.from, draft.formData.to] = [
                        draft.formData.to,
                        draft.formData.from,
                    ];
                }
                break;
            case 'UPDATE_AMOUNT':
                const { name, value } = action.payload;
                const amount = value === '' ? '' : parseFloat(value);
                const unitPrice = draft.formData[name].coin.unitPrice;

                draft.formData[name].amount = value;
                draft.formData[name].price =
                    amount === '' ? 0 : amount * unitPrice;

                const otherName = name === 'from' ? 'to' : 'from';
                const otherUnitPrice = draft.formData[otherName].coin.unitPrice;
                const otherAmount =
                    amount === '' ? '' : (amount * unitPrice) / otherUnitPrice;

                draft.formData[otherName].amount =
                    otherAmount === '' ? '' : otherAmount.toFixed(8);
                draft.formData[otherName].price =
                    otherAmount === '' ? 0 : otherAmount * otherUnitPrice;

                draft.inputsAreDirty = true;
                break;
            case 'UPDATE_COIN':
                const selectedCoin = state.data?.find(
                    (coin) => coin.symbol === action.payload.value
                );
                if (selectedCoin) {
                    const field = action.payload.name;
                    draft.selectedOption![field] = selectedCoin;
                    draft.formData[field].coin = selectedCoin;
                    const amountValue = parseFloat(
                        draft.formData[field].amount
                    );
                    draft.formData[field].price = isNaN(amountValue)
                        ? 0
                        : amountValue * selectedCoin.unitPrice;

                    const oppositeField = field === 'from' ? 'to' : 'from';
                    const oppositeAmount = isNaN(amountValue)
                        ? ''
                        : (amountValue * selectedCoin.unitPrice) /
                          draft.formData[oppositeField].coin.unitPrice;
                    draft.formData[oppositeField].amount =
                        oppositeAmount === '' ? '' : oppositeAmount.toFixed(8);
                    draft.formData[oppositeField].price =
                        oppositeAmount === ''
                            ? 0
                            : oppositeAmount *
                              draft.formData[oppositeField].coin.unitPrice;
                }
                break;
            case 'RESET':
                draft.formData.from.amount = '';
                draft.formData.to.amount = '';
                draft.formData.from.price = 0;
                draft.formData.to.price = 0;
                draft.inputsAreDirty = false;
                return draft;
            default:
                return state;
        }
    });
};
