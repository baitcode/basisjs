/*!
 * Basis javasript library 
 * http://code.google.com/p/basis-js/
 *
 * @copyright
 * Copyright (c) 2006-2011 Roman Dvornov.
 *
 * @license
 * GNU General Public License v2.0 <http://www.gnu.org/licenses/gpl-2.0.html>
 */

basis.require('basis.dom');
basis.require('basis.dom.event');
basis.require('basis.dom.wrapper');
basis.require('basis.html');
basis.require('basis.ui');

!function(basis){

  'use strict';

 /**
  * @namespace basis.ui.canvas
  */

  var namespace = 'basis.ui.canvas';


  //
  // import names
  //

  var Node = basis.dom.wrapper.Node;
  var UINode = basis.ui.Node;


  //
  // Main part
  //

  var Shape = Node.subclass({
    draw: function(context){
      context.save();
      context.fillStyle = 'red';
      context.fillRect(this.data.value * 10,10,30,30);
      context.restore();
    },
    update: function(){
      var result = Node.prototype.update.apply(this, arguments);

      if (result)
      {
        var parent = this.parentNode;
        while (parent)
        {
          if (parent instanceof Canvas)
          {
            parent.updateCount++;
            break;
          }
          parent = parent.parentNode;
        }
      }

      return result;
    }
  });

 /**
  * @class
  */
  var Canvas = UINode.subclass({
    template:
      '<canvas{canvas}>' +
        '<div>Canvas doesn\'t support.</div>' +
      '</canvas>',

    childFactory: function(config){
      return new this.childClass(config);
    },
    childClass: Shape,

    drawCount: 0,
    lastDrawUpdateCount: -1,

    init: function(config){
      UINode.prototype.init.call(this, config);
     
      this.element.width = this.width;
      this.element.height = this.height;
      this.updateCount = 0;

      var canvasElement = this.tmpl.canvas;
      if (canvasElement && canvasElement.getContext)
        this.context = canvasElement.getContext('2d');

      this.updateTimer_ = setInterval(this.draw.bind(this), 1000/60);
    },
    reset: function(){
      /*var ctx = this.context;
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(0, 0, this.element.clientWidth, this.element.clientHeight);
      ctx.restore();/**/
      this.element.width = this.element.clientWidth;
      this.element.height = this.element.clientHeight;
      /*if (this.context)
      {
        this.context.clearRect(0, 0, this.element.width, this.element.height)
      }*/
    },
    isNeedToDraw: function(){
      return this.context && (
        this.updateCount != this.lastDrawUpdateCount
        ||
        this.element.width != this.lastDrawWidth
        ||
        this.element.height != this.lastDrawHeight
      );
    },
    draw: function(){
      if (!this.isNeedToDraw())
        return false;

      this.lastDrawWidth = this.element.width;
      this.lastDrawHeight = this.element.height;
      this.lastDrawUpdateCount = this.updateCount;
      this.drawCount = this.drawCount + 1;

      this.reset();

      this.drawFrame();

      return true;
    },
    drawFrame: function(){
      for (var node = this.firstChild; node; node = node.nextSibling)
        node.draw(this.context);
    },
    destroy: function(){
      clearInterval(this.updateTimer_);

      UINode.prototype.destroy.call(this);
    }
  });


  //
  // export names
  //

  basis.namespace(namespace).extend({
    Canvas: Canvas,
    Shape: Shape
  });

}(basis);