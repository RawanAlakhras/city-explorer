import React from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card ,Alert } from 'react-bootstrap/';
import Weather from './componant/Weather';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      showmap: false,
      showerror:false,
      weatherData:[],
    }
  }
  //localhost:3001/weather?searchQuery=
  getLocation = async (event) => {
    event.preventDefault();
    try{
      let userInput = event.target.name.value;
      let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.465ca57abf236bbdd06ac05eab31285b&q=${userInput}&format=json`;
      let locationRes = await axios.get(locURL);
      const url=`http://localhost:3002/weather?searchQuery=${userInput}`;
      const APIData=await axios.get(url);
      console.log(APIData.data);
      this.setState({
        
      })
      this.setState({
        location: locationRes.data[0],
        showmap: true,
        weatherData:APIData.data,
      });
    }catch{
      this.setState({
        showerror:true,
      })

    }
    

    

  }
  setShow=() => {
    this.setState({
      showerror:false,
    })

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
          <Card style={{ width: '25rem' }} className='m-auto'>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.465ca57abf236bbdd06ac05eab31285b&center=${this.state.location.lat},${this.state.location.lon}&size=400x400`} />
            <Card.Body>
              <Card.Title>display_name : {this.state.location.display_name}</Card.Title>
              <Card.Text>
                <p>lat :{this.state.location.lat}</p>
                <p>lon : {this.state.location.lon}</p>
                <p> {this.state.weatherData[2].date}</p>
                <p> {this.state.weatherData[2].description}</p>
                {
                  this.state.weatherData.map((item,inx)=>{
                    return (
                     <Weather date={item.date} description={item.description} key={inx.toString()}/> 
                    )
                  })
                }
               
              </Card.Text>
            </Card.Body>
          </Card>
        }
        {
          this.state.showerror && 
          <Alert variant="danger" onClose={() => this.setShow(false)} dismissible className='col-6 m-auto'>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
        Unable to geocode
        </p>
      </Alert>
        }


      </div>
    )
  }
}
export default App;
