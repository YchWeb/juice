'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JuProcessBar = function () {
    function JuProcessBar() {
        _classCallCheck(this, JuProcessBar);

        this.className = 'ju-process-bar';

        this.hodor = document.createElement('div');
        this.hodor.className = this.className;
    }

    _createClass(JuProcessBar, [{
        key: 'show',
        value: function show() {
            document.body.appendChild(this.hodor);
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.hasAdded()) {
                document.body.removeChild(this.hodor);
            }
        }
    }, {
        key: 'hasAdded',
        value: function hasAdded() {
            if (document.getElementsByClassName(this.className).length > 0) {
                return true;
            }
            return false;
        }
    }]);

    return JuProcessBar;
}();
//# sourceMappingURL=ju-process-bar.js.map
