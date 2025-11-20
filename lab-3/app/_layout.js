import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Cook Book' }} />
      <Stack.Screen name="recipes/[id]" options={{ title: 'Detalii Rețetă' }} />
      <Stack.Screen name="recipes/add" options={{ title: 'Adaugă Rețetă' }} />
      <Stack.Screen name="saved/index" options={{ title: 'Rețete Salvate' }} />
      <Stack.Screen name="saved/[id]" options={{ title: 'Detalii Salvate' }} />
    </Stack>
  );
}