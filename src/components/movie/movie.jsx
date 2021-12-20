import React from 'react'
import './movie.css'
import { useEffect, useState} from 'react'
import axios from 'axios';

function Movie(props){

    const [isLoading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState();
    const [streamServices, setStreamServices] = useState();

    const movieId = props.id
    const countryCode = props.code

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/movie/"+movieId,{
            params: {
              api_key: "496dd84fc27f6d28eafe675507234d8e",
            }
          })
        .then((res) => {
            setMovieData(res.data)
            setLoading(false);
        })

        axios.get("https://api.themoviedb.org/3/movie/"+movieId+"/watch/providers",{
          params: {
            api_key: "496dd84fc27f6d28eafe675507234d8e",
          }
        })
      .then((res) => {
          if(typeof(res.data.results) != "undefined"){
            //console.log(res.data.results[countryCode])
            const services = res.data.results[countryCode].flatrate;
            let stringServices = "";
            for(var i=0; i< services.length; i++){
              stringServices += services[i].provider_name + ", ";
            }
            setStreamServices(stringServices)
          }
          else{
            setStreamServices("Not Available!")
          }
      })
    })

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return(
<div className="card eachMovie" styles="width: 18rem;">
  <img
    src={"https://image.tmdb.org/t/p/original"+movieData.poster_path}
    className="card-img-top"
    alt="Chicago Skyscrapers "
  />
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{movieData.original_title}</li>
    <li className="list-group-item">{movieData.overview}</li>
    <li className="list-group-item">Runtime: {movieData.runtime} minutes</li>
    <li className="list-group-item">IMDB Rating: {movieData.vote_average}</li>
    <li className="list-group-item">Available On: {streamServices} </li>
  </ul>
</div>
    )
}

export default Movie;