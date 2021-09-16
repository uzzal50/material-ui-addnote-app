import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'
import Layout from './components/layout'

const customTheme = createTheme({
  palette: {
    secondary: deepPurple,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightReqular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 500,
  },
})

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Notes />
            </Route>
            <Route path='/create'>
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
