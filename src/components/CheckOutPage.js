import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';


class checkOutPage extends Component {
    constructor(props) {
        super(props);

        console.log(props.uniqId);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            visitor: {},
            host: {}
        }

    }
    componentDidMount() {
        const { match: { params } } = this.props;

        //Get visitorBy Id
        axios.get(`http://localhost:9000/visitor/${params.uniqId}`)
            .then(res => {
                this.setState({
                    visitor: res.data
                })
            })
            .catch(err => console.log(err))
        //Get host associated with visitor
        setTimeout(() => axios.get(`http://localhost:9000/host/${this.state.visitor.hostName}`)
            .then(res => {


                this.setState({
                    host: res.data
                })
            })
            .catch(err => console.log(err)), 100);


    }
    //Handling checkout for visitors
    onSubmit(e) {
        e.preventDefault();
        const { match: { params } } = this.props;


        axios.post(`http://localhost:9000/visitor/${params.uniqId}`)
            .then(res => {
                window.location = '/';
            })
            .catch(err => console.log(err))




    }

    render() {
        return (
            <div className="bg">
                <MDBContainer className="pt-5">
                    <MDBRow>
                        <MDBCol ></MDBCol>
                        <MDBCol md="6">
                            <MDBCard className="cloudy-knoxville-gradient" >
                                <MDBCardBody>
                                    <Fragment>
                                        <MDBRow>
                                            <MDBCol md="12" >
                                                <MDBCard className="aqua-gradient" >
                                                    <h3 className="font-weight-bold text-center mt-3">Visitor Card</h3>
                                                    <MDBRow className="mt-3">
                                                        <MDBCol md="6" >
                                                            <MDBRow className="mt-3">
                                                                <MDBCol ></MDBCol>
                                                                <MDBCol md="4" >
                                                                    < MDBIcon className="text-center" icon="user" size="7x" />
                                                                </MDBCol>
                                                                <MDBCol ></MDBCol>
                                                            </MDBRow>
                                                        </MDBCol>
                                                        <MDBCol md="6" >

                                                            <p className="mr-3">Name   : {this.state.visitor.name}</p>
                                                            <p className="mr-3">Email  : {this.state.visitor.email}</p>
                                                            <p className="mr-3">Phone  : {this.state.visitor.phone}</p>
                                                            <p className="mr-3">host   : {this.state.host.name}</p>
                                                            <p className="mr-3">Adress : {this.state.visitor.address}</p>
                                                        </MDBCol>

                                                    </MDBRow>
                                                </MDBCard>
                                            </MDBCol>


                                        </MDBRow>
                                        <MDBRow className="mt-5 mb-5">
                                            <MDBCol ></MDBCol>
                                            <MDBCol md="6" >
                                                <form onSubmit={this.onSubmit} >


                                                    <div>
                                                        <Link to="/"> <MDBBtn gradient="aqua" size="lg" > <MDBIcon className="mr-2" icon="user" />Home</MDBBtn></Link>

                                                        <MDBBtn gradient="aqua" size="lg" type="submit" > <MDBIcon className="mr-2" icon="user" />Check Out</MDBBtn>
                                                    </div>

                                                </form>
                                            </MDBCol>
                                            <MDBCol ></MDBCol>
                                        </MDBRow>

                                    </Fragment>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol></MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>

        )

    }

}
//export component
export default checkOutPage;