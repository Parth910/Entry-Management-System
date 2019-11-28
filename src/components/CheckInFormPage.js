import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../styles/checkInform.css';

class checkInPage extends Component {
    //defining constructor
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangephone = this.onChangephone.bind(this);
        this.onChangehostName = this.onChangehostName.bind(this);
        this.onChangehostEmail = this.onChangehostEmail.bind(this);
        this.onChangehostPhone = this.onChangehostPhone.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //set default state
        this.state = {
            name: '',
            email: '',
            phone: '',
            hostName: '',
            address: '',
            hosts: [{}],
            hostsname: [],
            t: 1
        }
    }
    componentDidMount() {


        axios.get('http://localhost:9000/host/')
            .then(res => {
                if (res.data.length > 0) {
                    console.log(res.data[0]._id);

                    this.setState({
                        hosts: res.data.map(host => host),
                        hostsname: res.data.map(hostname => hostname.name),

                    })
                }
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
    onChangehostName(e) {

        this.setState({
            hostName: e.target.value
        })
    }
    onChangehostEmail(e) {
        this.setState({
            hostEmail: e.target.value
        })
    }
    onChangehostPhone(e) {
        this.setState({
            hostPhone: e.target.value
        })
    }
    onChangeaddress(e) {
        this.setState({
            address: e.target.value
        })
    }
    onBack(e) {
        setTimeout(() => window.location = '/', 10);
    }
    //handling post request for checkIn visitor
    onSubmit(e) {
        e.preventDefault();
        const visitor = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            hostName: this.state.hostName,
            address: this.state.address

        }

        console.log(visitor);

        axios.post('http://localhost:9000/visitor/addInfo', visitor)
            .then(res => {
                console.log(res.data);

                setTimeout(() => window.location = '/checkOutPage/' + res.data, 1000);
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
                                        <p className="h4 text-center py-4">Visitor Details</p>
                                        <div className="grey-text">
                                            <MDBInput
                                                label="Your name"
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
                                                label="Your email"
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
                                                label="Your phone"
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
                                            <MDBInput
                                                label="Visiting address"
                                                icon="address-book"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                                required
                                                value={this.state.address}
                                                onChange={this.onChangeaddress}
                                            />
                                            <select className="browser-default custom-select"
                                                icon="phone"
                                                required
                                                value={this.state.hostName}
                                                onChange={this.onChangehostName}>
                                                <option>Select Host *</option>
                                                {
                                                    this.state.hosts.map(function (user) {

                                                        return <option
                                                            key={user.name}
                                                            value={user._id}>{user.name}
                                                        </option>;
                                                    })
                                                }

                                            </select>
                                            <p>*If you cannot find host, Please Contact Administration or Click <Link to="/addHost" > Here </Link></p>


                                        </div>
                                        <div className="text-center py-4 mt-3">
                                            <MDBBtn gradient="aqua" onClick={this.onBack} >
                                                Back
                                        </MDBBtn>

                                            <MDBBtn gradient="aqua" type="submit" >
                                                Check In
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
export default checkInPage;