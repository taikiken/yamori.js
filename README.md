# yamori.js
JavaScript, window.scrollTo by location.hash

version: 0.1.1  
build: 2015-07-17 18:04:42

## hash付遷移時に window.onload 後にスムーズスクロール

### 依存
jQuery 1.7 以上  

<b>推奨</b>  
jQuery 1.8 以上

jQuery Easing Plugin を使用しています。

## API
[API](http://taikiken.github.io/yamori.js/)

## 使用方法
1.
読み込むだけで機能させる。

    <script id="yamori" src="yamori.min.js"></script>

2.
読み込だけさせて手動で機能させる。

    <script src="yamori.min.js"></script>
    <script>
        // * DOMReady 前に実行
        $.yamori();
        // or
        window.Yamori.activate();
    </script>
    
## オプション

### easing

type {String}

default: "quart"

easing 関数一覧  
[jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/)

<ul>
<li>quart</li>
<li>easeInQuad</li>
<li>easeOutQuad</li>
<li>easeInOutQuad</li>
<li>easeInCubic</li>
<li>easeOutCubic</li>
<li>easeInOutCubic</li>
<li>easeInQuart</li>
<li>easeOutQuart</li>
<li>easeInOutQuart</li>
<li>easeInQuint</li>
<li>easeOutQuint</li>
<li>easeInOutQuint</li>
<li>easeInSine</li>
<li>easeOutSine</li>
<li>easeInOutSine</li>
<li>easeInExpo</li>
<li>easeOutExpo</li>
<li>easeInOutExpo</li>
<li>easeInCirc</li>
<li>easeOutCirc</li>
<li>easeInOutCirc</li>
<li>easeInElastic</li>
<li>easeOutElastic</li>
<li>easeInOutElastic</li>
<li>easeInBack</li>
<li>easeOutBack</li>
<li>easeInOutBack</li>
<li>easeInBounce</li>
<li>easeOutBounce</li>
<li>easeInOutBounce</li>
</ul>

### duration

type {Number}

default: 500

### start

type {Function}

default: null

    // callback
    hash {string} 移動先 id
    target {Element} 移動先 HTMLElement
    $target {jQuery} 移動先 jQuery object
    y {number} 移動先 offset top
    
    start( hash, target, $target, y );

* jQuery 1.7 では動作しません、1.8以上で機能します。

### complete

type {Function}

default: null

    // callback
    hash {string} 移動先 id
    target {Element} 移動先 HTMLElement
    $target {jQuery} 移動先 jQuery object
    y {number} 移動先 offset top
    
    complete( hash, target, $target, y );

## click で リンクのハッシュコンテナへ移動

    <a href="#example" class="yamori">Example</a>
    
    <div id="example"></div>
    
【Script】

    <script>
        $( ".yamori" ).yamori();
    </script>