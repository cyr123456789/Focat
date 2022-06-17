import React from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';


export const SearchFriendsList = (data) => {
  const renderItemAccessory = (props) => <Button size="tiny">Add</Button>;

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return <List style={styles.container} data={data.data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 250,
  },
});
