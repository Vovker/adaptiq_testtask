import {ChangeEvent, useEffect, useRef} from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAtom, useSetAtom } from 'jotai';
import debounce from 'debounce';
import { searchQueryAtom, triggerSearchAtom } from '../model/model';

const { Search } = Input;

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const triggerSearch = useSetAtom(triggerSearchAtom);

  const debouncedTriggerSearch = useRef(
    debounce((query: string) => {
      triggerSearch(query);
    }, 1500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedTriggerSearch.clear();
    };
  }, [debouncedTriggerSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedTriggerSearch(value);
  };

  const handleSearch = (value: string) => {
    triggerSearch(value);
  };

  return (
    <Search
      placeholder="Search for TV shows..."
      allowClear
      enterButton={<SearchOutlined />}
      size="large"
      value={searchQuery}
      onChange={handleInputChange}
      onSearch={handleSearch}
      style={{ maxWidth: 600, width: '100%' }}
    />
  );
};
