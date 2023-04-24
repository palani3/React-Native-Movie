import axios from "axios";

const apiURL="https://api.themoviedb.org/3";
const apiKey ="api_key=d9004d81e77b6fce5f27ac63dfe9e2fc"

//get popular movies
export const getPopularMovies = async() =>{
    const response =await axios.get(`${apiURL}/movie/popular?${apiKey}`)
    return response.data.results
   
  }

  //get upcoming movies
export const getUpcomingMovies = async() =>{
    const response =await axios.get(`${apiURL}/movie/upcoming?${apiKey}`)
    return response.data.results
   
  }
  //get get popular tv

  export const getPopularTv = async() =>{
    const response =await axios.get(`${apiURL}/tv/popular?${apiKey}`)
    return response.data.results
   
  }


    //get family 

    export const getFamilyMovies = async() =>{
        const response =await axios.get(`${apiURL}/discover/movie?${apiKey}&with_genres=10751 `)
        return response.data.results
       
      }


         //get Movies By ID 

    export const getMoviesByID = async(id) =>{

      const response =await axios.get(`${apiURL}/movie/${id}?${apiKey} `)
      return response.data
     
    }

        //Search or movie and tv 

        export const searchMovieTv = async(query,type) =>{
          const response =await axios.get(`${apiURL}/search/${type}?${apiKey}&query=${query} `)
          return response.data.results
         
        }