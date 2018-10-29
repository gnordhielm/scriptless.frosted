
# @scriptless/frosted

<img src="https://siteless.co/assets/image/5710239819104256" width="600" />

[![npm](https://img.shields.io/npm/dt/@scriptless/frosted.svg?style=flat-square)](https://www.npmjs.com/package/@scriptless/frosted)
[![npm](https://img.shields.io/npm/v/@scriptless/frosted.svg?style=flat-square)](https://www.npmjs.com/package/@scriptless/frosted)

A simple frosted glass background effect for React components.

## Quick Start

This library provides two exports: `Frosted` and `FrostedContainer`.

`FrostedContainer` wraps all of the content you want a visible in the background of your frosted background. Right now, it works by rendering its children *one layer deep* (this is not an ideal behavior, a better one will come soon), applying a blur filter, then passing that to each child `Frosted` instance. `FrostedContainer` does add a div to the DOM.

`Frosted` does not alter the DOM, except by adding a `--frosted` class to the component it wraps. You may want to add a semi-transparent background to your `--frosted` components to create more distinction between fore- and backgrounds.

```jsx
import {
  Frosted,
  FrostedContainer,
} from "@scriptless/frosted"

class FrostyList extends React.Component {

  state = {
    items: [ ... ]
  }

  ...

  render() {
    return (
      <FrostedContainer>
        <div className="frosty-list" >
          {this.state.items.map(item => (
            <Frosted key={item.id}>
              <div className="frosty-item">
                {item.body}
              </div>
            </Frosted>
          ))}
        </div>
      </FrostedContainer>
    )
  }
}

```

## To Do

* Re-rendering an entire app inside each frosted is not scalable. Perhaps the component should require an image. We could also provide a library for getting an image of your react app on every render.
* Border radius support - just read from the rendered frosted component.
* Updates on scroll.
* Respect parent overflow style rule.
* Storybook.