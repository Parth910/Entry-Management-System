import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBTooltip } from 'mdbreact';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../styles/homePage.css';





class homePage extends Component {
    //defining constructor
    constructor(props) {
        super(props);

        //Binding this
        this.onSubmit = this.onSubmit.bind(this);
        this.goToId = this.goToId.bind(this);
        //set default state
        this.state = {
            visitors: [],
            hosts: []
        }

    }
    componentDidMount() {

        //get visitors list ans setState
        axios.get('http://localhost:9000/visitor/inVisitor')
            .then(res => {
                if (res.data.length > 0) {




                    this.setState({
                        visitors: res.data,


                    })

                }
            })
         //get hosts list and setState
        axios.get('http://localhost:9000/host/')
            .then(res => {
                if (res.data.length > 0) {




                    this.setState({
                        hosts: res.data,


                    })



                }
            })
    }
    goToId(e) {
        window.location = "/checkOutPage/" + e.target.value;
    }
    //On click viewVisitor
    onSubmit(e) {
        console.log(e.target.value);

        axios.post(`http://localhost:9000/visitor/${e.target.value}`)
            .then(res => {
                window.location = '/';
            })
            .catch(err => console.log(err))



    }
    //on remove host
    onSubmitHost(e) {
        console.log(e.target.value);

        axios.delete(`http://localhost:9000/host/${e.target.value}`)
            .then(res => {
                window.location = '/';
            })
            .catch(err => console.log(err))




    }
    render() {
        return (
            <div className="bg" >
                <MDBContainer>
                    <MDBRow className=" pt-3">
                        <MDBCol ></MDBCol>
                        <MDBCol md="6">
                            <MDBCard className="cloudy-knoxville-gradient">
                                <MDBCardBody>
                                    <Fragment>

                                        <MDBRow className="mt-5 mb-5">

                                            <h3 className="ml-5">Welcome to Entry Management</h3>
                                        </MDBRow>
                                        <MDBRow className="mt-5 mb-5">
                                            <MDBCol md="6">
                                                <Link to="/checkInInfo"> <MDBBtn gradient="aqua" size="lg"> <MDBIcon className="mr-2" icon="check-circle" />Check In</MDBBtn></Link>

                                            </MDBCol>
                                            <MDBCol md="6">
                                                <Link to="/addHost"> <MDBBtn gradient="aqua" size="lg" > <MDBIcon className="mr-2" icon="user" />Add Host</MDBBtn></Link>

                                            </MDBCol>
                                        </MDBRow>

                                    </Fragment>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol></MDBCol>
                    </MDBRow>

                    <MDBRow className="mt-5">

                        <MDBCol md="6">
                            <MDBCard className="heavy-rain-gradient">
                                <MDBCardBody>
                                    <Fragment>
                                        <MDBRow className="mt-3 mb-3">

                                            <h2 className="ml-3">Visitor Dashboard</h2>
                                        </MDBRow>
                                        <hr></hr>
                                        <table className="table">
                                            <thead className="thead-dark">
                                                <tr>

                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.visitors.length > 0 &&
                                                    this.state.visitors.map((user) => {
                                                        if (user.status === 'In') {

                                                            return <tr
                                                                value={user._id} key={user._id}>

                                                                <td >{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.address}</td>

                                                                <td >
                                                                    <MDBBtn color="danger" size="sm" onClick={this.goToId} value={user.uniqId} > View</MDBBtn >


                                                                </td>

                                                            </tr>;
                                                        }

                                                    })

                                                }
                                                {this.state.visitors.length === 0 &&
                                                    <tr>

                                                        <td>There are no Visitor</td>
                                                    </tr>



                                                }


                                            </tbody>
                                        </table>


                                    </Fragment>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBCard className="heavy-rain-gradient">
                                <MDBCardBody>
                                    <Fragment>
                                        <MDBRow className="mt-3 mb-3">

                                            <h2 className="ml-3">Host Dashboard</h2>
                                        </MDBRow>
                                        <hr></hr>
                                        <table className="table">
                                            <thead className="thead-dark">
                                                <tr>

                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.hosts.length > 0 &&
                                                    this.state.hosts.map((user) => {

                                                        return <tr
                                                            value={user._id} key={user._id}>

                                                            <td >{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone}</td>

                                                            <td >
                                                                <MDBBtn color="danger" size="sm" value={user._id} onClick={this.onSubmitHost} > Remove</MDBBtn>


                                                            </td>

                                                        </tr>;


                                                    })
                                                }
                                                {this.state.hosts.length === 0 &&
                                                    <tr>

                                                        <td>There are no Host</td>
                                                    </tr>



                                                }
                                            </tbody>
                                        </table>

                                    </Fragment>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>


                    </MDBRow>

                </MDBContainer>
            </div>

        )
    }
}

//export component
export default homePage;