import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import styles from './styles.module.scss'
const Header = () => {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand style={{ fontWeight: 'bold' }}>
                    المظلة للخدمات الإكترونية
                    {/* <img src={'/images/logo.png'} width={250} alt={'logo'} /> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    className="justify-content-end"
                    id="basic-navbar-nav"
                >
                    <Nav>
                        {/* <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? styles.activeNavItem : styles.navItem
                            }
                        >
                            الرئيسية
                        </NavLink> */}
                        <a
                            className={styles.navItem}
                            href="https://umbrella.ly/about/"
                            // className={({ isActive }) =>
                            //     isActive ? styles.activeNavItem : styles.navItem
                            // }
                        >
                            حول الشركة
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
