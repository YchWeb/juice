'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name ju-tab
 * @description 标签页组件
 * @author  GBA
 * @date 2016/06/08
 */

var juTab = function () {
    // 构造函数

    function juTab(query, options) {
        _classCallCheck(this, juTab);

        if (!query) {
            try {
                this.mytab = document.querySelector('.ju-tab');
                this.mycontent = document.querySelector('.ju-tab-content');
            } catch (e) {
                console.log(e);
                return false;
            }
        } else {
            try {
                this.mytab = document.querySelector(query);
                this.mycontent = document.querySelector(query + '-content');
            } catch (e) {
                console.log(e);
                return false;
            }
        }

        this.mytabs = this.mytab.querySelectorAll('.ju-tab-li') || this.mytab.querySelectorAll('li');
        this.mycontents = this.mycontent.querySelectorAll('.ju-tab-content-li') || this.mycontent.querySelectorAll('li');

        this.config = {
            'autoLayout': true,
            'materialAnimate': true
        };
        // if (this.isJson(options)) {
        Object.assign(this.config, options);
        // }

        if (this.mytabs && this.mycontents) {
            this.render();
            return true;
        } else {
            console.log('选项卡或选项卡内容为空');
            return false;
        }
    }

    // 为标签添加事件


    _createClass(juTab, [{
        key: 'render',
        value: function render() {
            var _this = this;

            var tabs = this.mytabs;
            var contents = this.mycontents;

            var _loop = function _loop(i) {
                if (_this.config.autoLayout) {
                    tabs[i].style.width = '' + 100 / tabs.length + '%';
                }

                tabs[i].onclick = function () {
                    for (var j = 0; j < contents.length; j++) {
                        if (i === j) {
                            contents[j].style.display = 'block';
                            // tabs[i].addClass('active')
                            tabs[j].classList.add('active');
                        } else {
                            contents[j].style.display = 'none';
                            tabs[j].classList.remove('active');
                        }
                    }
                };
            };

            for (var i = 0; i < tabs.length; i++) {
                _loop(i);
            }
        }

        // 转换convert a string containing JSON notation into a Javascript object.

    }, {
        key: 'isJson',
        value: function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        // end of juTab

    }]);

    return juTab;
}();
//# sourceMappingURL=index.js.map
