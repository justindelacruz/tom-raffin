import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import DocumentTitle from 'react-document-title';
import { getPageTitle } from './constants';
import './app.css';
import Landing from './landing/landing';
import Home from './home/home';
import Nav from './nav/nav';
import Bio from './bio/bio';
import Gallery from './gallery/gallery';
import Image from './image/image';
import Contact from './contact/contact'
import ContactThanks from './contact/thanks'
import OilStatement from "./artist-statement/oils";
import WatercolorsStatement from "./artist-statement/watercolors";
import InstallationView from './installation-view/installation-view';
import OneColumnGalleryImage from "./one-column-gallery/one-column-gallery";
import ScrollToTop from './scroll-to-top';
import RouteContext from './route-context';

const PageNotFound = () => (
  <div className="contact">
    <div className="content-block">
      <div className="content-block__body contact__body">
        <h1>Page not found</h1>
        <p>Couldn't find the page you were looking for. Check the URL and try again.</p>
      </div>
    </div>
  </div>
);

class AppRoutes extends Component {
  constructor(props) {
    super(props);

    this.updateRouteContext = (previousRoute) => {
      this.setState( { previousRoute });
    };

    this.state = {
      previousRoute: undefined,
      updateRouteContext: this.updateRouteContext,
    };
  }

  render() {
    return (
        <DocumentTitle title={getPageTitle()}>
          <Router>
            <RouteContext.Provider value={this.state}>
              <ScrollToTop>
                <Route
                  render={({ location }) => (
                    <div className="main">
                      <div className="main__nav">
                        <Nav />
                      </div>
                      <section className="main__body" role="main">
                        <Switch location={location}>
                          <Route exact path="/" component={Landing}/>
                          <Route exact path="/main" component={Home}/>
                          <Route path="/about/oils" component={OilStatement} />
                          <Route path="/about/watercolors" component={WatercolorsStatement} />
                          <Route path="/installation" component={InstallationView}/>
                          <Route path="/gallery/:galleryId(oils-14-18)" exact component={OneColumnGalleryImage} />
                          <Route path="/gallery/:galleryId" component={Gallery} exact />
                          <Route path="/image/:galleryId/:imageId" component={Image} />
                          <Route path="/bio" component={Bio}/>
                          <Route path="/contact" component={Contact}/>
                          <Route path="/thanks" component={ContactThanks}/>
                          <Route path="/about" render={() => <Redirect to="/bio" />} />
                          <Route component={PageNotFound} />
                        </Switch>
                      </section>
                    </div>
                  )} />
              </ScrollToTop>
            </RouteContext.Provider>
          </Router>
        </DocumentTitle>
    );
  }
}

export default AppRoutes;
