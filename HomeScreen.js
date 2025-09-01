// src/screens/HomeScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';

const CATEGORIES = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Desserts',
  'Drinks',
  'Soups',
  'Salads',
  'Pasta',
  'Seafood',
  'Vegetarian',
  'Vegan',
  'Grill',
];

const RECIPES = [
  {
    id: 'r1',
    name: 'Avocado Toast',
    category: 'Breakfast',
    imageUrl: 'https://picsum.photos/seed/avo/600/400',
    prepTime: '10 min',
  },
  {
    id: 'r2',
    name: 'Chicken Caesar Salad',
    category: 'Salads',
    imageUrl: 'https://picsum.photos/seed/salad/600/400',
    prepTime: '20 min',
  },
  {
    id: 'r3',
    name: 'Spaghetti Bolognese',
    category: 'Pasta',
    imageUrl: 'https://picsum.photos/seed/pasta/600/400',
    prepTime: '35 min',
  },
  {
    id: 'r4',
    name: 'Grilled Salmon',
    category: 'Seafood',
    imageUrl: 'https://picsum.photos/seed/salmon/600/400',
    prepTime: '25 min',
  },
  {
    id: 'r5',
    name: 'Vegan Buddha Bowl',
    category: 'Vegan',
    imageUrl: 'https://picsum.photos/seed/vegan/600/400',
    prepTime: '30 min',
  },
  {
    id: 'r6',
    name: 'Tomato Soup',
    category: 'Soups',
    imageUrl: 'https://picsum.photos/seed/soup/600/400',
    prepTime: '15 min',
  },
  {
    id: 'r7',
    name: 'Grilled Steak',
    category: 'Grill',
    imageUrl: 'https://picsum.photos/seed/steak/600/400',
    prepTime: '40 min',
  },
  {
    id: 'r8',
    name: 'Pancakes',
    category: 'Breakfast',
    imageUrl: 'https://picsum.photos/seed/pancakes/600/400',
    prepTime: '20 min',
  },
  {
    id: 'r9',
    name: 'Iced Latte',
    category: 'Drinks',
    imageUrl: 'https://picsum.photos/seed/latte/600/400',
    prepTime: '5 min',
  },
  {
    id: 'r10',
    name: 'Chocolate Brownies',
    category: 'Desserts',
    imageUrl: 'https://picsum.photos/seed/brownies/600/400',
    prepTime: '45 min',
  },
  {
    id: 'r11',
    name: 'Roast Chicken',
    category: 'Dinner',
    imageUrl: 'https://picsum.photos/seed/roast/600/400',
    prepTime: '60 min',
  },
  {
    id: 'r12',
    name: 'Grilled Veg Plate',
    category: 'Vegetarian',
    imageUrl: 'https://picsum.photos/seed/veg/600/400',
    prepTime: '25 min',
  },
];

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'All') return RECIPES;
    return RECIPES.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const renderCategory = (cat) => {
    const active = cat === selectedCategory;
    return (
      <TouchableOpacity
        key={cat}
        onPress={() => setSelectedCategory(cat)}
        style={[styles.chip, active && styles.chipActive]}
      >
        <Text style={[styles.chipText, active && styles.chipTextActive]}>{cat}</Text>
      </TouchableOpacity>
    );
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { recipe: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardMeta}>{item.category} • {item.prepTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Simple header with a text “logo” */}
      <View style={styles.header}>
        <Text style={styles.logo}>Foodie</Text>
      </View>

      {/* Horizontal categories (≥10) */}
      <View style={styles.categories}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map(renderCategory)}
        </ScrollView>
      </View>

      {/* Recipe list */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  logo: { fontSize: 22, fontWeight: '700' },

  categories: { paddingVertical: 10, paddingLeft: 12 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#222' },
  chipText: { color: '#333', fontWeight: '600' },
  chipTextActive: { color: '#fff' },

  listContent: { padding: 12 },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e6e6e6',
  },
  cardImage: { width: '100%', height: 180 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardMeta: { color: '#666' },
});
