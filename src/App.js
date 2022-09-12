import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home";
import Game from "./pages/game";
import Profile from "./pages/profile";
import CreatedGames from "./pages/created-games";

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} nearConfig={nearConfig} wallet={wallet} />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} contract={contract} currentUser={currentUser} />} />
        <Route exact path="/created-games" render={(props) => <CreatedGames {...props} contract={contract} currentUser={currentUser} />} />
        <Route exact path="/profile" render={(props) => <Profile {...props} contract={contract} currentUser={currentUser} />} />
        <Route exact path="/game/:id" render={(props) => <Game {...props} contract={contract} currentUser={currentUser} />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
