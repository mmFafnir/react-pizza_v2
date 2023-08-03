
import { RootState } from "../..";

export const selectPizzaById = (id: string) => (state: RootState) => state.pizza.items.find(pizza => Number(pizza.defaultId) === Number(id)); 