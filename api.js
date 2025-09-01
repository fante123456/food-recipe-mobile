// src/services/api.js
const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

// Fetch recipes by category
export const fetchRecipesByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (e) {
    console.error('Error fetching recipes by category:', e);
    return [];
  }
};

// Fetch recipe details by ID
export const fetchRecipeDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (e) {
    console.error('Error fetching recipe details:', e);
    return null;
  }
};
