import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PokemonList from './components/PokemonList';
import PokemonPopup from './components/PokemonPopup';
import Header from './components/Header';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <View style={styles.container}>
      <Header></Header>
      <PokemonList onPress={setSelectedPokemon} />
      {selectedPokemon && (
        <PokemonPopup
          pokemon={selectedPokemon}
          visible={!!selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});