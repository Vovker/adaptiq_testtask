export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ErrorData;
}

export interface ErrorData {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}
