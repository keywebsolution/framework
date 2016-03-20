import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, NotFoundRoute, IndexRoute } from 'react-router'
import Main from './components/main'
import Header from './components/basic/header'
import Footer from './components/basic/footer'
import PageNotFound from './components/basic/pageNotFound'
import About from './components/basic/about'
import createBrowserHistory from 'history/lib/createBrowserHistory';    
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
//import InitialActions from './actions/initialActions'
class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
          <div className="Content">
            {this.props.children}
          </div>
        <Footer />
      </div>
    )
  }
}

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="about" component={About} />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>
), document.getElementById('app'))
