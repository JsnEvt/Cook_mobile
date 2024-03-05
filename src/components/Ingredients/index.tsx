import { ScrollView, Alert } from 'react-native';
import { router } from "expo-router"
import { styles } from './styles';
import { Ingredient, IngredientsProps } from '../Ingredient';
import { useEffect, useState } from 'react';
import { Selected } from '../Selected';
import { services } from '@/services'

type Props = {
  ingredients: IngredientsProps[]
}

export function Ingredients({ ingredients }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const [ingredients_list, setIngredients_list] = useState<IngredientResponse[]>([])

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value))
    }
    setSelected((state) => [...state, value])
  }

  function handleClearSelected() {
    Alert.alert("Limpar", "Deseja limpar tudo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => setSelected([]) }
    ])
  }

  function handleSearch() {
    router.navigate("/recipes/")
  }

  useEffect(() => {
    services.ingredients.findall().then(setIngredients_list)
  })

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {ingredients_list.map((ingredient) => (
        <Ingredient
          key={ingredient.id}
          name={ingredient.name}
          image={`${services.storage.imagePath}/${ingredient.image}`}
          selected={selected.includes(ingredient.id)}
          onPress={() => handleToggleSelected(ingredient.id)} />
      ))}
      {
        selected.length > 0 && (
          <Selected
            quantity={selected.length}
            onClear={handleClearSelected}
            onSearch={handleSearch}
          />
        )}

    </ScrollView>
  )
}