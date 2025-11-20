import { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => res.json())
      .then(data => setRecipes(data.meals || []));
  }, []);

  const searchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => setRecipes(data.meals || []));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Caută rețetă..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        onSubmitEditing={searchRecipes}
      />
      <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/recipes/${item.idMeal}`)} style={styles.item}>
            <Image source={{ uri: item.strMealThumb }} style={styles.img} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </Pressable>
        )}
      />
      <Pressable onPress={() => router.push('/recipes/add')} style={styles.addButton}>
        <Text style={styles.addText}>Adaugă Rețetă Personală</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/saved/index')} style={styles.addButton}>
        <Text style={styles.addText}>Vezi Rețete Salvate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  item: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  img: { width: 80, height: 80, marginRight: 10, borderRadius: 5 },
  title: { fontSize: 16, fontWeight: 'bold' },
  addButton: { backgroundColor: '#ff6347', padding: 10, marginTop: 10, borderRadius: 5, alignItems: 'center' },
  addText: { color: '#fff', fontWeight: 'bold' }
});