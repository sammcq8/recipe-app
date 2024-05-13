
type Recipe = {
    name: string
    ingredients: Food[]
    instructions: String[]   
}
type Food = {
    name: String
}

type Ingredient = {
    name: String
    measurementNumber: number
    measurementType: String
}

export function RecipeComponent(recipe: Recipe){
    return <div>
        <h1>{recipe.name}</h1>

        <ul>
            {recipe.ingredients.map(ing => <li>{ing.name}</li>)}
        </ul>

        <ol>
            {recipe.instructions.map(instr => <li>{instr}</li>)}
        </ol>
    </div>
}