import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
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

        const newItem = {
            name: this.state.name
        }

        //addItem Action을 통해 newItem 객체 추가
        this.props.addItem(newItem);
        // modal 닫기
        this.toggle();
    }

    render() {
        return(
            <div>
                <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >
                상품 추가 
                </Button>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                    목록에 상품 추가하기
                    </ModalHeader>

                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">상품 이름</Label>
                                <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="상품의 이름을 입력해주세요. > 0<"
                                onChange={this.onChange}
                                />
                                <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block
                                >
                                추가하기
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
    item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);