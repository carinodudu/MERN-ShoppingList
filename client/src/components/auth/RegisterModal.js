import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal 인증 완료시, 모달을 닫음
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors 에러 상태 초기화
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Create user object 회원 객체 생성
        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register 회원 가입 신청
        this.props.register(newUser);
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                회원가입
                </NavLink>


                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                    회원가입
                    </ModalHeader>

                    <ModalBody>
                        { this.state.msg ? 
                            (<Alert color="danger">{this.state.msg}</Alert>) : null 
                        }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">이름</Label>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="이름"
                                className="mb-3"
                                onChange={this.onChange}
                                />

                                <Label for="email">Email</Label>
                                <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="mb-3"
                                onChange={this.onChange}
                                />

                                <Label for="password">비밀번호</Label>
                                <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="비밀번호"
                                className="mb-3"
                                onChange={this.onChange}
                                />

                                <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block
                                >
                                가입하기
                                </Button>
                            </FormGroup>
                        </Form>    
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);