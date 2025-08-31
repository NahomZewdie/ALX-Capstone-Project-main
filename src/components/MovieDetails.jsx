// Component to fetch and display details and cast of a specific movie or TV show
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { type, id } = useParams(); // Get 'type' (movie or TV) and 'id' from route parameters
  const [details, setDetails] = useState(null); // Stores movie/TV details
  const [cast, setCast] = useState([]); // Stores cast information

  // Fetch details and cast data when 'type' or 'id' changes
  useEffect(() => {
    const fetchDetails = async () => {
      const apiKey = "6aabd6dcb1b8921453c0fcb5f969ec45";

      try {
        // Fetch details of the movie/TV show
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setDetails(data);

        // Fetch cast and crew details
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}&language=en-US`
        );
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast.slice(0, 10)); // Limit to top 10 cast members
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [type, id]); // Refetch when type or id changes

  if (!details) {
    return <div>Loading...</div>; // Display a loading message until data is fetched
  }

  return (
    <div className="movie-details">
      <main className="movie-content">
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} // Display movie/TV poster
            alt={details.title || details.name}
            className="movie-poster"
          />
        </div>
        <div className="info-container">
          <div className="movie-title">
            <h2>{details.title || details.name}</h2>
            <span>
              ({(details.release_date || details.first_air_date || "").split(
                "-"
              )[0]}) {/* Display release year */}
            </span>
          </div>
          <div className="movie-meta">
            <div className="categories">
              {details.genres.map((genre) => (
                <span key={genre.id} className="category">
                  {genre.name} {/* Display genre */}
                </span>
              ))}
            </div>
            <div className="rating">⭐ {details.vote_average}</div> {/* Display rating */}
          </div>
          <div className="movie-summary">
            <h3>Plot Summary:</h3>
            <p>{details.overview}</p> {/* Display overview */}
          </div>
          <div className="cast-section">
            <h3>Cast:</h3>
            <div className="cast-list">
              {cast.map((member) => (
                <div key={member.id} className="cast-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} // Display cast profile image
                    alt={member.name}
                    className="actor-image"
                  />
                  <span>{member.name}</span>
                  <p>as {member.character}</p> {/* Display character name */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;
