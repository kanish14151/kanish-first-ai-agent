import axios from "axios";

import {
  GoogleWebSearchRequest,
  GoogleWebSearchResponse,
} from "../types/search";

import {
  getGoogleSearchConfig,
  normalizeGoogleSearchError,
} from "./googleSearchConfig";

/**
 * Calls Google Custom Search API with the given query for web results.
 * @param params GoogleWebSearchRequest
 * @returns GoogleWebSearchResponse
 */
export async function googleWebSearch(
  params: GoogleWebSearchRequest,
): Promise<GoogleWebSearchResponse> {
  const { apiKey, cx } = getGoogleSearchConfig();
  const {
    query,
    num = 10,
    cr,
    gl,
    siteSearch,
    exactTerms,
    dateRestrict,
  } = params;

  const url = "https://www.googleapis.com/customsearch/v1";
  try {
    const response = await axios.get<GoogleWebSearchResponse>(url, {
      params: {
        key: apiKey,
        cx,
        q: query,
        num,
        cr,
        gl,
        siteSearch,
        exactTerms,
        dateRestrict,
      },
    });

    return response.data;
  } catch (error) {
    return normalizeGoogleSearchError(error);
  }
}
