let defaultState = {
    isLoading: false,
    submitError: '',
    senderName: '',
    notes: '',
}

const userForm_page_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'userForm_page-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'userForm_page-submitError':
            return {
                ...state,
                submitError: action.data,
            }
        case 'userForm_page-senderName-value':
            return {
                ...state,
                senderName: action.data,
            }
        case 'userForm_page-notes-value':
            return {
                ...state,
                notes: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default userForm_page_reducer
