# Autoscale component

Autoscale elements to fill a container.

## Usage

HTML Markup:

```html
<div class="with-Autoscale">
    <img class="Autoscale" data-autoscale src="aranja-is-awesome.png">
</div>
```

Note that the classes `.Autoscale` and `.with-Autoscale` are optional 
but they are configured so that the plugin behaves correctly. 

The only requirement for styling is that the `data-autoscale` element has
these styles applied:

```css
element {
  left: 50%;
  position: absolute;
  top: 50%;
}
```

The same element is also required to be within an positioned container with
overflow hidden:

```css
container {
  overflow: hidden;
  position: relative;
}
```

### Options
Options can be passed via JavaScript. 

| Name | type | default | description |
| ------ | ------- | ----- | ------ |
| autoscale | string | undefined | Two modes: `cover` and `contain`. This option can be past to the initializing data attribute: `data-autoscale="contain"`. |
| ratio | number | undefined | Set a predefined ratio. |