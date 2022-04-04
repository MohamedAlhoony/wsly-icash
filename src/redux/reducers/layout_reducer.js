let defaultState = {
    toast: {
        msg: '',
        show: false,
        header: '',
        isWarning: false,
        isAutoRemove: false,
    },
}

const layout_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'layout_reducer-toast':
            return {
                ...state,
                toast: { ...action.data },
            }

        default:
            return {
                ...state,
            }
    }
}

export default layout_reducer
