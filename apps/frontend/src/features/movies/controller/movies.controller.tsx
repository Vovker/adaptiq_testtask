import { useAtomValue } from 'jotai';
import { Space, Spin, Alert, Typography } from 'antd';
import { 
  isLoadingAtom, 
  errorAtom, 
  moviesDataAtom, 
  filteredMoviesAtom,
  hasSearchedAtom 
} from '../model/model';
import {
  GenreFilter,
  MoviesTable,
  SearchInput
} from "../ui";

const { Title, Text } = Typography;

export const MoviesController = () => {
  const isLoading = useAtomValue(isLoadingAtom);
  const error = useAtomValue(errorAtom);
  const moviesData = useAtomValue(moviesDataAtom);
  const filteredMovies = useAtomValue(filteredMoviesAtom);
  const hasSearched = useAtomValue(hasSearchedAtom);

  return (
    <div style={{ padding: '24px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>TV Shows Search</Title>
          <Text type="secondary">Search for your favorite TV shows</Text>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchInput />
        </div>

        {isLoading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>
              <Text>Searching for shows...</Text>
            </div>
          </div>
        )}

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
          />
        )}

        {!isLoading && !error && hasSearched && moviesData.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Text type="secondary">No shows found. Try searching with different keywords.</Text>
          </div>
        )}

        {!isLoading && !error && moviesData.length > 0 && (
          <div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text type="secondary">
                Found {moviesData.length} shows
                {filteredMovies.length !== moviesData.length && (
                  <span> • Displaying {filteredMovies.length} after filtering</span>
                )}
              </Text>
            </div>
            <GenreFilter />
            <MoviesTable data={filteredMovies} loading={isLoading} />
          </div>
        )}
      </Space>
    </div>
  );
};
