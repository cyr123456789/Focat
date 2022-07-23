import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import React from 'react';
import fetchSearchResults from './fetch_search_results';
import { default as theme } from '../../../custom-theme.json';

const SearchInput = ({ userInput, setUserInput, setSearchResults }) => {
  const searchButton = (props) => (
    <TouchableWithoutFeedback
      onPress={() => fetchSearchResults(userInput, setSearchResults)}
    >
      <Icon name="search-outline" {...props} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      style={styles.input}
      placeholder="Enter username"
      value={userInput}
      onChangeText={(text) => setUserInput(text)}
      accessoryRight={searchButton}
      selectionColor={theme['color-primary-300']}
    />
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
});
