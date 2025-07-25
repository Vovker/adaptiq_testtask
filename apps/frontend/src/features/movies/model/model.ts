import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import type { TVMazeSearchResult, ApiResponse } from '@adaptiq/core-types';
import { HttpClient } from '@adaptiq/core-types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = new HttpClient(API_BASE_URL);

export const searchQueryAtom = atom<string>('');
export const debouncedSearchQueryAtom = atom<string>('');
export const isLoadingAtom = atom<boolean>(false);
export const moviesDataAtom = atomWithReset<TVMazeSearchResult[]>([]);
export const errorAtom = atomWithReset<string | null>(null);
export const availableGenresAtom = atom<string[]>([]);
export const selectedGenresAtom = atom<string[]>([]);

export const hasSearchedAtom = atom<boolean>((get) => get(debouncedSearchQueryAtom).length > 0);

export const filteredMoviesAtom = atom<TVMazeSearchResult[]>((get) => {
  const moviesData = get(moviesDataAtom);
  const selectedGenres = get(selectedGenresAtom);
  
  if (selectedGenres.length === 0) {
    return moviesData;
  }
  
  return moviesData.filter(movie => 
    movie.show.genres.some(genre => selectedGenres.includes(genre))
  );
});

export const fetchMoviesAtom = atom<null, [string], Promise<void>>(
  null,
  async (_get, set, query: string) => {
    if (query.trim().length === 0) {
      set(moviesDataAtom, []);
      set(errorAtom, null);
      return;
    }

    try {
      set(isLoadingAtom, true);
      set(errorAtom, null);
      
      const response = await apiClient.get<ApiResponse<TVMazeSearchResult[]>>(
        '/search-movies',
        {
          params: {
            q: query.trim()
          }
        }
      );

      if (response.data?.success) {
        const data = response.data.data || [];
        set(moviesDataAtom, data);

        const genres = new Set<string>();
        data.forEach(movie => {
          movie.show.genres.forEach(genre => genres.add(genre));
        });
        set(availableGenresAtom, Array.from(genres));
      } else {
        const errorMessage = response.data?.error?.message || 'Failed to fetch movies';
        set(errorAtom, errorMessage);
        set(moviesDataAtom, []);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set(errorAtom, errorMessage);
      set(moviesDataAtom, []);
    } finally {
      set(isLoadingAtom, false);
    }
  }
);

export const triggerSearchAtom = atom<null, [string], void>(
  null,
  (_get, set, query: string) => {
    set(debouncedSearchQueryAtom, query);
    if (query.trim().length > 0) {
      set(fetchMoviesAtom, query);
    } else {
      set(moviesDataAtom, []);
      set(errorAtom, null);
      set(isLoadingAtom, false);
    }
  }
);
