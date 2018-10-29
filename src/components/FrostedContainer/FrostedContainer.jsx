import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from "@leiops/helpers"

import FrostedContext from 'utils/FrostedContext'


class FrostedContainer extends React.Component {

  containerRef = React.createRef()

  render() {
    
    const { children, shouldNotStretch } = this.props
    // TO DO - maybe this dom addition isn't necessary?
    return (
      <FrostedContext.Provider 
        value={{
          children,
          containerRef: this.containerRef,
        }}
      >
        <div 
          ref={this.containerRef}
          className={classNames(
            "frosted-container",
            !shouldNotStretch && "--stretch",
          )}
        >{children}</div>
      </FrostedContext.Provider>
    ) 
  }
}

FrostedContainer.displayName = "FrostedContainer"
FrostedContainer.propTypes = {
  shouldNotStretch: PropTypes.bool,
}
FrostedContainer.defaultProps = {
  shouldNotStretch: false
}

export default FrostedContainer