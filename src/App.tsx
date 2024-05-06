import React, { Component, ComponentType, FC, lazy } from 'react'
import { HashRouter, Routes, Route, useParams, BrowserRouter, Navigate, NavLink } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import './css/App.css'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import News from './components/News/News.jsx'
import Music from './components/Music/Music.jsx'
import Settings from './components/Settings/Settings.jsx'
import Footer from './components/Footer'
import { AuthPage } from './components/Auth/Auth'
import { initializeApp } from './redux/appReducer'
import { compose } from 'redux'
import Preloader from './components/Preloader/Preloader'
import store, { AppStateType } from './redux/redux-store'
import { withSuspense } from './hoc/Suspense'
import { UsersPage } from './components/Users/UsersContainer'
import NotFound from './components/NotFound/NotFound'
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd'
import Header from './components/Header/Header'
import { 
  LaptopOutlined, HomeOutlined, UserOutlined, MailOutlined, TeamOutlined, ProfileOutlined, SettingOutlined, CustomerServiceOutlined, WechatOutlined 
} from '@ant-design/icons'

const DialoguesContainer = lazy(() => import('./components/Dialogues/DialoguesContainer'))
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))
const DialogContainerWithSuspense = withSuspense(DialoguesContainer)
const ProfileContainerWithSuspense = withSuspense(ProfileContainer)
const ChatPageWithSuspense = withSuspense(ChatPage)

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

const { Content, Sider } = Layout

export type MenuItem = Required<MenuProps>['items'][number]

export function getItem(label: React.ReactNode,
                        key?: React.Key | null,
                        icon?: React.ReactNode,
                        children?: MenuItem[]): MenuItem {
                          return {
                            key, icon, children, label
                          } as MenuItem
                        }

const itemsSideMenu: MenuItem[] = [
  getItem('Профиль', 'Профиль', <UserOutlined />, [
    getItem(
      <NavLink to='/profile'>
        Мой профиль
      </NavLink>, 'profile', <ProfileOutlined />),
    getItem(
      <NavLink to='/messages'>
        Мои сообщения
      </NavLink>, 'messages', <MailOutlined />)
  ]),
  getItem('Пользователи', 'Пользователи', <TeamOutlined />, [
    getItem(
      <NavLink to='/users'>
        Пользователи
      </NavLink>, 'users', <TeamOutlined />),
    getItem(
      <NavLink to='/chat'>
        Диалоги
      </NavLink>, 'chat', <WechatOutlined />)
  ]),
  getItem(
    <NavLink to='/news'>
      Новости
    </NavLink>, 'news', <LaptopOutlined />),
  getItem(
    <NavLink to='/music'>
      Музыка
    </NavLink>, 'music', <CustomerServiceOutlined />),
  getItem(
    <NavLink to='/settings'>
      Настройки
    </NavLink>, 'settings', <SettingOutlined />)
]

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (PromiseRejectionEvent: PromiseRejectionEvent) => {
    console.log('Error occured')
  }

  componentDidMount() {
    this.props.initializeApp()
    //window.addEventListener('unhandlerejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    //window.removeEventListener('unhandlerejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <Layout>
        <Header />
        <Content style={{padding: '0 70px'}}>
          <Breadcrumb
            style={{margin: '15px 0'}}
            items={[
                {
                  href: '',
                  title: <HomeOutlined />,
                },
                {
                  href: 'App',
                  title: 'Social Network'
                }
              ]} />
          <Layout style={{padding: '5px 0 77px'}}>
            <Sider width={300}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={itemsSideMenu}
              />
            </Sider>
            <Content style={{padding: '0 24px', minHeight: 280}}>
              <Routes>
                <Route 
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
                  element={<UsersPage pageTitle={'Самураи'} />} />
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
                  element={<AuthPage />} />
                <Route 
                  path='*' 
                  element={<NotFound />} />
                <Route 
                  path='/chat' 
                  element={<ChatPageWithSuspense />} />
              </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer />
      </Layout>

      /*<div className='app-wrapper'>
        <HeaderContainer />
        <Sidebar />
        <div className='content'>
          <Routes>
            <Route 
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
              element={<UsersPage pageTitle={'Самураи'} />} />
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
              element={<AuthPage />} />
            <Route 
              path='*' 
              element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>*/
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