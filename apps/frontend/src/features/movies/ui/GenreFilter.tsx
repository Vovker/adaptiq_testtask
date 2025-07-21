import { useAtom, useAtomValue } from 'jotai';
import { Tag, Typography, Space } from 'antd';
import { availableGenresAtom, selectedGenresAtom } from '../model/model';

const { Text } = Typography;

export const GenreFilter = () => {
  const availableGenres = useAtomValue(availableGenresAtom);
  const [selectedGenres, setSelectedGenres] = useAtom(selectedGenresAtom);

  const handleGenreClick = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const clearAllGenres = () => {
    setSelectedGenres([]);
  };

  if (availableGenres.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text strong>Filter by Genres:</Text>
          {selectedGenres.length > 0 && (
            <Tag 
              color="red" 
              style={{ cursor: 'pointer' }}
              onClick={clearAllGenres}
            >
              Clear All ({selectedGenres.length})
            </Tag>
          )}
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {availableGenres.map(genre => (
            <Tag
              key={genre}
              color={selectedGenres.includes(genre) ? 'blue' : 'default'}
              style={{ 
                cursor: 'pointer',
              }}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </Tag>
          ))}
        </div>
        
        {selectedGenres.length > 0 && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            Showing results for: {selectedGenres.join(', ')}
          </Text>
        )}
      </Space>
    </div>
  );
};
