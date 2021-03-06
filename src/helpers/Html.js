import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node
  }

  render() {
    const {assets, component} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
            {/*FIXME: Use helmet properly*/}
            {/*head.base.toComponent()*/}
            {/*head.title.toComponent()*/}
            {/*head.meta.toComponent()*/}
            {/*head.link.toComponent()*/}
            {/*head.script.toComponent()*/}
            {/*
            <script src="https://cdn.logrocket.com/LogRocket.min.js"></script>

            <script dangerouslySetInnerHTML={{ __html: 'window.LogRocket.init("mnm-studios/mambajamba", { shouldShowReportingButton: true, })' }} charSet="UTF-8" />
            */}

            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* styles (will be present only in production with webpack extract text plugin) */}
            {Object.keys(assets.styles).map((style, key) =>
              <link href={assets.styles[style]} key={key} media="screen, projection"
                    rel="stylesheet" type="text/css" charSet="UTF-8"/>
            )}

            {/* (will be present only in development mode) */}
            {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
            {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
            {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
            {/* Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../theme/bootstrap.config.js') + require('../containers/App/App.scss')._style}}/> : null */}

            {/* FIXME: Use this for serializing SSR data
            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>*/}
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,500' rel='stylesheet' type='text/css' />
            <script dangerouslySetInnerHTML={{__html: `
                window.__env = {
                  baseDomain: '${process.env.BASE_DOMAIN}'
                };
              `}} />
            <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
            crossOrigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
              crossOrigin="anonymous"></script>
        </head>
        <body>
            <div className="content_wrapper" id="content" dangerouslySetInnerHTML={{__html: content}}/>
            <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
