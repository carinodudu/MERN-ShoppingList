import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {  isAuthenticated, user } = this.props.auth;

        // 로그인 경우
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `환영합니다! ${user.name}님 ♥♥♥` : '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        // 로그인 되지 않은 경우
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">상품 목록</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);