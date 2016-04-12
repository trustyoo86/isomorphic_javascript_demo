import path                                from 'path';
import React                               from 'react';
import ReactDOMServer                      from 'react-dom/server';
import createLocation                      from 'history/lib/createLocation';
import { RoutingContext, match }           from 'react-router';
import { createMemoryHistory, useQueries } from 'history';
import Promise from 'bluebird';
import { Provider } from 'react-redux';

import configureStore                      from '../../shared/stores/configureStore';
import createRoutes                        from '../../shared/routes/index';
module.exports = (server) => {
  let scriptSrcs;
  let styleSrc;

  if (process.env.NODE_ENV === 'production') {
    let assets = require('../../dist/webpack-assets.json');
    let refManifest = require('../../dist/rev-manifest.json');
    scriptSrcs = [
      `/${assets.vendor.js}`,
      `/${assets.app.js}`
    ];
    styleSrc = `/${refManifest['main.css']}`;
  } else {
    scriptSrcs = [
      'http://localhost:3001/static/vendor.js',
      'http://localhost:3001/static/dev.js',
      'http://localhost:3001/static/app.js'
    ];
    styleSrc = '/main.css';
  }
  /**
   * isomorphic rendering
   */
  server.get('*', (req, res) => {
    let history = createMemoryHistory();
    let store = configureStore();

    let routes = createRoutes(history);

    let location = createLocation(req.url);

    //react-router match location
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) { //exist redirect location
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) { //error
        res.status(500).send(error.message);
      } else if(renderProps) {  //exist renderProps
        let [ getCurrentUrl, unsubscribe ] = subscribeUrl();  //subscribe pathname
        let reqUrl = location.pathname + location.search;

        //redux store promise
        getReduxPromise().then(() => {
          let reduxState = escape(JSON.stringify(store.getState()));
          let html = ReactDOMServer.renderToString(
            <Provider store={ store }>
              { <RoutingContext {...renderProps}/>}
            </Provider>
          );
          //same current url and req objects url
          if (getCurrentUrl() === reqUrl) {
            //ejs rendering (html, scriptsrcs, redux state, stylessrc)
            res.render('index', {html, scriptSrcs, reduxState, styleSrc});
          } else {
            res.redirect(302, getCurrentUrl());
          }

          unsubscribe();
        }, (err) => {
          throw err;
        });

        /**
         * configure store and redux state
         * @returns {object} promise deferred.promise
         */
        function getReduxPromise () {
          let { query, params } = renderProps;
          let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
          let promise = comp.fetchData ?
            comp.fetchData({query, params, store, history}) :
            Promise.resolve();

          return promise;
        }
      } else {
        res.status(404).send('Not found');
      }
    });

    /**
     * @description return url path name and search objects
     * @returns {array}
     */
    function subscribeUrl () {
      let currentUrl = location.pathname + location.search;
      let unsubscribe = history.listen((newLoc) => {
        if (newLoc.action === 'PUSH') {
          currentUrl = newLoc.pathname + newLoc.search;
        }
      });
      return [
        () => currentUrl,
        unsubscribe
      ]
    }
  });
}