import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient, TVMazeSearchResult, ApiResponse } from '@core-types';

@Injectable()
export class SearchEngineService {
  private httpClient: HttpClient;

  constructor(private configService: ConfigService) {
    const baseURL = this.configService.get<string>('TVMAZE_API_BASE_URL');
    if (!baseURL) {
      throw new Error('TVMAZE_API_BASE_URL is not defined in config');
    }
    this.httpClient = new HttpClient(baseURL);
  }

  async searchShows(query: string): Promise<ApiResponse<TVMazeSearchResult[]>> {
    try {
      const response = await this.httpClient.get<TVMazeSearchResult[]>('/search/shows', {
        params: { q: query },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to search shows',
          statusCode: error?.response?.status || 500,
        },
      };
    }
  }
}
