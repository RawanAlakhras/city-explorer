import React from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Jumbotron, Container, Card } from 'react-bootstrap/'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      showmap: false
    }
  }
  getLocation = async (event) => {
    event.preventDefault();

    let userInput = event.target.name.value;
    let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.465ca57abf236bbdd06ac05eab31285b&q=${userInput}&format=json`;
    let locationRes = await axios.get(locURL);
    this.setState({
      location: locationRes.data[0],
      showmap: true,
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
        {
          this.state.showmap &&
          <Card style={{ width: '18rem' }} className='col-9 m-auto mt-5'>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.465ca57abf236bbdd06ac05eab31285b&center=${this.state.location.lat},${this.state.location.lon}&size=400x400`} />
            <Card.Body>
              <Card.Title>display_name : {this.state.location.display_name}</Card.Title>
              <Card.Text>
                <p>lat :{this.state.location.lat}</p>
                <p>lon : {this.state.location.lon}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        }


      </div>
    )
  }
}
export default App;
