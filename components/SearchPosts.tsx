import React, { useState, useEffect } from 'react';
import { Button, Flex, Select } from "@chakra-ui/react";
import { supabase } from '../lib/supabaseClient';

interface SearchPostsProps {
  onSearch: (category: string) => void;
}

export const SearchPosts: React.FC<SearchPostsProps> = ({ onSearch }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('posts').select('category');

    if (error) {
      console.error('Error fetching categories:', error.message);
    }

    if (Array.isArray(data)) {
      const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
      setCategories(uniqueCategories);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(selectedCategory);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex mt={20} direction="row">
        <Select placeholder="Select category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase()+ category.slice(1)}
            </option>
          ))}
        </Select>
        <Button bg="#4169E1" color="white" p={5} ml={5} type="submit">Search</Button>
      </Flex>
    </form>
  );
};
