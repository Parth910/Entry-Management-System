import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';


class createHost extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangephone = this.onChangephone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            phone: ''
        }
    }
    //Saving Data from Form
    componentDidMount() {
        this.setState({
            hosts: ['test host'],
            hostName: 'test host'
        })
    }
    onChangename(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeemail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangephone(e) {
        this.setState({
            phone: e.target.value
        })
    }
    //Handling AddHost
    onSubmit(e) {
        e.preventDefault();
        const host = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,

        }



        axios.post('http://localhost:9000/host/addHost', host)
            .then(res => {
                setTimeout(() => window.location = '/', 1000);
            })
            .catch(err => console.log(err))


    }

    render() {
        return (
            <div className="bg" >
                <MDBContainer className="pt-5">
                    <MDBRow>
                        <MDBCol ></MDBCol>
                        <MDBCol md="6">
                            <MDBCard className="cloudy-knoxville-gradient">
                                <MDBCardBody>
                                    <form onSubmit={this.onSubmit}>
                                        <p className="h4 text-center py-4">Host Details</p>
                                        <div className="grey-text">
                                            <MDBInput
                                                label="Host name"
                                                icon="user"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                                required
                                                value={this.state.name}
                                                onChange={this.onChangename}
                                            />
                                            <MDBInput
                                                label="Host email"
                                                icon="envelope"
                                                group
                                                type="email"
                                                validate
                                                error="wrong"
                                                success="right"
                                                required
                                                value={this.state.email}
                                                onChange={this.onChangeemail}
                                            />
                                            <MDBInput
                                                label="Host phone"
                                                icon="phone"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                                required
                                                value={this.state.phone}
                                                onChange={this.onChangephone}
                                            />

                                        </div>
                                        <div className="text-center py-4 mt-3">
                                            <Link to="/"> <MDBBtn gradient="aqua" >
                                                Back
                                    </MDBBtn></Link>

                                            <MDBBtn gradient="aqua" type="submit" >
                                                Add
                                    </MDBBtn>
                                        </div>

                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol ></MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>

        )

    }

}
//export component
export default createHost;