'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name Component
 * @description main module
 * @author  Ziv
 * @date 2016/06/08
 */

var JuPicker = function () {
    function JuPicker(element, options) {
        _classCallCheck(this, JuPicker);

        this._initElement(element);
        this._initOptions(options);
        this._renderHTML();
    }

    _createClass(JuPicker, [{
        key: '_initElement',
        value: function _initElement(ele) {
            var _this = this;

            if (ele) {
                this.warpper = document.querySelector(ele);
                this.warpper.addEventListener('click', function () {
                    _this._showPicker();
                });
                this.warpper.addEventListener('touch', function () {
                    _this._showPicker();
                });
            } else {
                throw new Error("The picker's selector is null.");
            }
        }
    }, {
        key: '_initInnerElement',
        value: function _initInnerElement() {
            var _this2 = this;

            this.overlay = this.warpper.querySelector('.ju-picker-overlay');
            this.content = this.warpper.querySelector('.ju-picker-content');
            this.items = this.content.querySelector(".ju-picker-items");

            this.overlay.addEventListener("click", function (evt) {
                _this2._listenEvtOverlay(evt);
            });
            this.overlay.addEventListener("touch", function (evt) {
                _this2._listenEvtOverlay(evt);
            });

            // Listener for the button of done
            var btnDone = this.content.querySelector('.ju-picker-done');
            btnDone.addEventListener("click", function (evt) {
                _this2._listenEvtOverlay(evt);
            });
            btnDone.addEventListener("touch", function (evt) {
                _this2._listenEvtOverlay(evt);
            });
        }
    }, {
        key: '_initOptions',
        value: function _initOptions(options) {
            this.options = {
                "title": options.title || "请选择",
                "done": options.done || "完成"
            };
        }
    }, {
        key: '_showPicker',
        value: function _showPicker() {
            if (!this.display) {
                this.display = true;
                this.overlay.style.display = "block";
                this.content.style.display = "block";
                this.content.className = "ju-picker-content ju-picker-show";
                this._initScroll(); // Init scroll After rendered HTML
            }
        }
    }, {
        key: '_hidePicker',
        value: function _hidePicker() {
            var _this3 = this;

            if (this.display) {
                (function () {
                    _this3.display = false;
                    _this3.content.className = "ju-picker-content ju-picker-hide";
                    _this3.overlay.style.display = "none";
                    var self = _this3;
                    setTimeout(function () {
                        self.content.style.display = "none";
                    }, 300);
                })();
            }
        }
    }, {
        key: '_listenEvtOverlay',
        value: function _listenEvtOverlay(evt) {
            this._hidePicker();
            evt.preventDefault();
            evt.stopPropagation();
        }
    }, {
        key: '_createPickerDom',
        value: function _createPickerDom(items) {
            return '\n              <div class="ju-picker-overlay"></div>\n            <div class="ju-picker-content">\n                <header>\n                    <span class="ju-picker-choose">{{TITLE}}:</span>\n                    <span class="ju-picker-done">{{DONE}}</span>\n                </header>\n                <main class="ju-picker-main">\n                    <ul class="ju-picker-items">\n                       \n                    </ul>\n                    <div class="ju-picker-indicator"></div>\n                    <div class="ju-picker-mask"></div>\n                </main>\n            </div>\n          ';
        }
    }, {
        key: '_renderHTML',
        value: function _renderHTML(data) {

            var html = this._createPickerDom();
            if (this.options.title) {
                html = html.replace("{{TITLE}}", this.options.title);
            }

            if (this.options.done) {
                html = html.replace("{{DONE}}", this.options.done);
            }

            this.warpper.innerHTML = this.warpper.innerHTML + html;
            this._initInnerElement();
        }
    }, {
        key: '_renderData',
        value: function _renderData(data) {
            var items = "";
            for (var i = 0; i < data.length; i++) {
                var li = '<li class="ps' + 35 * (i + 1) + '" data-value="' + data[i] + '"><span>' + data[i] + '</span></li>';
                items += li;
            }
            this.setCurrent(data[0]);
            this.items.innerHTML = items;
        }
    }, {
        key: '_initScroll',
        value: function _initScroll() {

            var self = this;
            var scroller = self.warpper.querySelector('.ju-picker-main');
            var pickerScroll = new IScroll(scroller, {
                probeType: 3
            });

            pickerScroll.on("scrollEnd", function () {
                var y = this.y;
                var count = Math.round(Math.abs(y) / 35);
                var distance = -(count * 35);

                if (y !== distance && y !== 0) {
                    pickerScroll.scrollTo(0, distance, pickerScroll.options.bounceTime, pickerScroll.options.bounceEasing);
                }

                var po = parseInt(Math.abs(distance)) + 35;
                var selected = scroller.querySelector('.ps' + po);
                if (selected) {
                    self.setCurrent(selected.getAttribute("data-value"));
                }
            });
        }
    }, {
        key: 'setCurrent',
        value: function setCurrent(value) {
            if (!this.selected) {
                this.selected = this.warpper.querySelector(".ju-picker-selected");
            }
            this.selected.innerHTML = value;
        }
    }, {
        key: 'getVal',
        value: function getVal() {
            return this.selected.innerHTML;
        }
    }, {
        key: 'render',
        value: function render(data) {
            this._renderData(data);
        }
    }]);

    return JuPicker;
}();
//# sourceMappingURL=JuPicker.js.map
