import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
class Movie extends React.Component{
render(){
    return (
        <>
        <Card style={{ width: '40rem' }} className='m-auto'>
            <Card.Img variant="top" src={this.props.imgURL} style={{ height: '200px' }} />
            <Card.Body>
              <Card.Title>title : {this.props.title}</Card.Title>
              <Card.Text>
                
                overview :{this.props.overview}<br></br>
                vote_average: {this.props.vote_average}<br></br>
                vote_count: {this.props.vote_count}<br></br>
                popularity: {this.props.popularity}<br></br>
                release_date: {this.props.release_date}<br></br>
                
              </Card.Text>
            </Card.Body>
          </Card>
        </>
    )

}
}
export default Movie;