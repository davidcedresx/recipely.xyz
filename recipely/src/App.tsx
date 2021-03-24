import { BrowserRouter, Route } from "react-router-dom"
import { Provider } from "react-redux"
import * as Pages from "./pages"
import store from "./store/store"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" exact component={Pages.Landing} />
        <Route path="/start" exact component={Pages.Auth} />
        <Route path="/home" exact component={Pages.Home} />
        <Route path="/recipes" exact component={Pages.Recipes} />
        <Route path="/ingredients" exact component={Pages.Ingredients} />
        <Route path="/utensils" exact component={Pages.Utensils} />
        <Route path="/settings" exact component={Pages.Settings} />
      </BrowserRouter>
    </Provider>
  )
}

export default App
