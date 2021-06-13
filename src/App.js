import React from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Jumbotron, Container } from 'react-bootstrap/'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      map:''
    }
  }
  getLocation = async (event) => {
    event.preventDefault();

    let userInput = event.target.name.value;
    let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.465ca57abf236bbdd06ac05eab31285b&q=${userInput}&format=json`;
    let locationRes = await axios.get(locURL);
    this.setState({
      location: locationRes.data[0],
    });
    let mapUrl=`https://maps.locationiq.com/v3/staticmap?key=pk.465ca57abf236bbdd06ac05eab31285b&center=${this.state.location.lat},${this.state.location.lon}&zoom=<zoom>&size=400x400&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`;
    let mapRes= await axios.get(mapUrl);
    this.setState({
      map: mapRes.data[0],
    });
  }
  render() {

    return (
      <div className='container'>
        <Form className='col-6 m-auto pt-5' onSubmit={this.getLocation}>
          <Form.Group controlId="formBasicText" >
            <Form.Label>Enter location</Form.Label>
            <Form.Control type="text" placeholder="Enter location name" name='name' />
          </Form.Group>
          <Button variant="primary" type="submit" className='mb-5'>
            Explore!
          </Button>
        </Form>
        <Jumbotron fluid className='col-6 m-auto mt-5'>
          <Container>
            <h1>display_name : {this.state.location.display_name}</h1>
            <p>
              lat :
         {
                this.state.location.lat
              }
            </p>
            <p>lon : {this.state.location.lon}</p>
          </Container>
        </Jumbotron>
              {
                <img src='${this.state.map}' alt='r'></img>
              }
      </div>
    )
  }
}
export default App;
