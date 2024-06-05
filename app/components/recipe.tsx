import { kv } from "@vercel/kv"
import recipeScraper from "@/app/recipe-scraper"

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

//onst recipeScraper = require("recipe-scraper");


export async function DatabaseRecipeComponent({ recipeName }: { recipeName: string }){
    let response = await kv.set(recipeName, {"name":"Pasta", "ingredients":[{"name": "Rigatoni", "measurementNumber":1, "measurementType":"lb"}], "instructions":["Boil Pasta"]})
    let recipe: Recipe|null = await kv.get(recipeName)
    console.log()
    return RecipeComponent(recipe)
}

function RecipeComponent(recipe:Recipe|null){
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

export async function ScrapedComponent({url}:{url:string}){
    console.log(url)
    let recipe = await recipeScraper(url).catch( (e: any) => {console.log("Not Found, " + e); return null})
    return RecipeComponent(recipe)



}