"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name JuLazyLoad
 * @description img lazy load component
 * @author  Ziv
 * @date 2016/06/08
 */

var JuLazyLoad = function () {

    // constructor

    function JuLazyLoad(element) {
        _classCallCheck(this, JuLazyLoad);

        this._preload = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggb3BhY2l0eT0iLjI1IiBkPSJNMTYgMCBBMTYgMTYgMCAwIDAgMTYgMzIgQTE2IDE2IDAgMCAwIDE2IDAgTTE2IDQgQTEyIDEyIDAgMCAxIDE2IDI4IEExMiAxMiAwIDAgMSAxNiA0Ii8+CiAgPHBhdGggZD0iTTE2IDAgQTE2IDE2IDAgMCAxIDMyIDE2IEwyOCAxNiBBMTIgMTIgMCAwIDAgMTYgNHoiPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgMTYgMTYiIHRvPSIzNjAgMTYgMTYiIGR1cj0iMC44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgPC9wYXRoPgo8L3N2Zz4K";

        this._lazyMark = "ju-img-src";
        this._images = (element ? document.querySelector(element).querySelectorAll('img[' + this._lazyMark + ']') : document.querySelectorAll('img[' + this._lazyMark + ']')) || [];

        this._viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this._viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        this._initOnload();
        this._listenScroll();
        this.load();
    }

    _createClass(JuLazyLoad, [{
        key: "_isOnViewPort",
        value: function _isOnViewPort(ele) {
            return this._isOnVerticalViewPort(ele) && this._isOnHorizontalViewPort(ele);
        }
    }, {
        key: "_isOnVerticalViewPort",
        value: function _isOnVerticalViewPort(ele) {
            var rect = ele.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= this._viewPortHeight;
        }
    }, {
        key: "_isOnHorizontalViewPort",
        value: function _isOnHorizontalViewPort(ele) {
            var rect = ele.getBoundingClientRect();
            return rect.left >= 0 && rect.left <= this._viewPortWidth;
        }
    }, {
        key: "_initOnload",
        value: function _initOnload() {
            var imgs = this._images;
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].style.background = "#eee";
                imgs[i].src = this._preload;
            }
        }
    }, {
        key: "_listenScroll",
        value: function _listenScroll() {
            var self = this;
            window.addEventListener('scroll', function () {
                self.load();
            }, false);
        }
    }, {
        key: "load",
        value: function load() {
            var imgs = this._images;
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                if (!img.loaded && this._isOnViewPort(img)) {
                    var url = img.getAttribute(this._lazyMark);
                    img.src = url;
                    img.loaded = true;
                }
            }
        }
    }]);

    return JuLazyLoad;
}();
//# sourceMappingURL=ju-lazy-load.js.map
