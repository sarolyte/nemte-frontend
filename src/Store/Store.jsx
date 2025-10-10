import { createContext, useContext, useReducer } from "react";

export const AppContext = createContext()

//actions dispatched to update global state
function appReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }

        default: 
            return state
    }
}

//deafault state
const initialState = {
    isLoading: false,
    error: null,
}

//provides state and dispatch to all children
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return <AppContext.Provider value={{ state, dispatch }}>
        {children}
    </AppContext.Provider>

}

//cutom hook
export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used in AppProvider')
    }
    return {
        state: context.state,
        actions: {
            setLoading: (bool) => context.dispatch({ type: 'SET_LOADING', payload: bool }),
            setError: (msg) => context.dispatch({ type: 'SET_ERROR', payload: msg })
        }
    }
}