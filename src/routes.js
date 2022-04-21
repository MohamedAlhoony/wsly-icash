import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/pageNotFound/pageNotFound'
import HomePage from './pages/home/Home'
import Layout from './HOC/layout'
import UserFormPage from './pages/userForm/userForm'
import SuccessflySubmittedPage from './pages/successflySubmited/successflySubmitted'
import Preview from './pages/preview/preview'
import ConfirmLocation from './pages/confirmLocation/confirmLocation'
const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index path="/" element={<HomePage />} />
                <Route path="/user-form" element={<UserFormPage />} />
                <Route path="/preview" element={<Preview />} />
                <Route
                    path="/successfully-submitted"
                    element={<SuccessflySubmittedPage />}
                />
                <Route path="/confirm-location" element={<ConfirmLocation />} />
                <Route path={'/*'} element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default Router
