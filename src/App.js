import React, { Component, Suspense, lazy } from 'react';
import {BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import './css/App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Sidebar from './components/Sidebar/Sidebar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Footer from './components/Footer';
import UsersContainer from './components/Users/UsersContainer';
import Auth from './components/Auth/Auth';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import Preloader from './components/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './hoc/Suspense';

//import DialoguesContainer from './components/Dialogues/DialoguesContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
const DialoguesContainer = lazy(() => import('./components/Dialogues/DialoguesContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const DialogContainerWithSuspense = withSuspense(DialoguesContainer)
const ProfileContainerWithSuspense = withSuspense(ProfileContainer)

export function withRouter(Children) {
  return(props) => {
      const match = {params: useParams()};
      return <Children {...props} match={match} />
  }
}

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
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
              path='/messages' 
              element={<DialogContainerWithSuspense/>} />
            <Route 
              path='/profile/:userId?' 
              element={<ProfileContainerWithSuspense/>} />
            <Route 
              path='/users' 
              element={<UsersContainer />} />
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
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

/*export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);*/

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const SocialNetworkApp = (props) => {
  return <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
};

export default SocialNetworkApp;