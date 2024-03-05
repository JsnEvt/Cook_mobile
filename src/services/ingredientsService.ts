import { supabase } from './supabase';

export async function findall() {
  const { data } = await supabase
    .from("ingredients")
    .select()
    .order("name")
    .returns<IngredientResponse[]>()
  return data ?? []
}
