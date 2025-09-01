// src/screens/DetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function DetailScreen({ route }) {
  const { recipe } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.meta}>{recipe.category} • {recipe.prepTime}</Text>
        <Text style={styles.section}>Ingredients</Text>
        <Text style={styles.text}>• Ingredient 1{'\n'}• Ingredient 2{'\n'}• Ingredient 3</Text>
        <Text style={styles.section}>Instructions</Text>
        <Text style={styles.text}>1) Step one{'\n'}2) Step two{'\n'}3) Step three</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800' },
  meta: { color: '#666', marginTop: 4 },
  section: { marginTop: 16, fontSize: 16, fontWeight: '700' },
  text: { marginTop: 6, color: '#333', lineHeight: 20 },
});
