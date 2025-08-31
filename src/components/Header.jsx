import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState(""); // State to store the user's search query
  const [results, setResults] = useState([]); // State to store search results
  const navigate = useNavigate(); // Hook for navigation between routes
 // Function to handle search input and fetch results from the TMDb API
  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value.trim() === "") {
      setResults([]); // Clear results if the search query is empty

      return;
    }

    try {
      const apiKey = "6aabd6dcb1b8921453c0fcb5f969ec45";
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${e.target.value}&language=en-US`
      );
      const data = await response.json();
      setResults(data.results.slice(0, 5)); // Store only the top 5 result
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
 
  // Function to handle clicking on a search result
  const handleResultClick = (id, mediaType) => {
    navigate(`/${mediaType}/${id}`);  // Navigate to the detailed page for the selected result
    setQuery("");
    setResults([]);
  };

   // Function to navigate back to the homepage when clicking the title
  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-[white] p-5 sm:p-3 w-full">
  <h1
    className="font-cursive text-3xl sm:text-2xl text-black cursor-pointer"
    onClick={handleTitleClick}
  >
<div>
<img src="./logo/logo1.png" alt="Movie Station Logo" className="h-10 w-10 rounded-full border-2 border-white" /> 
</div>
 </h1>
  <div className="relative w-1/3 sm:w-3/4 ml-6"> 
    <input
      type="text"
      placeholder="Search..."
      className="px-3 py-2 sm:py-1 sm:text-sm border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
      value={query}
      onChange={handleSearch}
    />
    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
      🔍
    </span>
    {results.length > 0 && (
      <ul className="absolute left-0 top-full bg-white border border-gray-300 mt-1 max-h-48 overflow-y-auto w-full z-10">
        {results.map((result) => (
          <li
            key={result.id}
            className="px-3 py-2 cursor-pointer text-black hover:bg-gray-200"
            onClick={() => handleResultClick(result.id, result.media_type)}
          >
            {result.title || result.name}
          </li>
        ))}
      </ul>
    )}
  </div>
</header>


  );
};

export default Header;
