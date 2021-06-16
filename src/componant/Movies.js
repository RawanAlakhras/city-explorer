import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from './Movie';
class Movies extends React.Component{
render(){
    return (
        <>
       {this.props.movieArr.map((item,inx)=>{
           return(
            <Movie key={inx.toString()}
            imgURL={item.imgURL}
            title={item.title}
            overview={item.overview}
            vote_average={item.vote_average}
            vote_count={item.vote_count}
            popularity={item.popularity}
            release_date={item.release_date}
             />
           )
       })}
        </>
    )

}
}
export default Movies;