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
    backgroundColor: '#808080',
    paddingVertical: 10,
  },
  card: {
    width: 160, 
    height: 220, 
    borderWidth: 2, 
    borderColor: '#333', 
    borderRadius: 10, 
    padding: 10, 
    marginRight: 15, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10, 
    textAlign: 'center', 
  },
  image: {
    width: '80%', 
    height: 160, 
    resizeMode: 'contain',
  },
  typeTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    color : 'green',
    marginLeft: 20, 
    marginTop: 20, 
    marginBottom: 10, 
    textTransform: 'uppercase', 
  },
});

export default PokemonList;
