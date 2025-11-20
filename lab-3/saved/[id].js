import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from 'expo-router';

const db = SQLite.openDatabase('recipes.db');

export default function SavedRecipeDetails() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM recipes WHERE id = ?;', [id], (_, { rows }) => {
        setRecipe(rows._array[0]);
      });
    });
  }, [id]);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      {recipe.image ? <Image source={{ uri: recipe.image }} style={styles.img} /> : null}
      <Text style={styles.subtitle}>Ingrediente:</Text>
      <Text>{recipe.ingredients}</Text>
      <Text style={styles.subtitle}>Instrucțiuni:</Text>
      <Text>{recipe.instructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  img: { width: '100%', height: 200, marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 }
});