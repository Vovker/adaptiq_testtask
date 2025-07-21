import { Table, Tag, Rate } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TVMazeSearchResult } from '@adaptiq/core-types';

interface MoviesTableProps {
  data: TVMazeSearchResult[];
  loading?: boolean;
}

export const MoviesTable = ({ data, loading = false }: MoviesTableProps) => {
  const columns: ColumnsType<TVMazeSearchResult> = [
    {
      title: 'Name',
      dataIndex: ['show', 'name'],
      key: 'name',
      render: (name: string) => (
        <span style={{ fontWeight: 500 }}>{name}</span>
      ),
    },
    {
      title: 'Year',
      key: 'year',
      width: 100,
      render: (_, record) => {
        const year = record.show.premiered 
          ? new Date(record.show.premiered).getFullYear()
          : 'N/A';
        return <span>{year}</span>;
      },
    },
    {
      title: 'Genre',
      key: 'genres',
      width: 200,
      render: (_, record) => (
        <div>
          {record.show.genres.length > 0 ? (
            record.show.genres.map((genre) => (
              <Tag key={genre} color="blue" style={{ marginBottom: 4 }}>
                {genre}
              </Tag>
            ))
          ) : (
            <span style={{ color: '#999' }}>No genres</span>
          )}
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: ['show', 'type'],
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag color="green">{type || 'Unknown'}</Tag>
      ),
    },
    {
      title: 'Language',
      dataIndex: ['show', 'language'],
      key: 'language',
      width: 120,
      render: (language: string) => (
        <span>{language || 'N/A'}</span>
      ),
    },
    {
      title: 'Rating',
      key: 'rating',
      width: 150,
      render: (_, record) => {
        const rating = record.show.rating?.average;
        if (rating) {
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Rate 
                disabled 
                allowHalf 
                value={rating / 2} 
                style={{ fontSize: 14 }}
              />
              <span style={{ fontSize: 12, color: '#666' }}>
                {rating.toFixed(1)}
              </span>
            </div>
          );
        }
        return <span style={{ color: '#999' }}>No rating</span>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.show.id}
      size="large"
      style={{ marginTop: 16 }}
    />
  );
};
