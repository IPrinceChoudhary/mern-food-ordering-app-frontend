import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  // initially the city param is undefined or empty string
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    // query params which will go to backend with the api
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","))
    params.set("sortOption", searchState.sortOption)

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState], // we're telling the react query library that anytime searchState object values have changed then we want to do this query again // so whenever the user types the input it's going to update the state in searchPage
    createSearchRequest,
    { enabled: !!city }
  ); // this query isn't going to run unless we have a truthy value or a string value for the city argument. if city is undefined then its not going to run this query

  return {
    results,
    isLoading,
  };
};
