let defaultState = {
    isLoading: false,
    selectedLocation: null,
    data: null,
}

const home_page_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'home_page-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'home_page-selectedLocation':
            return {
                ...state,
                selectedLocation: action.data,
            }
        case 'home_page-data':
            return {
                ...state,
                data: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default home_page_reducer
