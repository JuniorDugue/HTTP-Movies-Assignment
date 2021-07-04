import React, {useState, useEffect} from 'react'
import axios from "axios";

function UpdateMovie(props) {
  const [updateMovie, setUpdateMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
  })

  const [previewState, setPreviewState] = useState(false);

  const id = props.match.params.id;

  const handleChange = e => {
    setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value})
  }

  const handlePreview = e => {
    e.preventDefault();
    setUpdateMovie({...updateMovie, stars: updateMovie.stars.spilt(",")});
    setPreviewState(true);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (previewState){
      axios
        .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
        .then(res => {
          props.history.push("/");
        })
        .catch(err => {
          console.log("Error: ", err);
        })
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setUpdateMovie({...res.data, stars: res.data.stars.join(",")})
      })
      .catch(err => {
        console.log("Error: ", err)
      })
  }, [id]);

  return (
    <div className="updateMovie">
      <form action="" onSubmit={previewState ? handleSubmit : handlePreview}>
        <h1>
          Title: {""}
          {previewState ? (updateMovie.title)
          : (
            <input 
              type="text" 
              name="title"
              value={updateMovie.title}
              placeholder="Title"
              onChange={handleChange}  
              />
          )}
        </h1>
        <p>
          Director: {""}
          {previewState ? (
            updateMovie.director
          ) : (
            <input
              type="text"
              name="director"
              value={updateMovie.director}
              placeholder="Director"
              onChange={handleChange}
            />
          )}
        </p>
        <p>
          Metascore:{""}
          {previewState ? (
            updateMovie.metascore
          ) : (
            <input 
              type="text"
              name="metascore"
              value={updateMovie.metascore}
              placeholder="Metascore"
              onChange={handleChange}
            />
          )}
        </p>
        <p>
          Stars: {""}
          {previewState ? (
            updateMovie.stars
          ) : (
            <input 
              type="text"
              name="stars"
              value={updateMovie.stars}
              placeholder="Stars"
              onChange={handleChange}
            />
          )}
        </p>
        <button type="submit">
            {previewState ? "Commit Changes" : "Preview Changes"}
        </button>
      </form>
    </div>
  )
}

export default UpdateMovie;
