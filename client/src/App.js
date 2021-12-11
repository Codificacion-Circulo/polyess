import React, { Suspense } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import { Web3ReactProvider} from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Home from "./pages/home/Home"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Forgot from "./components/auth/Forgot"
import Reset from "./components/auth/Reset"
import Faqs from "./components/faqs/Faqs"
import Leaderboard from "./pages/leaderboard/Leaderboard"
import Profile from "./pages/profile/Profile"
import Market from "./pages/market/Market"
import Error from "./pages/error/Error"
import LoadingSpinner from './components/misc/LoadingSpinner/LoadingSpinner'
import JoinRoom from './integration/onboard/joinroom'
import Onboard from './integration/onboard/onboard'
import JoinGame from './integration/onboard/joingame'
import ChessGame from './components/game/chessUI/chessgame'
import {ColorContext} from './store/colorcontext'
import History from "./pages/history/History";
import Token from "./pages/token/Token";



function App() {
  
  function getLibrary(provider){
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
  }
  const [didRedirect, setDidRedirect] = React.useState(false)

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true)
  }, [])

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false)
  }, [])

  const [userName, setUserName] = React.useState('')

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
     <ColorContext.Provider value = {{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>
    <BrowserRouter>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/forgot" exact>
              <Forgot />
            </Route>
            <Route path="/reset" exact>
              <Reset />
            </Route>
            <Route path = "/game" exact>
            <Onboard setUserName = {setUserName}/>
          </Route>
          <Route path = "/game/:gameid" exact>
            {didRedirect ? 
              <React.Fragment>
                    <JoinGame userName = {userName} isCreator = {true} />
                    <ChessGame myUserName = {userName} />
              </React.Fragment> 
              :
              <JoinRoom />}
          </Route>
            <Route path="/leaderboard" exact>
              <Leaderboard />
            </Route>
            <Route path="/history" exact>
              <History />
            </Route>
            <Route path="/market" exact>
              <Market />
            </Route>
            <Route path="/token" exact>
              <Token />
            </Route>
            <Route path="/profile/:id" exact>
              <Profile />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/faq" exact>
              <Faqs />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
    </ColorContext.Provider>
    </Web3ReactProvider>
  );
}

export default App;