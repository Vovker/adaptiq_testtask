import { Controller, Get, Query } from '@nestjs/common';
import { SearchEngineService } from './search-engine.service';
import { SearchShowsResponse } from './search-engine.types';

@Controller()
export class SearchEngineController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @Get('search-movies')
  async searchMovies(@Query('q') query: string): Promise<SearchShowsResponse> {
    if (!query || query.trim() === '') {
      return {
        success: false,
        error: {
          message: 'Query parameter "q" is required',
          statusCode: 400,
        },
      };
    }

    return this.searchEngineService.searchShows(query.trim());
  }
}
