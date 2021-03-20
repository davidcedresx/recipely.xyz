import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import * as Pages from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Pages.Landing} />
      <Route path="/start" exact component={Pages.Auth} />
      <Route path="/home" exact component={Pages.Home} />
      <Route path="/recipes" exact component={Pages.Recipes} />
      <Route path="/ingredients" exact component={Pages.Ingredients} />
      <Route path="/utensils" exact component={Pages.Utensils} />
      <Route path="/settings" exact component={Pages.Settings} />
    </BrowserRouter>
  )
}

export default App
