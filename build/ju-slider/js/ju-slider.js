'use strict';

/* slider AMD Export */
/*eslint-disable */
if (typeof module !== 'undefined') {
    module.exports = window.slider;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        return window.slider;
    });
}
/*eslint-enable */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var slider = function () {
    function slider(selector) {
        _classCallCheck(this, slider);

        this.config = {
            autoPlayTime: 3, // 单位秒
            speed: 600,
            zIndex: 2,
            onPrevtStart: null,
            onPrevtEnd: null,
            onNextStart: null,
            onNextEnd: null
        };

        this.extraConfig = arguments.length <= 1 ? undefined : arguments[1];
        Object.assign(this.config, this.extraConfig);

        // 触摸
        this.x = 0;
        this.xCurrent = 0;

        this.y = 0;
        this.yCurrent = 0;

        // 方向
        this.direction = 'stay';

        // 定时器
        this.timer = null;
        this.isPaused = false;

        // 选择器
        this.selector = document.querySelector(selector);
        this.length = this.selector.querySelectorAll('li').length;
        this.clientWidth = this.selector.clientWidth;
        this.isRunning = false;

        // 位置
        this.minMove = 20;
        this.calPosition = 0;
        this.prevCalPosition = -this.clientWidth;
        this.nextCalPosition = this.clientWidth;

        // 状态
        this.selector.style.zIndex = this.config.zIndex;
        this.index = 0;
        this.indexPrev = this.length - 1;
        this.indexNext = 1;

        // 是否是第一张
        this.indexFlag = true;
        this.canMoveX = true;
        this.canMoveY = true;

        // 初始化元素
        this.ul = this.selector.querySelector('ul');
        this.li = this.selector.querySelectorAll('li');
        this.setElements();
        // 初始化程序
        this.init(this.config);
    }

    _createClass(slider, [{
        key: 'setElements',
        value: function setElements() {
            this.elmentLi = this.li[this.index];
            this.elmentLiPrev = this.li[this.indexPrev];
            this.elmentLiNext = this.li[this.indexNext];

            this.elment = this.elmentLi.children[0];
            this.elmentPrev = this.elmentLiPrev.children[0];
            this.elmentNext = this.elmentLiNext.children[0];
        }
    }, {
        key: 'init',
        value: function init(config) {
            var _this = this;

            this.addFocus();
            this.setActiveFocus();
            this.requestAnimationFrame();

            // 启动自动播放
            this.autoPlay();
            this.autoPause();

            this.ul.addEventListener('touchstart', function (event) {
                // 禁止自动播放
                _this.cancelAutoPlay();

                if (_this.isRunning) {
                    return true;
                }

                _this.x = event.changedTouches[0].pageX;
                _this.y = event.changedTouches[0].pageY;

                return false;
            });

            this.ul.addEventListener('touchmove', function (event) {
                event.preventDefault();
                if (_this.isRunning) {
                    return true;
                }

                _this.xCurrent = event.changedTouches[0].pageX;
                _this.yCurrent = event.changedTouches[0].pageY;

                // 上下滑动
                if (_this.canMoveY) {
                    window.scrollBy(0, _this.y - _this.yCurrent);
                    if (Math.abs(_this.y - _this.yCurrent) > 12) {
                        _this.canMoveX = false;
                    }
                }

                // 左右滑动
                if (_this.canMoveX) {
                    _this.calPosition = _this.xCurrent - _this.x;
                    // 防止超出
                    if (_this.length > 1) {
                        if (_this.calPosition >= _this.clientWidth) {
                            _this.calPosition = _this.clientWidth;
                        }

                        if (_this.calPosition <= -_this.clientWidth) {
                            _this.calPosition = -_this.clientWidth;
                        }
                    } else {
                        return false;
                    }

                    _this.elmentLi.style.visibility = 'visible';

                    _this.prevCalPosition = _this.calPosition - _this.clientWidth;
                    _this.nextCalPosition = _this.clientWidth + _this.calPosition;

                    if (_this.calPosition >= 0) {
                        // 向右滑动,上一张
                        _this.elmentLiPrev.style.visibility = 'visible';
                        _this.elmentPrev.style.transform = 'translate3d(' + _this.prevCalPosition + 'px,0,0)';
                    } else {
                        // 向左滑动,下一张
                        _this.elmentLiNext.style.visibility = 'visible';
                        _this.elmentNext.style.transform = 'translate3d(' + _this.nextCalPosition + 'px,0,0)';
                    }

                    if (Math.abs(_this.calPosition) > _this.minMove) {
                        _this.canMoveY = false;
                        _this.elment.style.transform = 'translate3d(' + _this.calPosition + 'px,0,0)';

                        // 向左滑动
                        if (_this.calPosition > 0) {
                            _this.direction = 'left';
                            if (_this.length > 2) {
                                _this.elmentLiNext.style.visibility = 'hidden';
                            }
                        } else if (_this.calPosition < 0) {
                            _this.direction = 'right';
                            if (_this.length > 2) {
                                _this.elmentLiPrev.style.visibility = 'hidden';
                            }
                        } else {
                            _this.direction = 'stay';
                        }
                    }
                }

                return false;
            });

            this.ul.addEventListener('touchend', function (event) {
                _this.canMoveX = true;
                _this.canMoveY = true;

                if (_this.isRunning) {
                    return true;
                }

                switch (_this.direction) {
                    case 'left':
                        _this.prev(false);
                        _this.direction = 'stay';
                        break;
                    case 'right':
                        _this.next(false);
                        _this.direction = 'stay';
                        break;
                    case 'stay':
                        _this.stay();
                        break;
                    default:
                        _this.stay();
                        break;
                }

                // 启动自动播放
                _this.autoPlay();
                return false;
            });
        }
    }, {
        key: 'setIndex',
        value: function setIndex() {
            if (this.index === 0) {
                this.indexPrev = this.length - 1;
            } else {
                this.indexPrev = this.index - 1;
            }

            if (this.index >= this.length - 1) {
                this.indexNext = 0;
            } else {
                this.indexNext = this.index + 1;
            }
        }
    }, {
        key: 'setIndexFlag',
        value: function setIndexFlag() {
            if (this.index === 0) {
                this.indexFlag = true;
            } else {
                this.indexFlag = false;
            }
        }
    }, {
        key: 'autoPlay',
        value: function autoPlay() {
            var _this2 = this;

            this.timer = null;
            this.timer = setInterval(function () {
                if (!_this2.isPaused) {
                    _this2.next();
                }
            }, this.config.autoPlayTime * 1000);
        }
    }, {
        key: 'cancelAutoPlay',
        value: function cancelAutoPlay() {
            clearInterval(this.timer);
            this.timer = null;
        }
    }, {
        key: 'autoPause',
        value: function autoPause() {
            var _this3 = this;

            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState === 'hidden') {
                    _this3.isPaused = true;
                } else {
                    _this3.isPaused = false;
                }
            });
        }
    }, {
        key: 'prev',
        value: function prev() {
            var _this4 = this;

            var isMaual = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            // 回调
            if (this.isFunction(this.config.onPrevtStart)) {
                this.config.onPrevtStart.call(this);
            }

            if (isMaual) {
                this.cancelAutoPlay();
            }

            if (this.index === 0) {
                this.indexFlag = true;
            } else {
                this.indexFlag = false;
            }

            var elment = this.li[this.index].children[0];
            var elmentPrev = this.li[this.indexPrev].children[0];

            var elmentLi = this.li[this.index];
            var elmentLiPrev = this.li[this.indexPrev];

            elmentLi.style.visibility = 'visible';
            elmentLiPrev.style.visibility = 'visible';

            var start = 0;
            var run = function run() {
                _this4.isRunning = true;

                start++;
                _this4.prevCalPosition = _this4.easeOutCubic(start, _this4.prevCalPosition, _this4.clientWidth, _this4.config.speed);
                _this4.calPosition = _this4.easeOutCubic(start, _this4.calPosition, _this4.clientWidth, _this4.config.speed);

                elmentPrev.style.transform = 'translate3d(' + _this4.prevCalPosition + 'px,0,0)';
                elment.style.transform = 'translate3d(' + _this4.calPosition + 'px,0,0)';

                if (_this4.calPosition < _this4.clientWidth) {
                    requestAnimationFrame(run);
                } else {
                    _this4.prevCalPosition = -_this4.clientWidth;
                    _this4.calPosition = 0;

                    elmentPrev.style.transform = 'translate3d(0,0,0)';
                    elment.style.transform = 'translate3d(0,0,0)';
                    elmentLi.style.visibility = 'hidden';

                    _this4.isRunning = false;

                    if (_this4.indexFlag) {
                        _this4.index = _this4.length - 1;
                    } else {
                        if (_this4.index > 0) {
                            _this4.index--;
                        }
                    }
                    _this4.setActiveFocus();
                    _this4.setIndex();
                    _this4.setElements();

                    // 回调
                    if (_this4.isFunction(_this4.config.onPrevEnd)) {
                        _this4.config.onPrevEnd.call(_this4);
                    }

                    if (isMaual) {
                        _this4.autoPlay();
                    }
                }
            };

            if (this.isRunning) {
                window.cancelAnimationFrame(run);
            } else {
                run();
            }

            return false;
        }
    }, {
        key: 'next',
        value: function next() {
            var _this5 = this;

            var isMaual = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            // 回调
            if (this.isFunction(this.config.onNextStart)) {
                this.config.onNextStart.call(this);
            }

            if (isMaual) {
                this.cancelAutoPlay();
            }

            if (this.index >= this.length - 1) {
                this.indexNext = 0;
                this.indexFlag = false;
            } else {
                this.indexFlag = true;
            }

            this.elmentLi.style.visibility = 'visible';
            this.elmentLiNext.style.visibility = 'visible';

            // 初始化prev
            this.x = this.calPosition + this.clientWidth;

            var start = 0;
            var run = function run() {
                _this5.isRunning = true;

                start++;
                _this5.x = _this5.easeOutCubic(start, _this5.x, -_this5.clientWidth, _this5.config.speed);
                _this5.calPosition = _this5.easeOutCubic(start, _this5.calPosition, -_this5.clientWidth, _this5.config.speed);

                _this5.elmentNext.style.transform = 'translate3d(' + _this5.x + 'px,0,0)';
                _this5.elment.style.transform = 'translate3d(' + _this5.calPosition + 'px,0,0)';

                if (_this5.calPosition > -_this5.clientWidth) {
                    requestAnimationFrame(run);
                } else {
                    _this5.x = 0;
                    _this5.calPosition = 0;

                    _this5.elmentNext.style.transform = 'translate3d(' + _this5.x + 'px,0,0)';
                    _this5.elment.style.transform = 'translate3d(' + _this5.calPosition + 'px,0,0)';

                    _this5.elmentLi.style.visibility = 'hidden';

                    _this5.isRunning = false;

                    if (_this5.indexFlag) {
                        if (_this5.index < _this5.length - 1) {
                            _this5.index++;
                        }
                    } else {
                        _this5.index = 0;
                    }
                    _this5.setActiveFocus();
                    _this5.setIndex();
                    _this5.setElements();

                    // 回调
                    if (_this5.isFunction(_this5.config.onNextEnd)) {
                        _this5.config.onNextEnd.call(_this5);
                    }

                    if (isMaual) {
                        _this5.autoPlay();
                    }
                }
            };

            if (this.isRunning) {
                window.cancelAnimationFrame(run);
            } else {
                run();
            }

            return false;
        }
    }, {
        key: 'stay',
        value: function stay() {
            this.isRunning = false;
        }

        // 添加指示器

    }, {
        key: 'addFocus',
        value: function addFocus() {
            var innerHtml = '';
            var baseHtml = '<span class="focus-horizontal-bullet"></span>';
            var $focus = this.selector.querySelector('.focus-horizontal');

            for (var i = 0; i < this.length; ++i) {
                innerHtml += baseHtml;
            }

            $focus.innerHTML = innerHtml;
        }

        // 激活指示器

    }, {
        key: 'setActiveFocus',
        value: function setActiveFocus() {
            var $bullets = this.selector.querySelectorAll('.focus-horizontal-bullet');

            for (var i = 0, l = $bullets.length; i < l; ++i) {
                var className = $bullets[i].className.replace(' active', '');
                if (i !== this.index) {
                    $bullets[i].className = className;
                } else {
                    $bullets[i].className = className + ' active';
                }
            }
        }

        /*
         * t: current time（当前时间）；
         * b: beginning value（初始值）；
         * c: change in value（变化量）；
         * d: duration（持续时间）。
         * you can visit 'http://easings.net/zh-cn' to get effect
        */

    }, {
        key: 'easeOutCubic',
        value: function easeOutCubic(currentTime, beginValue, changeInValue, duration) {
            var t = currentTime;
            var b = beginValue;
            var c = changeInValue;
            var d = duration;

            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    }, {
        key: 'requestAnimationFrame',
        value: function requestAnimationFrame() {
            var lastTime = 0;
            var vendors = ['webkit', 'moz'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = 'window[' + vendors[x] + 'RequestAnimationFrame]';
                window.cancelAnimationFrame = 'window[' + vendors[x] + 'CancelAnimationFrame]' || 'window[' + vendors[x] + 'CancelRequestAnimationFrame]';
            }

            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
            }
        }
    }, {
        key: 'isFunction',
        value: function isFunction(fn) {
            return Object.prototype.toString.call(fn) === '[object Function]';
        }
    }]);

    return slider;
}();

window.slider = slider;
//# sourceMappingURL=ju-slider.js.map
