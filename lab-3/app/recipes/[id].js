import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data.meals[0]));
  }, [id]);

  if (!recipe) return <Text>Loading...</Text>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.img} />
      <Text style={styles.subtitle}>Ingrediente:</Text>
      {ingredients.map((ing, idx) => <Text key={idx}>{ing}</Text>)}
      <Text style={styles.subtitle}>Instrucțiuni:</Text>
      <Text>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  img: { width: '100%', height: 200, marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 }
});