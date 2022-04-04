import React from 'react'
import styles from './styles.module.scss'
// import { Alert } from 'react-bootstrap'
// const getStatus = (status) => {
//     switch (status) {
//         case 1:
//             return 'الطلبية تم قبولها بالفعل'
//         case 2:
//             return 'الطلبية قيد التجهيز'
//         case 3:
//             return 'الطلبية جاهزة للتوصيل'
//         case 4:
//             return 'الطلبية تم أخذها'
//         default:
//             return ''
//     }
// }
const Stepper = (props) => {
    return (
        <ol className={styles.stepperList}>
            <li className={props.status > 0 ? styles.active : ''}>
                <h2>1</h2>
                <p>تم القبول</p>
            </li>
            <li className={props.status > 1 ? styles.active : ''}>
                <h2>2</h2>
                <p>قيد التجهيز</p>
            </li>
            <li className={props.status > 2 ? styles.active : ''}>
                <h2>3</h2>
                <p>جاهزة للتوصيل</p>
            </li>
            <li className={props.status > 3 ? styles.active : ''}>
                <h2>4</h2>
                <p>تم أخذها</p>
            </li>
        </ol>
        // <Alert className="text-center my-3" variant="success">
        //     <h4>{getStatus(props.status)}</h4>
        // </Alert>
    )
}

export default Stepper
