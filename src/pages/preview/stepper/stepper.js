import React from 'react'
import styles from './styles.module.scss'
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
    )
}

export default Stepper
