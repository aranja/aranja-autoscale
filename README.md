# Aranja Autoscale Component

Autoscale images or videos to fill a container div.

## Usage

HTML Markup:

```html
<div class="Autoscale-parent">
    <img class="Autoscale" data-autoscale src="aranja-is-awesome.png">
</div>
```

Note that the classes `.Autoscale` and `.Autoscale-parent` are optional 
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
