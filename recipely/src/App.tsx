import { BrowserRouter, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import * as Pages from "./pages"
import store from "./app/store"
import { Layout, Private } from "./components"

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <BrowserRouter>
            <Route path="/" exact component={Pages.Landing} />
            <Route path="/start" exact component={Pages.Auth} />
            <Private path="/home" exact component={Pages.Home} />
            <Private path="/recipes" exact component={Pages.Recipes} />
            <Private path="/ingredients" exact component={Pages.Ingredients} />
            <Private path="/utensils" exact component={Pages.Utensils} />
            <Private path="/settings" exact component={Pages.Settings} />
            <Private path="/conversions" exact component={Pages.Conversions} />
          </BrowserRouter>
        </Layout>
      </ChakraProvider>
    </Provider>
  )
}

export default App
