/*!
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * modified by taikiken
 */
/*!
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 15/07/16 - 16:03
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build 2015-07-17 21:35:17
 * @version 0.1.2
 * @github https://github.com/taikiken/yamori.js
 */
/* jslint -W089 */
/**
 * yamori.js
 * @requires jQuery
 * @module Yamori
 */
//var Yamori = Yamori || {};

( function ( window ) {

  "use strict";

  var
    document = window.document,
    hash = window.location.hash,

    $ = window.jQuery,

    //Yamori = window.Yamori,

    defaults= {
      auto: true,
      easing: "quart",
      duration: 500
    },
    dataset = {},
    results,
    yamori;

  // jQuery が not found だと何もしない
  if ( !$ ) {

   return;

  }

  // ----------------------------------------------------------------------
  // dataset
  var Dataset = ( function () {

    /**
     * data 属性をパースして key: value 形式にします
     * <br><b>*inner class</b>
     * @class Dataset
     * @static
     * @constructor
     */
    function Dataset () {
      throw new Error( "Dataset cannot be instantiated" );
    }

    var p = Dataset.prototype;
    p.constructor = Dataset;

    /**
     * 引数 element(HTMLElement) の data属性を object {key: value} にして返す
     * @method scan
     * @static
     * @param {Element} element
     * @return {{}}
     */
    Dataset.scan = function ( element ) {

      if ( typeof element.dataset !== "undefined" ) {

        return Dataset.modern( element );

      } else {

        return Dataset.legacy( element );

      }

    };

    /**
     * modern Browser の dataset を key: value を調べます
     * @method modern
     * @static
     * @param {Element} element
     * @return {{}}
     */
    Dataset.modern = function ( element ) {

      var
        data = element.dataset,
        results = {},
        key,
        value,
        keyName;

      for( key in data ) {

        keyName = "";
        value = "";
        // Android 2.3 under, dataset object の hasOwnProperty が String型, バカでしょー
        if ( typeof data.hasOwnProperty === "function" ) {

          if ( data.hasOwnProperty( key ) ) {

            value = data[ key ];
            keyName = key;

          }

        } else {

          // for Android 2.3
          value = data[ key ];
          keyName = key;

        }// if

        results[ keyName ] = value;

      }

      return results;

    };
    /**
     * @method legacy
     * @static
     * @param {Element} element
     * @return {{}}
     */
    Dataset.legacy = function ( element ) {

      var
        data = element.attributes,
        results = {},
        i, limit, attribute, nodeName, dataKey;

      for ( i = 0, limit = data.length; i < limit; i = i + 1 ) {

        attribute = data[ i ];
        nodeName = attribute.nodeName.toLowerCase();

        if ( nodeName.indexOf( "data-" ) !== -1 ) {

          // modern browser にあわせ camelcase にします
          dataKey = Dataset.camel( nodeName.replace( "data-", "" ) );
          results[ dataKey ] = attribute.nodeValue.toLowerCase();

        }

      }// for

      return results;

    };

    /**
     *
     * @method camel
     * @static
     * @param {string} str
     * @return {string} camelcase にして返します
     */
    Dataset.camel = function ( str ) {

      // Convert hyphens to camel case (camelCase)
      // http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
      return str.replace( /-([a-z])/gi, function ( $0, $1 ) { return $1.toUpperCase(); } );

    };

    /**
     * camelcase 文字型を -（ハイフン）つなぎにして返します
     * @method hyphen
     * @static
     * @param {string} str
     * @return {string}
     */
    Dataset.hyphen = function ( str ) {

      // Split camelcase string and add hyphen rather than space
      // http://stackoverflow.com/questions/8955533/javascript-jquery-split-camelcase-string-and-add-hyphen-rather-than-space
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    };

    return Dataset;

  }() );


  // ----------------------------------------------------------------------
  // easing
  var Easing = ( function () {

    /**
     *  jQuery easing を拡張します
     *    <p>jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/</P>
     *    <b>inner class</b>
     *    <p>呼び出しはできません、読み込まれると同時に拡張します。</p>
     *    <h2>種類</h2>
     *    <ul>
     *      <li>quart</li>
     *      <li>easeInQuad</li>
     *      <li>easeOutQuad</li>
     *      <li>easeInOutQuad</li>
     *      <li>easeInCubic</li>
     *      <li>easeOutCubic</li>
     *      <li>easeInOutCubic</li>
     *      <li>easeInQuart</li>
     *      <li>easeOutQuart</li>
     *      <li>easeInOutQuart</li>
     *      <li>easeInQuint</li>
     *      <li>easeOutQuint</li>
     *      <li>easeInOutQuint</li>
     *      <li>easeInSine</li>
     *      <li>easeOutSine</li>
     *      <li>easeInOutSine</li>
     *      <li>easeInExpo</li>
     *      <li>easeOutExpo</li>
     *      <li>easeInOutExpo</li>
     *      <li>easeInCirc</li>
     *      <li>easeOutCirc</li>
     *      <li>easeInOutCirc</li>
     *      <li>easeInElastic</li>
     *      <li>easeOutElastic</li>
     *      <li>easeInOutElastic</li>
     *      <li>easeInBack</li>
     *      <li>easeOutBack</li>
     *      <li>easeInOutBack</li>
     *      <li>easeInBounce</li>
     *      <li>easeOutBounce</li>
     *      <li>easeInOutBounce</li>
     *    </ul>
     *
     * @class Easing
     * @static
     * @constructor
     */
    function Easing () {
      throw new Error( "Easing cannot be instantiated" );
    }

    var p = Easing.prototype;
    p.constructor = Easing;

    /**
     * @method activate
     * @static
     * @param {jQuery} je jQuery.easing
     */
    Easing.activate = function ( je ) {

      var
        _PI = Math.PI,
        _PI_W = _PI * 2,
        _PI_HALF = _PI * 0.5,
        _abs = Math.abs,
        _cos = Math.cos,
        _sin = Math.sin,
        _pow = Math.pow,
        _sqrt = Math.sqrt,
        _asin = Math.asin;

      je.quart = function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      };
      je.easeInQuad = function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
      };
      je.easeOutQuad = function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
      };
      je.easeInOutQuad = function (x, t, b, c, d) {
        if ((t /= d/2) < 1) {return c/2*t*t + b;}
        return -c/2 * ((--t)*(t-2) - 1) + b;
      };
      je.easeInCubic = function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
      };
      je.easeOutCubic = function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
      };
      je.easeInOutCubic = function (x, t, b, c, d) {
        if ((t /= d/2) < 1) {return c/2*t*t*t + b;}
        return c/2*((t-=2)*t*t + 2) + b;
      };
      je.easeInQuart = function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
      };
      je.easeOutQuart = function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
      };
      je.easeInOutQuart = function (x, t, b, c, d) {
        if ((t /= d/2) < 1) {return c/2*t*t*t*t + b;}
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
      };
      je.easeInQuint = function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
      };
      je.easeOutQuint = function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
      };
      je.easeInOutQuint = function (x, t, b, c, d) {
        if ((t /= d/2) < 1) {return c/2*t*t*t*t*t + b;}
        return c/2*((t-=2)*t*t*t*t + 2) + b;
      };
      je.easeInSine = function (x, t, b, c, d) {
        return -c * _cos(t/d * _PI_HALF) + c + b;
      };
      je.easeOutSine = function (x, t, b, c, d) {
        return c * _sin(t/d * _PI_HALF) + b;
      };
      je.easeInOutSine = function (x, t, b, c, d) {
        return -c/2 * (_cos(_PI*t/d) - 1) + b;
      };
      je.easeInExpo = function (x, t, b, c, d) {
        return (t===0) ? b : c * _pow(2, 10 * (t/d - 1)) + b;
      };
      je.easeOutExpo = function (x, t, b, c, d) {
        return (t===d) ? b+c : c * (_pow(2, -10 * t/d) + 1) + b;
      };
      je.easeInOutExpo = function (x, t, b, c, d) {
        if (t===0) {return b;}
        if (t===d) {return b+c;}
        if ((t /= d/2) < 1) {return c/2 * _pow(2, 10 * (t - 1)) + b;}
        return c/2 * (-_pow(2, -10 * --t) + 2) + b;
      };
      je.easeInCirc = function (x, t, b, c, d) {
        return -c * (_sqrt(1 - (t/=d)*t) - 1) + b;
      };
      je.easeOutCirc = function (x, t, b, c, d) {
        return c * _sqrt(1 - (t=t/d-1)*t) + b;
      };
      je.easeInOutCirc = function (x, t, b, c, d) {
        if ((t /= d/2) < 1) {return -c/2 * (_sqrt(1 - t*t) - 1) + b;}
        return c/2 * (_sqrt(1 - (t-=2)*t) + 1) + b;
      };
      je.easeInElastic = function (x, t, b, c, d) {
        var s=1.70158,p= 0,a=c;
        if (t===0) {return b;}
        if ((t/=d)===1) {return b+c;}
        if (!p) {p=d*0.3;}
        if (a < _abs(c)) { a=c;s=p/4; }
        else {
          s = p/(_PI_W) * _asin (c/a);
          return -(a*_pow(2,10*(t-=1)) * _sin( (t*d-s)*(_PI_W)/p )) + b;
        }
      };
      je.easeOutElastic = function (x, t, b, c, d) {
        var s=1.70158,p= 0,a=c;
        if (t===0) {return b; }
        if ((t/=d)===1) {return b+c;}
        if (!p) {p=d*0.3;}
        if (a < _abs(c)) { a=c; s=p/4; }
        else { s = p/(_PI_W) * _asin (c/a);
          return a*_pow(2,-10*t) * _sin( (t*d-s)*(_PI_W)/p ) + c + b;}
      };
      je.easeInOutElastic = function (x, t, b, c, d) {
        var s=1.70158,p=0,a=c;
        if (t===0) {return b;}
        if ((t /= d/2)===2) {return b+c;}
        if (!p) {p=d*(0.3*1.5);}
        if (a < _abs(c)) { a=c;s=p/4; }
        else {
          s = p/(_PI_W) * _asin (c/a);
          if (t < 1) {return -0.5*(a*_pow(2,10*(t-=1)) * _sin( (t*d-s)*(_PI_W)/p )) + b;}
          return a*_pow(2,-10*(t-=1)) * _sin( (t*d-s)*(_PI_W)/p )*0.5 + c + b;
        }
      };
      je.easeInBack = function (x, t, b, c, d, s) {
        if (s === undefined) {s = 1.70158;}
        return c*(t/=d)*t*((s+1)*t - s) + b;
      };
      je.easeOutBack = function (x, t, b, c, d, s) {
        if (s === undefined) {s = 1.70158;}
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
      };
      je.easeInOutBack = function (x, t, b, c, d, s) {
        if (s === undefined) {s = 1.70158; }
        if ((t /= d/2) < 1) {return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;}
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
      };
      je.easeInBounce = function (x, t, b, c, d) {
        return c - je.easeOutBounce (x, d-t, 0, c, d) + b;
      };
      je.easeOutBounce = function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
          return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
          return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
          return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        } else {
          return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        }
      };
      je.easeInOutBounce = function (x, t, b, c, d) {
        if (t < d/2) {return je.easeInBounce (x, t*2, 0, c, d) * 0.5 + b;}
        return je.easeOutBounce (x, t*2-d, 0, c, d) * 0.5 + c * 0.5 + b;
      };

    };

    return Easing;

  }() );

  // dataset 取得結果を正規化
  function serialize ( results ) {

    var setting = {};

    if ( !!results ) {

      // auto
      if ( results.hasOwnProperty( "auto" ) ) {

        setting.auto = results.auto === "true";

      } else {

        setting.auto = defaults.auto;

      }// auto

      // easing
      if ( results.hasOwnProperty( "easing" ) ) {

        setting.easing = results.easing;

      } else {

        setting.easing = defaults.easing;

      }// easing

      // duration
      if ( results.hasOwnProperty( "duration" ) ) {

        setting.duration = parseInt( results.duration, 10 );

      } else {

        setting.duration = defaults.duration;

      }// duration

    }

    return setting;

  }

  // dataset
  yamori = document.getElementById( "yamori" );
  if ( !!yamori ) {

    results = Dataset.scan( yamori );
    dataset = serialize( results );

  } else {

    dataset = defaults;
    dataset.auto = false;

  }

  // easing 活性化
  Easing.activate( $.easing );

  // --------------------------------------------------------------------------------
  // stick
  var
    bodyStyle = "";

  //function topZero () {
  //
  //  $( "html, body" ).stop().animate( {
  //    scrollTop: 0
  //  },
  //    0,
  //  function () {
  //    alert( "comp**" );
  //  });
  //
  //}
  //
  //topZero();

  function stickFree () {

    document.body.style.cssText = bodyStyle;

  }
  /**
   * scroll 位置を y:0 にします
   * @for Yamori
   * @static
   * @method stick
   * @param {boolean=false} [style]
   * @private
   */
  function stick ( style ) {

    style = !!style;

    if ( style) {

      bodyStyle = document.body.style.cssText;
      document.body.style.cssText += "position: fixed; left: 0; top: 0; width: 100%;";

    }

    setTimeout( function () {

      if ( !!document.body ) {

        document.body.scrollTop = 0;

      }

      document.documentElement.scrollTop = 0;
      window.scrollTo( 0, 0 );


    }, 0 );

    //topZero();
  }

  // --------------------------------------------------------------------------------
  // hashToStick

  /**
   * hash があるときは scrollTo(0,0) を実行する
   * @for Yamori
   * @method stickWhenFoundHash
   * @param {boolean=false} [style]
   * @static
   * @private
   */
  function stickWhenFoundHash ( style ) {

    if ( !!hash ) {

      stick( style );

    }

  }

  // --------------------------------------------------------------------------------
  // ready
  /**
   * $( document ).ready を実行する
   * @for Yamori
   * @method ready
   * @static
   * @private
   */
  function ready () {

    // bind document ready
    $( document ).ready( function () {

      stickWhenFoundHash( true );

    } );

  }

  // --------------------------------------------------------------------------------
  // load
  /**
   * @for Yamori
   * @method load
   * @static
   * @param {*} params
   */
  function load ( params ) {

    // bind window.onload
    $( window ).on( "load", function () {

      var
        option,
        trans;

      stickWhenFoundHash();

      if ( !!params ) {

        dataset = serialize( params );

      }

      if ( !!hash ) {

        // hash found
        option = {
          target: hash,
          easing: dataset.easing,
          duration: dataset.duration
        };

        trans = new Yamori();

        // 時間をおいて移動する
        setTimeout( function () {

          option.load = true;
          trans.trans( option );

        }, 1000 * 0.5  );

      }// hash found

    } );

  }

  // --------------------------------------------------------------------------------
  // scroll to animation

  var Yamori = ( function () {

    var
      $body;

    /**
     * @class Yamori
     * @constructor
     */
    function Yamori () {
    }

    var p = Yamori.prototype;
    p.constructor = Yamori;

    /**
     * 初期化処理
     * @method init
     * @return {Yamori}
     * @private
     */
    p._init = function () {

      if ( typeof $body === "undefined" ) {
        // $body undefined
        $body = $( "html, body" );

      }

      return this;

    };

    /**
     * @method trans
     * @param option
     * @type {{
     *  target: string,
     *  easing: string,
     *  duration: number,
     *  start: function
     *  complete: function
     * }}
     * @default
     * {
     *  easing: "quart",
     *  duration: 500,
     *  complete: undefined
     * }
     */
    p.trans = function ( option ) {

      var
        target = option.target,
        $target = $( target ),
        y;

      if ( option.load ) {

        stickFree();

      }

      if ( $target.length === 0 ) {

        y = 0;

      } else {

        y = $target.offset().top;

      }

      this._init();

      $body
        .stop()
        .animate(
        {
          scrollTop: y
        },
        {
          duration: option.duration,
          easing: option.easing,
          queue: false,
          start: function () {

            // start method, from jQuery 1.8
            // jQuery 1.8 below, can not call start
            var
              html = this.nodeName.toLowerCase() === "html",
              start;

            //console.log( "** start ** document.documentElement.scrollTop ", document.documentElement.scrollTop );

            if ( html ) {

              start = option.start;

              if ( typeof start === "function" ) {

                start.call( this, target, $target, y );

              }

            }

          },
          complete: function () {

            //if ( option.load ) {
            //
            //  location.hash = target;
            //
            //}

            var
              html = this.nodeName.toLowerCase() === "html",
              complete;

            if ( html ) {

              complete = option.complete;

              if ( typeof complete === "function" ) {

                complete.call( this, target, $target, y );

              }

            }

          }
        }
      );

    };


    Yamori.activate = function ( params ) {

      //initialize();
      ready();
      load( params );

      return Yamori;

    };

    Yamori.stick = function () {

      stick();

      return Yamori;

    };

    return Yamori;

  }() );

  // dataset.auto が true の時に実行する
  if ( dataset.auto ) {

    Yamori.activate();

  }

  window.Yamori = Yamori;

}( window ) );

/*=========================
 jQuery & Zepto Plugins
 ===========================*/
if (window.jQuery || window.Zepto) {
  ( function ( $ ) {

    'use strict';

    var
      Yamori = window.Yamori;

    $.fn.yamori = function ( params ) {

      return this.each( function ( index, element ) {

        var
          $this = $( this ),
          yamori = new Yamori();

        $this.on( "click", function ( event ) {

          event.preventDefault();

          var
            href = element.href,
            hash;

          if ( !!href || href.indexOf( "#") !== -1 ) {

            hash = "#" + href.split( "#" ).pop();
            params.target = hash;
            yamori.trans( params );

          }

        } );

        $( this ).data( 'yamori', yamori );

      } );

    };
    $.yamori = function ( params ) {

      Yamori.stick();
      Yamori.activate( params );

      };
  })( window.jQuery || window.Zepto );
}

// component
if ( typeof( module ) !== 'undefined' ) {

  window.module.exports = window.Yamori;

}

// requirejs support
if ( typeof define === 'function' && window.define.amd ) {

  window.define( [], function () {

    'use strict';
    return window.Yamori;

  } );

}
