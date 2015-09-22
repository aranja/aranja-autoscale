# TUX Autoscale component

Autoscale element to fill a container.

## Usage

HTML Markup:

```html
<div class="with-Autoscale">
    <img data-autoscale src="//lorempixel.com/1600/1200/cats/">
</div>
```

The only requirement for styling is that the parent element has the class `with-Autoscale` or the following styles.

```css
.with-Autoscale {
  overflow: hidden;
  position: relative;
}
```

### Options
Options can be passed via JavaScript. 

| Name | Type | Default | Description |
| ------ | ------- | ----- | ------ |
| autoscale | string | cover | Two modes: `cover` and `contain`. This option can be past to the initializing data attribute: `data-autoscale="contain"`. |
| ratio | number | undefined | Set a predefined ratio. |
| height | number | undefined | Set a fixed height. |
| width | number | undefined | Set a fixed width. |

You have to supply both width and height if you want to set an initial size. This makes images render in correct size while they are loading.

## License
MIT © [Aranja](http://aranja.com/)
