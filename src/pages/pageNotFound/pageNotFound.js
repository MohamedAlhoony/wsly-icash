import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
const PageNotFound = () => {
    return (
        <div
            className={`${styles.pageWrap} d-flex flex-row align-items-center`}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-1 d-block">404</span>
                        <div className="mb-4 lead">
                            The page you are looking for was not found.
                        </div>
                        <Link to={'/'}>Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
