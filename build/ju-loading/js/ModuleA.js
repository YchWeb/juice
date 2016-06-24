'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name ModuleA
 * @description test Module
 * @author  Ziv
 * @date 2016/06/08
 */

var ModuleA = function () {
    function ModuleA() {
        _classCallCheck(this, ModuleA);
    }

    _createClass(ModuleA, [{
        key: 'init',

        // 模块初始化
        value: function init() {
            console.log('test module.');
        }
    }]);

    return ModuleA;
}();
//# sourceMappingURL=ModuleA.js.map
