import { kv } from "@vercel/kv"

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

export async function RecipeComponent({ recipeName }: { recipeName: string }){
    // let response = await kv.set(recipeName, {"name":"Pasta", "ingredients":[{"name": "Rigatoni", "measurementNumber":1, "measurementType":"lb"}], "instructions":["Boil Pasta"]})
    let recipe: Recipe|null = await kv.get(recipeName)
    console.log(recipe)
    return <div>
        {recipe !== null && 
            <div><h1>{recipe.name}</h1>

                <ul>
                    {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing.name}</li>)}
                </ul>

                <ol>
                    {recipe.instructions.map((instr, idx) => <li key={idx}>{instr}</li>)}
                </ol>
            </div>
        }

        {recipe == null && <h1>Recipe Not Found</h1>}
        
    </div>
}