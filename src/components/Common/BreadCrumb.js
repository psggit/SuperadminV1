import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import radium from 'radium';

/* Wraps _Link with radium so that It can understand style objects containing selectors and media queries
https://github.com/FormidableLabs/radium/issues/324
*/
const _Link = radium(Link);

/* Expects an ordered array of objects each with title and link (Bread Crumbs) */
class BreadCrumb extends Component {
  render() {
    let style = {};
    style = {
      bWrapper: {
        width: '100%',
        float: 'left',
        padding: '70px 45px 10px 45px',
        background: '#DFDFDF',
        color: 'rgba(0,0,0,0.54)',
        fontWeight: '500',
      },
      divider: {
        marginLeft: '5px',
        marginRight: '5px',
        display: 'inline-block'
      },
      wrapper: {
        float: 'left',
        display: 'inline-block'
      },
      noLink: {
        a: {
          color: '#FF7400',
          display: 'inline-block',
          ':hover': {
            textDecoration: 'none',
            color: 'rgb(255, 0, 0)'
          }
        }
      }
    };
    /* If a < b keep a before b
     * Else if a > b keep a after b
     * Else leave it dont do anything
     * */
    const breadCrumbSorted = this.props.breadCrumbs.sort( (a, b) => {
      return (a.sequence < b.sequence) ? -1 : 1;
    });
    return (
          <div style={ style.bWrapper }>
            {
              breadCrumbSorted.map( (bc, index) => {
                return (
                  <div key={index} style={ style.wrapper }>
                    <span >
                      { (bc.link !== '#') ?
                          (
                            <_Link style={ style.noLink.a } to={ bc.link }>
                              { bc.title }
                            </_Link>
                          )
                        :
                          bc.title
                      }
                    </span>
                    <div style={ style.divider } >
                      { this.props.breadCrumbs.length === (index + 1) ? '' : '/' }
                    </div>
                  </div>
                );
              })
            }
          </div>
        );
  }
}

BreadCrumb.propTypes = {
  breadCrumbs: PropTypes.array.isRequired
};

// BreadCrumb = radium(BreadCrumb);
export default BreadCrumb;
