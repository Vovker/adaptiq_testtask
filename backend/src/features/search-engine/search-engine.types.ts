export interface TVMazeSearchResult {
  score: number;
  show: TVMazeShow;
}

export interface TVMazeShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: TVMazeSchedule;
  rating: TVMazeRating;
  weight: number;
  network: TVMazeNetwork | null;
  webChannel: TVMazeWebChannel | null;
  dvdCountry: string | null;
  externals: TVMazeExternals;
  image: TVMazeImage | null;
  summary: string | null;
  updated: number;
  _links: TVMazeLinks;
}

export interface TVMazeSchedule {
  time: string;
  days: string[];
}

export interface TVMazeRating {
  average: number | null;
}

export interface TVMazeNetwork {
  id: number;
  name: string;
  country: TVMazeCountry;
  officialSite: string | null;
}

export interface TVMazeWebChannel {
  id: number;
  name: string;
  country: TVMazeCountry | null;
  officialSite: string | null;
}

export interface TVMazeCountry {
  name: string;
  code: string;
  timezone: string;
}

export interface TVMazeExternals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

export interface TVMazeImage {
  medium: string;
  original: string;
}

export interface TVMazeLinks {
  self: TVMazeLink;
  previousepisode?: TVMazeLink;
  nextepisode?: TVMazeLink;
}

export interface TVMazeLink {
  href: string;
  name?: string;
}

export interface SearchShowsResponse {
  success: boolean;
  data?: TVMazeSearchResult[];
  error?: {
    message: string;
    statusCode: number;
  };
}
