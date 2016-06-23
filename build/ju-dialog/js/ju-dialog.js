'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var juDialog = function () {
    function juDialog(type) {
        _classCallCheck(this, juDialog);

        this.assign();
        this.type = type;
        this.selector = '.ju-dialog';
        this.hodor = document.createElement('div');

        // 是否在完成callback之后进行destory操作
        this.callbackDestory = true;

        this.config = {
            title: 'Hello',
            content: 'Are you sure to continue?',
            contentLoaded: null,
            icon: '',
            opacity: 0.2,

            confirmButton: 'Okay',
            cancelButton: 'Close',

            confirmButtonClass: 'ju-dialog-default',
            cancelButtonClass: 'ju-dialog-default',

            theme: 'white',
            animation: 'zoom',
            closeAnimation: 'scale',
            animationSpeed: 500,
            animationBounce: 1.2,
            keyboardEnabled: false,
            rtl: false,
            confirmKeys: [13], // ENTER key
            cancelKeys: [27], // ESC key

            container: 'body',
            backgroundClose: false,
            autoClose: false,

            // callback
            onConfirm: null,
            onCancel: null,
            onOpen: null,
            onClose: null,
            onAction: null,

            closeIcon: null,
            closeIconClass: false,
            watchInterval: 100
        };

        this.args = arguments.length <= 1 ? undefined : arguments[1];

        Object.assign(this.config, this.args);

        this.init();
    }

    _createClass(juDialog, [{
        key: 'init',
        value: function init() {
            this.close = '<div class="ju-dialog-close">x</div>';

            this.title = '<div class="ju-dialog-title">' + this.config.title + '</div>';

            this.content = '<div class="ju-dialog-content">' + this.config.content + '</div>';

            this.buttons = '';

            this.confirmButton = '<button type="button" class="ju-dialog-btn ju-dialog-confirm">\n            ' + this.config.confirmButton + '\n        </button>';

            this.cancelButton = '<button type="button" class="ju-dialog-btn ju-dialog-cancel">\n            ' + this.config.cancelButton + '\n        </button>';

            switch (this.type) {
                case 'dialog':
                    this.dialog();
                    break;
                case 'alert':
                    this.alert();
                    break;
                case 'confirm':
                    this.confirm();
                    break;
                default:
                    throw new Error('type must is dialog, alert or confirm');
            }
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var _this = this;

            var $confirm = this.box.querySelector('.ju-dialog-confirm');
            var $cancel = this.box.querySelector('.ju-dialog-cancel');
            var $close = this.box.querySelector('.ju-dialog-close');
            var $bg = this.elemet.querySelector('.ju-dialog-bg');

            if ($confirm) {
                $confirm.addEventListener('click', function () {
                    if (_this.config.onConfirm) {
                        _this.config.onConfirm.call(_this);
                    } else {
                        _this.destory();
                    }
                    return false;
                });
            }

            if ($cancel) {
                $cancel.addEventListener('click', function () {
                    if (_this.config.onCancel) {
                        _this.config.onCancel.call(_this);
                    } else {
                        _this.destory();
                    }
                    return false;
                });
            }

            if ($close) {
                $close.addEventListener('click', function () {
                    if (_this.config.onClose) {
                        _this.config.onClose.call(_this);
                    } else {
                        _this.destory();
                    }
                    return false;
                });
            }

            if (this.config.backgroundClose) {
                if ($bg) {
                    $bg.addEventListener('click', function () {
                        _this.destory();
                        return false;
                    });
                } else {
                    throw new Error('open backgroundClose fail.');
                }
            } else {
                if ($bg) {
                    $bg.addEventListener('click', function () {
                        if (_this.box.className.indexOf('shark') > -1) {
                            return false;
                        }

                        _this.box.className += ' shark';

                        setTimeout(function () {
                            _this.box.className = _this.box.className.replace(' shark', '');
                        }, 800);

                        return false;
                    });
                } else {
                    throw new Error('open backgroundClose fail.');
                }
            }
        }
    }, {
        key: 'renderButtons',
        value: function renderButtons() {
            if (this.config.confirmButton) {
                this.buttons += this.confirmButton;
            }

            if (this.config.cancelButton) {
                this.buttons += this.cancelButton;
            }

            this.buttonsWarp = '<div class="ju-dialog-buttons">' + this.buttons + '</div>';
        }
    }, {
        key: 'renderBox',
        value: function renderBox() {
            this.body = '\n            <div class="ju-dialog-bg" style="opacity: ' + this.config.opacity + '"></div>\n            <div class="ju-dialog-warp">\n                <div class="ju-dialog-container">\n                    <div class="ju-dialog-box">\n                        ' + this.close + '\n                        ' + this.title + '\n                        ' + this.content + '\n                        ' + this.buttonsWarp + '\n                        <div class="ju-dialog-clear"></div>\n                    </div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'renderWarp',
        value: function renderWarp() {
            this.addClass(this.hodor, 'ju-dialog');
            this.addClass(this.hodor, this.config.theme);
            this.hodor.innerHTML = this.body;
        }
    }, {
        key: 'renderElements',
        value: function renderElements() {
            this.renderButtons();
            this.renderBox();
            this.renderWarp();
        }
    }, {
        key: 'render',
        value: function render() {
            if (document.querySelector(this.selector)) {
                this.destory();
            }
            this.renderElements();
            this.append();
            this.setElements();
            this.setAnimation();
            this.setCenter();
            this.bindEvent();
        }
    }, {
        key: 'setElements',
        value: function setElements() {
            this.elemet = document.querySelector(this.selector);
            this.box = this.elemet.querySelector('.ju-dialog-box');
        }
    }, {
        key: 'setCenter',
        value: function setCenter() {
            var dialogHeight = document.querySelector('.ju-dialog-container').offsetHeight;
            var bodyHeight = window.screen.height / 2;
            var height = bodyHeight - dialogHeight;
            this.box.style.marginTop = height + 'px';
        }
    }, {
        key: 'setAnimation',
        value: function setAnimation() {
            var _this2 = this;

            if (this.config.animation) {
                this.addClass(this.box, this.config.animation);
                setTimeout(function () {
                    _this2.removeClass(_this2.box, _this2.config.animation);
                }, 200);
            }
        }
    }, {
        key: 'append',
        value: function append() {
            document.querySelector(this.config.container).appendChild(this.hodor);
        }
    }, {
        key: 'remove',
        value: function remove() {
            document.body.removeChild(document.querySelector(this.selector));
        }
    }, {
        key: 'destory',
        value: function destory() {
            var _this3 = this;

            if (this.callbackDestory) {
                if (this.box) {
                    this.box.className += ' scale';
                    setTimeout(function () {
                        _this3.remove();
                    }, 200);
                } else {
                    this.remove();
                }
            }
        }
    }, {
        key: 'dialog',
        value: function dialog() {
            this.config.confirmButton = false;
            this.config.cancelButton = false;
            this.render();
        }
    }, {
        key: 'alert',
        value: function alert() {
            this.config.cancelButton = false;
            this.render();
        }
    }, {
        key: 'confirm',
        value: function confirm() {
            this.render();
        }
    }, {
        key: 'assign',
        value: function assign() {
            // 兼容处理
            /*eslint-disable */
            if (!Object.assign) {
                Object.defineProperty(Object, "assign", {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: function value(target, firstSource) {
                        "use strict";

                        if (target === undefined || target === null) throw new TypeError("Cannot convert first argument to object");
                        var to = Object(target);
                        for (var i = 1; i < arguments.length; i++) {
                            var nextSource = arguments[i];
                            if (nextSource === undefined || nextSource === null) continue;
                            var keysArray = Object.keys(Object(nextSource));
                            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                                var nextKey = keysArray[nextIndex];
                                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                                if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
                            }
                        }
                        return to;
                    }
                });
            }
            /*eslint-enable */
        }
    }, {
        key: 'hasClass',
        value: function hasClass(elemet, cls) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            if (elemet.className.match(reg)) {
                return true;
            }
            return false;
        }
    }, {
        key: 'addClass',
        value: function addClass(elemet, cls) {
            var el = elemet;

            if (el.className) {
                el.className = el.className + ' ' + cls;
            } else {
                el.className = cls;
            }

            return false;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(elemet, cls) {
            var el = elemet;
            el.className = el.className.replace(' ' + cls, '');
            return false;
        }
    }]);

    return juDialog;
}();
//# sourceMappingURL=ju-dialog.js.map
