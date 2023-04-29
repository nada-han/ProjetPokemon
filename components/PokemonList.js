import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PokemonList = ({ onPress }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(response => response.json())
      .then(data => setPokemons(data.pokemon))
      .catch(error => console.error(error))
  }, []);

  // Group Pokemons by type
  const types = {};
  pokemons.forEach(pokemon => {
    pokemon.type.forEach(type => {
      if (!types[type]) {
        types[type] = [];
      }
      types[type].push(pokemon);
    });
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Image source={{ uri: item.img }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      {pokemons && pokemons.length > 0 ? (
        Object.keys(types).map(type => (
          <View key={type}>
            <Text style={styles.typeTitle}>{type}</Text>
            <FlatList
              data={types[type]}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))
      ) : (
        <Text>No Pokemons found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  card: {
    width: 150,
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    padding: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
  },
  typeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default PokemonList;
