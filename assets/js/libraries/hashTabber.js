// --------------------------------------------------
// hashTabber 0.3 by smutnyleszek@gmail.com
// http://hashtabber.smutnyleszek.com
// License CC0 1.0
// --------------------------------------------------

function hashTabber(customOptions) {
    this.options = {
        activeClass: 'active',
        container: '.hashTabber',
        data: '.hashTabber-data',
        nav: '.hashTabber-nav',
        tab: 'data-defaultTab',
    };
    // check if there are any custom options
    if (customOptions) {
        // go through all the options and set new values if provided
        if (customOptions.activeClass) {this.options.activeClass = customOptions.activeClass;}
        if (customOptions.container) {this.options.container = customOptions.container;}
        if (customOptions.data) {this.options.data = customOptions.data;}
        if (customOptions.nav) {this.options.nav = customOptions.nav;}
        if (customOptions.tab) {this.options.tab = customOptions.tab;}
    }
    this.helpers = {
        hashProber: function () {
            // get hash from window location
            var hash = window.location.hash.toString().replace('#', '');
            // check if not null or undefined
            // and return false or hash
            if (hash === "" || hash === undefined) {
                return false;
            } else {
                return hash;
            }
        },
        idsGiver: function (options) {
            // loop through every instance of hashTabber
            var containerList = document.querySelectorAll(options.container);
            for (var a = 0; a < containerList.length; a++) {
                // get the distinct id of current tabber and default tab
                var distinctName = containerList[a].getAttribute('id');
                var defaultTab = 0;
                // check if defaultTab html data is set
                if (containerList[a].getAttribute(options.tab)) {
                    defaultTab = parseInt(containerList[a].getAttribute(options.tab), 10);
                }
                // loop through every nav element of current tabber
                var navList = containerList[a].querySelectorAll(options.nav + '>li');
                for (var b = 0; b < navList.length; b++) {
                    // add #link to first a element in li
                    var navLiChildren = navList[b].childNodes;
                    for(var c = 0; c < navLiChildren.length; c++) {
                        if (navLiChildren[c].localName == 'a') {
                            navLiChildren[c].setAttribute('href', '#' + distinctName + '=' + b);
                        }
                    }
                    // set default to active
                    if (b === defaultTab) {
                        addClass(navList[b], options.activeClass);
                    }
                }
                var dataList = containerList[a].querySelectorAll(options.data + '>li');
                for (var d = 0; d < navList.length; d++) {
                    if (d === defaultTab) {
                        addClass(dataList[d], options.activeClass);
                    }
                }
            }
            return true;
        },
        tabSwiper: function (options, hash) {
            // check if any hash-link exists in container element
            if (document.querySelectorAll(options.container + ' a[href="#' + hash + '"]').length > 0) {
                // find #link grandpa element in container element
                var grandpa = document.querySelector(options.container + ' a[href="#' + hash + '"]').parentNode.parentNode.parentNode;
                // get the index number from hash
                var number;
                if (hash) {
                    number = parseInt(hash.split('=')[1], 10);
                } else {
                    number = 0;
                }
                // get the parent nav and data lists
                var parentNavList = grandpa.querySelectorAll(options.nav + '>li');
                var parentDataList = grandpa.querySelectorAll(options.data + '>li');
                // clear active class of all nav elements and give it to the target one
                for (var e = 0; e < parentNavList.length; e++) {
                    if (e === number) {
                        addClass(parentNavList[e], options.activeClass);
                    } else {
                        removeClass(parentNavList[e], options.activeClass);
                    }
                }
                // clear active class of all data elements and give it to the target one
                for (var f = 0; f < parentDataList.length; f++) {
                    if (f === number) {
                        addClass(parentDataList[f], options.activeClass);
                    } else {
                        removeClass(parentDataList[f], options.activeClass);
                    }
                }
                return true;
            } else {
                return false;
            }
        },
    };
    this.run = function () {
        var that = this;
        // create ids for every link element in hashTabber navigation
        that.helpers.idsGiver(that.options);
        // run for the first time on page load
        that.helpers.tabSwiper(that.options, that.helpers.hashProber());
        // add listener to hash change
        window.onhashchange = function () {
            that.helpers.tabSwiper(that.options, that.helpers.hashProber());
        };
        return true;
    };
    return true;
}

// --------------------------------------------------
// Class managing helper functions
// --------------------------------------------------

function hasClass(el, cl) {
    return el.className && new RegExp("(\\s|^)" + cl + "(\\s|$)").test(el.className);
}
function addClass(el, cl) {
    if (!hasClass(el, cl)) {el.className += ' ' + cl;}
}
function removeClass(el, cl) {
    var reg = new RegExp("(\\s|^)" + cl + "(\\s|$)");
    el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
}
function toggleClass(el, cl) {
    if (hasClass(el, cl)) {removeClass(el, cl);}
    else {addClass(el, cl);}
}