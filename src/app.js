import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import './app.css';
import Home from './home/home';
import Nav from './nav/nav';
import Bio from './bio/bio';
import Gallery from './gallery/gallery';
import TwoColumnGallery from './two-column-gallery/two-column-gallery';
import Image from './image/image';
import Contact from './contact/contact'
import OilStatement from "./artist-statement/oils";
import WatercolorsStatement from "./artist-statement/watercolors";

const AppRoutes = () => (
  <Router>
    <Route
      render={({ location }) => (
          <div className="main">
            <nav className="main__nav">
              <Nav />
            </nav>
            <div className="main__body">
              <Switch location={location}>
                <Route exact path="/" component={Home}/>
                <Route path="/about/oils" component={OilStatement} />
                <Route path="/about/watercolors" component={WatercolorsStatement} />
                <Route path="/gallery/:galleryId(oils-14-18)" exact component={TwoColumnGallery} />
                <Route path="/gallery/:galleryId" component={Gallery} exact />
                <Route path="/image/:galleryId/:imageId" component={Image} />
                <Route path="/bio" component={Bio}/>
                <Route path="/contact" component={Contact}/>
                <Route render={() => <div>Not Found</div>} />
              </Switch>
            </div>
          </div>
      )} />
  </Router>
);

export default AppRoutes;
