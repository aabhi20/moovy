import { Databases, Client, ID, Query } from "appwrite";

// Load environment variables
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite Cloud endpoint
  .setProject(PROJECT_ID); // Your Appwrite Project ID

// Initialize Appwrite Database
const database = new Databases(client);

/**
 * Function to update the search count for a movie in the database.
 * If the search term already exists, it increments the count. Otherwise, it creates a new document.
 * @param {string} searchTerm - The search term used to search for movies.
 * @param {object} movie - The movie object returned by the movie API.
 */
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // Query to check if the search term already exists in the database
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    console.log("Search Term Result:", result); // Log the result for debugging

    // If the search term already exists, update the document's count
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
      console.log(`Updated count for search term: ${searchTerm}`);
    } else {
      // If the search term does not exist, create a new document
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        Poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
      console.log(`Created new document for search term: ${searchTerm}`);
    }
  } catch (error) {
    console.error("Error updating search count:", error); // More detailed error message
  }
};

/**
 * Function to get the most trending movies from the database.
 * This fetches the movies with the highest search count.
 * @returns {Array} - Array of trending movies.
 */
export const getTrendingMovies = async () => {
  try {
    // Fetch the top 5 trending movies by descending order of count
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5), // Limit to 5 documents
      Query.orderDesc("count"), // Order by descending count
    ]);

    console.log("Trending Movies Result:", result); // Log the result for debugging

    return result.documents; // Return the documents containing the trending movies
  } catch (error) {
    console.error("Error fetching trending movies:", error); // More detailed error message
  }
};
