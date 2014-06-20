'use strict';
var $ = require('jquery');

/**
 * Autoscale takes an element and make sure it fits its container.
 * @constructor
 * @param {HTMLElement} el - The DOM element.
 * @param {{autoscale: string}} options - The options.
 */
function Autoscale(el, options) {
  this.el = $(el);
  this.options = $.extend({}, Autoscale.DEFAULTS, options);
  this.parent = this.el.offsetParent();
  this.init();
}

/**
 * Autoscale Default Settings
 * @type {{autoscale: string}}
 */
Autoscale.DEFAULTS = {
  autoscale: 'cover'
};

/**
 * Initialize an Autoscale Instance.
 * Set resize handler for keeping media
 * in correct scale and position.
 */
Autoscale.prototype.init = function() {
  this.refresh();
  this.refresh = $.proxy(this.refresh, this);
  this.isAnimating = false;
  $(window).on('resize.aranja', $.proxy(this.handleResize, this));
};

/**
 * Calculate CSS values for scale and position.
 * @param parent
 * @param ratio
 * @returns {{
 *   width: string,
 *   height: string,
 *   marginLeft: string,
 *   marginTop: string
 * }}
 */
Autoscale.prototype.getCSS = function(parent, ratio) {
  parent.ratio = parent.width / parent.height;

  var size = {
    width: 0,
    height: 0
  };

  if (this.options.autoscale === 'cover' && ratio <= parent.ratio) {
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

/**
 * Get Element Ratio
 * @returns {number|*|ratio}
 */
Autoscale.prototype.getRatio = function() {
  return this.options.ratio || this.el.width() / this.el.height();
};

/**
 * Refresh Element
 */
Autoscale.prototype.refresh = function() {
  var parent = {
    width: this.parent.width(),
    height: this.parent.height()
  };

  this.el.css(this.getCSS(parent, this.getRatio()));
  this.isAnimating = false;
};

/**
 * Resize Handler
 */
Autoscale.prototype.handleResize = function() {
  if (!this.isAnimating) {
    window.requestAnimationFrame(this.refresh);
  }

  this.isAnimating = true;
};

module.exports = Autoscale;

/**
 * jQuery Autoscale Plugin
 * @param options
 * @returns {*}
 */
$.fn.autoscale = function(options) {
  return this.each(function() {
  new Autoscale(this, options);
  });
};

/**
 * Initialize Data Attribute
 */
$(window).on('load.aranja', function() {
  $('[data-autoscale]').autoscale($(this).data());
});
