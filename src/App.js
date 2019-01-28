import React from 'react'
import './App.css'
import BookShelfApp from './BookShelfApp';
import Search from './Search'
import { Route , Switch} from 'react-router-dom'
import PageNotFound from './PageNotFound'

// Navigation handle: navigate to /search
const clickHandle = (history) => {
  history.push("/search");
}

const BooksApp = () => {

  return (
    <div className="app">
    <Switch>
    
      <Route exact strict path="/" render={({ history, match }) => {
        return (<div><BookShelfApp />
          <div className="open-search">
            <button onClick={(e) => clickHandle(history)}>Add a book</button>
          </div>
        </div>)
      }} />
      <Route exact path="/search" render={({ history, match }) => {
        return <Search history={history} />
      }} />

      <Route  component = {PageNotFound} />
    
    </Switch>
    </div>

  )

}



export default BooksApp;
