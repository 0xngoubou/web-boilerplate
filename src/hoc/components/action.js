import { SET_DATA } from '../../store/data-action';

const initialState = {
    data: null,
    isLoading: false,
}

export const login = data => {
    return SET_DATA({
        _path: 'user',
        _value: {
            data,
            isLoading: false,
        },
    });
};

export function logout() {
    return SET_DATA({
        _path: 'user',
        _value: initialState,
    });
}
