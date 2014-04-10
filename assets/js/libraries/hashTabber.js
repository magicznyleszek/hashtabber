// --------------------------------------------------
// hashTabber v2.0 by smutnyleszek@gmail.com
// http://hashtabber.smutnyleszek.com
// License CC0 1.0
// --------------------------------------------------

function HashTabber(customOptions) {
    this.options = {
        classActive: 'active',
        classData: 'hashTabber-data',
        classNav: 'hashTabber-nav',
        dataDefault: 'data-hashtabber-default',
        dataId: 'data-hashtabber-id',
        dataPair: 'data-hashtabber-pair',
    };
    // check if there are any custom options
    if (customOptions) {
        // go through all the options and set new values if provided
        if (customOptions.classActive) {this.options.classActive = customOptions.classActive;}
        if (customOptions.classActive) {this.options.classActive = customOptions.classActive;}
        if (customOptions.classData) {this.options.classData = customOptions.classData;}
        if (customOptions.classNav) {this.options.classNav = customOptions.classNav;}
        if (customOptions.dataDefault) {this.options.dataDefault = customOptions.dataDefault;}
        if (customOptions.dataId) {this.options.dataId = customOptions.dataId;}
        if (customOptions.dataPair) {this.options.dataPair = customOptions.dataPair;}
    }
    this.helpers = {
        hashProber: function () {
            // get hash from window location and remove # character
            var hash = String(window.location.hash.replace('#', ''));
            // check if empty and return false or hash array
            if (hash.length === 0) {
                return false;
            } else {
                // split hash to array of parameters by "=" and "&"
                hash = hash.split(/=|&/);
                return hash;
            }
        },
        idsGiver: function (options) {
            // loop through every instance of hashTabber (nav)
            var tabbers = document.querySelectorAll('.' + options.classNav);
            for (var a = 0; a < tabbers.length; a++) {
                // get current tabber id and default tab
                var tabberId = tabbers[a].getAttribute(options.dataId);
                var tabberDefault = '0';
                var tabName = '';
                // check if -default html data is set
                if (tabbers[a].getAttribute(options.dataDefault)) {
                    tabberDefault = tabbers[a].getAttribute(options.dataDefault);
                }
                // loop through every nav element of current tabber
                var navList = tabbers[a].querySelectorAll('.' + options.classNav + '>li');
                for (var b = 0; b < navList.length; b++) {
                    // set current item name to loop index
                    // or custom -pair name if given
                    tabName = String(b);
                    if (navList[b].getAttribute(options.dataPair)) {
                        tabName = navList[b].getAttribute(options.dataPair);
                    }
                    // add #link to first a element in tab
                    var navLiChildren = navList[b].childNodes;
                    for(var c = 0; c < navLiChildren.length; c++) {
                        if (navLiChildren[c].localName == 'a') {
                            navLiChildren[c].setAttribute('href', '#' + tabberId + '=' + tabName);
                        }
                    }
                    // set default to active
                    if (tabName === tabberDefault) {
                        addClass(navList[b], options.classActive);
                    }
                }
                // find corresponding data element and lopp through its children
                var dataList = document.querySelectorAll('.' + options.classData + '[' + options.dataId + '="' + tabberId + '"]' + '>li');
                for (var d = 0; d < dataList.length; d++) {
                    // set current item name to loop index
                    // or custom -pair name if given
                    tabName = String(d);
                    if (dataList[d].getAttribute(options.dataPair)) {
                        tabName = dataList[d].getAttribute(options.dataPair);
                    }
                    // set default to active
                    if (tabName === tabberDefault) {
                        addClass(dataList[d], options.classActive);
                    }
                }
            }
            return true;
        },
        tabSwiper: function (options, hashArray) {
            // loop through all hash parameters (every second item)
            for (a = 0; a < hashArray.length; a += 2) {
                // set the parameter and value
                var parameter = hashArray[a];
                var value = hashArray[a + 1];
                var tabName = '';
                // check if hashlink exists in nav element                
                if (document.querySelectorAll('.' + options.classNav + ' a[href="#' + parameter + '=' + value + '"]').length > 0) {
                    // get the current tabber nav and data lists
                    var tabberNavList = document.querySelectorAll('.' + options.classNav + '[' + options.dataId + '="' + parameter + '"]' + '>li');
                    var tabberDataList = document.querySelectorAll('.' + options.classData + '[' + options.dataId + '="' + parameter + '"]' + '>li');
                    // clear active class of all nav elements and give it to the target one
                    for (var b = 0; b < tabberNavList.length; b++) {
                        // set current item name to loop index
                        // or custom -pair name if given
                        tabName = String(b);
                        if (tabberNavList[b].getAttribute(options.dataPair)) {
                            tabName = tabberNavList[b].getAttribute(options.dataPair);
                        }
                        // change classes
                        if (tabName === value) {
                            addClass(tabberNavList[b], options.classActive);
                        } else {
                            removeClass(tabberNavList[b], options.classActive);
                        }
                    }
                    // clear active class of all data elements and give it to the target one
                    for (var c = 0; c < tabberDataList.length; c++) {
                        // set current item name to loop index
                        // or custom -pair name if given
                        tabName = String(c);
                        if (tabberDataList[c].getAttribute(options.dataPair)) {
                            tabName = tabberDataList[c].getAttribute(options.dataPair);
                        }
                        // change classes
                        if (tabName === value) {
                            addClass(tabberDataList[c], options.classActive);
                        } else {
                            removeClass(tabberDataList[c], options.classActive);
                        }
                    }
                }
            }
            return true;
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