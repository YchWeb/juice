'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name Component
 * @description main module
 * @author  Ziv
 * @date 2016/06/08
 */

var JuLoading = function () {
    function JuLoading() {
        _classCallCheck(this, JuLoading);
    }

    _createClass(JuLoading, [{
        key: 'hide',

        // 构造函数
        value: function hide() {
            document.getElementById('Loading').style.display = 'none';
        }
    }, {
        key: 'show',
        value: function show() {
            document.getElementById('Loading').style.display = 'block';
            // // 3秒后隐藏
            // setTimeout('hide()', 3000);
        }
        // setTimeout(function(){
        //     document.getElementById('Loading').style.display = 'none';
        // },2000)

    }]);

    return JuLoading;
}();
//# sourceMappingURL=index.js.map
