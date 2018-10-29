import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from "@leiops/helpers"
import FrostedContext from 'utils/FrostedContext'

// TO DO - maybe make an image? https://www.npmjs.com/package/dom-to-image
// TO DO - test with one child and multiple children
const recursiveStripChildren = (children, frosted) => {

  return React.Children.map(children, child => {

    // TO DO - this means we don't support rendering blurred frosted elements within or on top of each other - we need some way of identifying *which* frosted instance this is
    if (child.type === Frosted)
      return (React.cloneElement(
        frosted,
        {
          ...frosted.props,
          style: {
            ...(frosted.props.style || {}),
            opacity: 0,
          }
        },
      ))
    else if (child.props && child.props.children)
      return (React.cloneElement(
        child,
        child.props,
        // DEV - I have no idea how or why this works, without stripping the children, but it seems to, so yay. This stays like this until I figure this business out.
        null
        // recursiveStripChildren(child.props.children, frosted)
      ))
    else
      return (child)

  })

}

class Frosted extends React.Component {

  state = {
    frosted: {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }
  }

  frosted = React.createRef()
  contentFrame = React.createRef()
  content = React.createRef()

  componentDidMount() {
      window.addEventListener('resize', this.updateSizing)

      // TO DO - memoize: every sibling component is going to fire one of these
      window.dispatchEvent(new Event('resize'))
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSizing)
  }

  updateSizing = event => {
    const frosted = this.frosted.current || {}
    
    this.setState(() => ({
      frosted: {
        width: frosted.clientWidth || 0,
        height: frosted.clientHeight || 0,
        top: frosted.offsetTop || 0,
        left: frosted.offsetLeft || 0,
      }
    }))
  }

  render() {

    const { frosted } = this.state

    const child = React.Children.only(this.props.children)
    const renderedFrosted = React.cloneElement(
      child,
      {
        // TO DO - add ref forwarding when there is already a ref specified: https://reactjs.org/docs/forwarding-refs.html
        ref: this.frosted,
        className: classNames(
          child.props.className,
          "--frosted"
        )
      }
    )

    return (
      <React.Fragment>
        {renderedFrosted}
        <FrostedContext.Consumer>
          {({ children, containerRef }) => {
            return(
            <div 
              className="blurred-content-frame" 
              ref={this.contentFrame}
              style={{
                width: frosted.width,
                height: frosted.height,
                top: frosted.top,
                left: frosted.left,
              }}
            >
              <div 
                className="blurred-content"
                ref={this.content}
                style={{
                  top: -frosted.top,
                  left: -frosted.left,
                  width: (containerRef.current || {}).clientWidth,
                  height: (containerRef.current || {}).clientHeight,
                  filter: `blur(${this.props.blurBy})`,
                }}
              >
                {recursiveStripChildren(children, renderedFrosted)}
              </div>
            </div>
          )}}
        </FrostedContext.Consumer>
      </React.Fragment>
    )
  }
}

Frosted.displayName = "Frosted"
Frosted.propTyes = {
  className: PropTypes.string,
  blurBy: PropTypes.string,
}
Frosted.defaultProps = {
  blurBy: "8px",
}

export default Frosted