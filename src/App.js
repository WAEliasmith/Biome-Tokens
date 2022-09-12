import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home";
import Game from "./pages/game";
import CreatedGames from "./pages/created-games";

const App = ({ contract, nearConfig, wallet }) => {
  return (
    <BrowserRouter>
      <Navbar nearConfig={nearConfig} wallet={wallet} />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} contract={contract} />} />
        <Route exact path="/created-games" render={(props) => <CreatedGames {...props} contract={contract} />} />
        <Route exact path="/game/:id" render={(props) => <Game {...props} contract={contract} />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
