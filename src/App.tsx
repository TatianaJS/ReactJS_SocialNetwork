import React, { Component, ComponentType, FC, lazy } from 'react'
import { HashRouter, Routes, Route, useParams, BrowserRouter, Navigate } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import './css/App.css'
import HeaderContainer from './components/Header/HeaderContainer'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import News from './components/News/News.jsx'
import Music from './components/Music/Music.jsx'
import Settings from './components/Settings/Settings.jsx'
import Footer from './components/Footer.jsx'
import UsersContainer from './components/Users/UsersContainer'
import Auth from './components/Auth/Auth'
import { initializeApp } from './redux/appReducer'
import { compose } from 'redux'
import Preloader from './components/Preloader/Preloader'
import store, { AppStateType } from './redux/redux-store'
import { withSuspense } from './hoc/Suspense'

const DialoguesContainer = lazy(() => import('./components/Dialogues/DialoguesContainer'))
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const DialogContainerWithSuspense = withSuspense(DialoguesContainer)
const ProfileContainerWithSuspense = withSuspense(ProfileContainer)

export function withRouter(Children: any) {
  return(props: MapPropsType) => {
      const match = {params: useParams()};
      return <Children {...props} match={match} />
  }
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Error occured')
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandlerejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandlerejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Sidebar />
        <div className='content'>
          <Routes>
            <Route 
              exact
              path='/' 
              element={<Navigate to={'/profile'} /> } />
            <Route 
              path='/messages' 
              element={<DialogContainerWithSuspense />} />
            <Route 
              path='/profile/:userId?' 
              element={<ProfileContainerWithSuspense />} />
            <Route 
              path='/users' 
              element={<UsersContainer pageTitle={'Самураи'} />} />
            <Route 
              path='/news' 
              element={<News />} />
            <Route 
              path='/music' 
              element={<Music />} />
            <Route 
              path='/settings' 
              element={<Settings />} />
            <Route 
              path='/auth' 
              element={<Auth />} />
            <Route 
              path='*' 
              element={() => <div>404 NOT FOUND</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App)

//v.1
{/*<React.StrictMode></React.StrictMode>*/}
const SocialNetworkApp: FC = () => {
  return <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
  </BrowserRouter>
}

//v.2 for GitHub pages
/*const SocialNetworkApp: FC = () => {
  return <HashRouter basename='/'>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}*/

export default SocialNetworkApp