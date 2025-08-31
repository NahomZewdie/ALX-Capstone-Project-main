// Component to display different categories (Movies, TV Shows, Animation) with dynamic grid layout
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [rowIndices, setRowIndices] = useState([0, 0, 0]); // Keeps track of which part of each row is currently displayed
  const [moviesPerRow, setMoviesPerRow] = useState(5); // Number of items to display per row based on screen size

  // Dynamically update the number of movies per row based on screen width
  useEffect(() => {
    const updateMoviesPerRow = () => {
      if (window.innerWidth <= 425) {
        setMoviesPerRow(2); // For very small screens
      } else if (window.innerWidth <= 768) {
        setMoviesPerRow(3); // For tablets
      } else if (window.innerWidth <= 1024) {
        setMoviesPerRow(4); // For medium-sized screens
      } else {
        setMoviesPerRow(5); // For large screens
      }
    };

    updateMoviesPerRow();
    window.addEventListener("resize", updateMoviesPerRow); // Adjust movies per row on window resize

    return () => {
      window.removeEventListener("resize", updateMoviesPerRow); // Cleanup event listener on unmount
    };
  }, []);

  // Fetch data for Movies, TV Shows, and Animation categories from TMDb API
  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "6aabd6dcb1b8921453c0fcb5f969ec45";

      // Fetch popular movies
      const moviesResponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const moviesData = await moviesResponse.json();
      setMovies(moviesData.results);

      // Fetch popular TV shows
      const tvShowsResponse = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const tvShowsData = await tvShowsResponse.json();
      setTvShows(tvShowsData.results);

      // Fetch animation genre movies
      const animationResponse = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&language=en-US&page=1`
      );
      const animationData = await animationResponse.json();
      setAnimation(animationData.results);
    };

    fetchMovies();
  }, []);

  // Handles navigation within a row (scroll left or right)
  const handleRowChange = (rowIndex, direction) => {
    setRowIndices((prev) => {
      const newIndices = [...prev];
      const maxIndex =
        rowIndex === 0
          ? Math.max(0, movies.length - moviesPerRow)
          : rowIndex === 1
          ? Math.max(0, tvShows.length - moviesPerRow)
          : Math.max(0, animation.length - moviesPerRow);

      newIndices[rowIndex] =
        direction === "next"
          ? Math.min(newIndices[rowIndex] + moviesPerRow, maxIndex)
          : Math.max(newIndices[rowIndex] - moviesPerRow, 0);
      return newIndices;
    });
  };

  // Prepare rows for display
  const rows = [
    { title: "Movies", data: movies },
    { title: "TV Shows", data: tvShows },
    { title: "Animation", data: animation },
  ];

  return (
    <div className="movies-container">
      <h1 className="movies-title">Welcome to Movie Station</h1>

      {rows.map((row, rowIndex) => {
        const startIndex = rowIndices[rowIndex]; // Get the starting index for the current row
        const rowData = row.data.slice(startIndex, startIndex + moviesPerRow); // Display only a portion of the row based on screen size

        return (
          <div key={rowIndex} className="movies-row">
            <h2 className="row-title">{row.title}</h2>
            <button
              className="row-button"
              onClick={() => handleRowChange(rowIndex, "prev")}
              disabled={startIndex === 0} // Disable 'prev' button if at the start
            >
              ◀
            </button>
            <div className="movies-grid">
              {rowData.map((item) => (
                <Link
                  to={`/${row.title === "TV Shows" ? "tv" : "movie"}/${item.id}`} // Generate dynamic route based on item type
                  key={item.id}
                  className="movie-card"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} // Display poster image
                    alt={item.title || item.name}
                    className="movie-image"
                  />
                  <h3 className="movie-title">{item.title || item.name}</h3>
                </Link>
              ))}
            </div>
            <button
              className="row-button"
              onClick={() => handleRowChange(rowIndex, "next")}
              disabled={startIndex + moviesPerRow >= row.data.length} // Disable 'next' button if at the end
            >
              ▶
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
