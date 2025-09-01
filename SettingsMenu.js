// src/screens/SettingsMenu.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function SettingsMenu({ navigation }) {
  const menuItems = [
    { title: 'Profile', screen: 'Profile' },
    { title: 'Notifications', screen: 'Notifications' },
    { title: 'Theme', screen: 'Theme' },
    { title: 'Language', screen: 'Language' },
    { title: 'About', screen: 'About' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings Menu</Text>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.title}
          style={styles.item}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: { fontSize: 16 },
});
