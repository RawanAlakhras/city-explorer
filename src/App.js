import React from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card ,Alert } from 'react-bootstrap/';
import Weather from './componant/Weather';
import Movie from './componant/Movie';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      showmap: false,
      showerror:false,
      showMovie:false,
      weatherData:[],
      movieData:[],
    }
  }
  //localhost:3001/weather?searchQuery=
  getLocation = async (event) => {
    event.preventDefault();
    let userInput = event.target.name.value;
    let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.465ca57abf236bbdd06ac05eab31285b&q=${userInput}&format=json`;
    //const url=`http://localhost:3002/weather?searchQuery=${userInput}`;
    const movieURL=`http://localhost:3002/movie?query=${userInput}`;
    try{
     
      
      let locationRes = await axios.get(locURL);

     
      //const APIData=await axios.get(url);

      
      const movieAPI =await axios.get(movieURL);

      //console.log(movieAPI.data[0].imgURL);

      this.setState({
        location: locationRes.data[0],
        movieData:movieAPI.data[0],
        showmap: true,
        showMovie:true,
        //weatherData:APIData.data,
       
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
          <Card style={{ width: '40rem' }} className='m-auto'>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.465ca57abf236bbdd06ac05eab31285b&center=${this.state.location.lat},${this.state.location.lon}&size=400x400`} style={{ height: '200px' }}  />
            <Card.Body>
              <Card.Title>display_name : {this.state.location.display_name}</Card.Title>
              <Card.Text>
                <p>lat :{this.state.location.lat}</p>
                <p>lon : {this.state.location.lon}</p>
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
          console.log(this.state.movieData)
        }
        {
          this.state.showmap && 
              
              <Movie imgURL={this.state.movieData.imgURL} 
              title={this.state.movieData.title}
              overview={this.state.movieData.overview}
              vote_average={this.state.movieData.vote_average}
              vote_count={this.state.movieData.vote_count}
              popularity={this.state.movieData.popularity}
              release_date={this.state.movieData.release_date}
             
              />
            
          
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
