# Changelog

All notable changes to this project will be documented in this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-Jan-05
### Added
- Created the `movie-database` project using React and Vite.
- Integrated the TMDb API to fetch popular movies and display them.
- Designed the following components:
  - `Header`: Displays the site logo and navigation links.
  - `Footer`: Includes basic site information and links.
  - `Home`: Fetches and displays a list of popular movies.
  - `MovieCard`: Displays individual movie details.
  - `Movies`: Handles the layout of multiple `MovieCard` components.

### Changed
- Updated the `Home` component to include API error handling.
- Improved the UI layout for better responsiveness.

### Fixed
- Resolved issues with API key configuration.
- Handled edge cases where the API response might be `undefined` or `null`.

### Known Issues
- Filtering movies by genre, rating, or release year is not yet implemented.
- Limited error messages displayed for API-related issues.

### Future Enhancements
- Add search functionality to find specific movies.
- Implement genre, rating, and year-based filters.
- Improve accessibility features for better user experience.
