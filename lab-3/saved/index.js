import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useRouter } from 'expo-router';

const db = SQLite.openDatabase('recipes.db');

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ingredients TEXT, instructions TEXT, image TEXT);'
      );
      tx.executeSql('SELECT * FROM recipes;', [], (_, { rows }) => {
        setRecipes(rows._array);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/saved/${item.id}`)} style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 16 }
});