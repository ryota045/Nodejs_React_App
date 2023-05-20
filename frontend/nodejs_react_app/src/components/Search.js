import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    /* ここに検索コンテナのスタイルを追加 */
`;

const SearchInput = styled.input`
    /* ここに検索バーのスタイルを追加 */
`;

const SearchButton = styled.button`
    /* ここに検索ボタンのスタイルを追加 */
`;

const ResultCard = styled.div`
    /* ここに結果カードのスタイルを追加 */
`;

const Search = () => {
    //const [searchQuery, setSearchQuery] = useState("");
    //const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        // APIリクエストを使って検索結果を取得し、setSearchResultsで結果を更新
    };

    return (
        <SearchContainer>
            <SearchInput 
                type="text" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
            {searchResults.map((result, index) => (
                <ResultCard key={index}>
                    {/* 検索結果の表示 */}
                </ResultCard>
            ))}
        </SearchContainer>
    );
};

export default Search;
