import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useRouter } from 'expo-router';

const db = SQLite.openDatabase('recipes.db');

export default function AddRecipe() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  const saveRecipe = () => {
    if (!name || !ingredients || !instructions) {
      Alert.alert('Toate câmpurile sunt obligatorii!');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ingredients TEXT, instructions TEXT, image TEXT);'
      );
      tx.executeSql(
        'INSERT INTO recipes (name, ingredients, instructions, image) VALUES (?, ?, ?, ?);',
        [name, ingredients, instructions, image],
        () => { Alert.alert('Rețeta a fost salvată'); router.push('/saved/index'); },
        (t, error) => { console.log(error); }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nume rețetă" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Ingrediente" value={ingredients} onChangeText={setIngredients} style={styles.input} multiline />
      <TextInput placeholder="Instrucțiuni" value={instructions} onChangeText={setInstructions} style={styles.input} multiline />
      <TextInput placeholder="URL imagine" value={image} onChangeText={setImage} style={styles.input} />
      <Pressable onPress={saveRecipe} style={styles.button}>
        <Text style={styles.buttonText}>Salvează Rețeta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: '#32cd32', padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});