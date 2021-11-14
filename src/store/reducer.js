import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import snackbarReducer from './snackbarReducer';
import gameReducer from './gameReducer';

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    game: gameReducer
});

export default reducer;
