import { base_url } from '../../config'

export const getData = ({ doToken }) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch(isLoading(true))
                const [orderDetails] = await Promise.all([
                    getOrderDetails({ doToken }),
                ])
                dispatch({
                    type: 'home_page-data',
                    data: orderDetails,
                })
                dispatch({
                    type: 'userForm_page-senderName-value',
                    data: orderDetails.OrderDetails.ClientName ?? '',
                })
                dispatch(isLoading(false))
                resolve(orderDetails)
            } catch (error) {
                dispatch(isLoading(false))
                reject()
            }
        })
    }
}

export const onMapClick = ({ marker }) => {
    return (dispatch, getState) => {
        const locations =
            getState().home_page_reducer.data.ClientLocations.slice()
        locations.splice(-1)
        locations.forEach((e) => (e.isSelected = false))
        const newLocation = {
            isSelected: true,
            Lat: marker.latLng.lat(),
            Lang: marker.latLng.lng(),
        }
        locations.push(newLocation)
        dispatch({
            type: 'home_page-data',
            data: {
                ...getState().home_page_reducer.data,
                ClientLocations: locations,
            },
        })
        dispatch({
            type: 'home_page-selectedLocation',
            data: newLocation,
        })
    }
}

export const handleMarkderClick = ({ item, marker, key }) => {
    return (dispatch, getState) => {
        const locations =
            getState().home_page_reducer.data.ClientLocations.slice()
        locations.splice(-1)
        locations.forEach((e) => (e.isSelected = false))
        locations.push({ ...item, isSelected: true })
        dispatch({
            type: 'home_page-data',
            data: {
                ...getState().home_page_reducer.data,
                ClientLocations: locations,
            },
        })
        dispatch({
            type: 'home_page-selectedLocation',
            data: item,
        })
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'home_page-isLoading', data: isLoading })
    }
}

const getOrderDetails = ({ doToken }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${base_url}/D/O?id=${doToken}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}
