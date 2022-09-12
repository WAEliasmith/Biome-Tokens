import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Token from "./pages/token";
import Createdtokens from "./pages/created-tokens";

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} nearConfig={nearConfig} wallet={wallet} />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} contract={contract} currentUser={currentUser} />} />
        <Route exact path="/created-tokens" render={(props) => <Createdtokens {...props} contract={contract} currentUser={currentUser} />} />
        <Route exact path="/profile" render={(props) => <Profile {...props} contract={contract} currentUser={currentUser} />} />
        <Route exact path="/token/:id" render={(props) => <Token {...props} contract={contract} currentUser={currentUser} />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
