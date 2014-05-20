var $ = require('jquery');
var win = $(window);

function Autoscale (el, options) {
  this.el = $(el);
  this.options = $.extend({}, Autoscale.DEFAULTS, options, this.el.data());

  if (this.options.parent) {
    this.parent = $(this.options.parent);
  } else {
    this.parent = this.el.parent();
  }

  this.init();
}

Autoscale.DEFAULTS = {
  mode: 'cover'
};

Autoscale.prototype.init = function () {
  this.el.addClass('Autoscale');
  this.parent.addClass('Autoscale-parent');

  this.refresh();
  this.refresh = $.proxy(this.refresh, this);
  this.isAnimating = false;

  win.on('resize', $.proxy(this.handleResize, this));
};

Autoscale.prototype.getCSS = function(parent, ratio) {
  parent.ratio = parent.width / parent.height;

  var size = {
    width: 0,
    height: 0
  };

  if (this.options.mode === 'cover' && ratio <= parent.ratio) {
    size.width = parent.width;
    size.height = size.width / ratio;
  } else {
    size.height = parent.height;
    size.width = size.height * ratio;
  }

  return {
    width: size.width + 'px',
    height: size.height + 'px',
    marginLeft: -0.5 * size.width + 'px',
    marginTop: -0.5 * size.height + 'px'
  };
};

Autoscale.prototype.getRatio = function() {
  if (this.options.ratio) {
    return this.options.ratio;
  }

  return this.el.width() / this.el.height();
};

Autoscale.prototype.refresh = function() {
  var parent = {
    width: this.parent.width(),
    height: this.parent.height()
  };

  this.el.css(this.getCSS(parent, this.getRatio()));
  this.isAnimating = false;
};

Autoscale.prototype.handleResize = function() {
  if (!this.isAnimating) {
    window.requestAnimationFrame(this.refresh);
  }

  this.isAnimating = true;
};

$.fn.autoscale = function(options) {
  return this.each(function() {
    new Autoscale(this, options);
  });
};

win.on('load', function() {
  $('[data-autoscale]').autoscale();
});
