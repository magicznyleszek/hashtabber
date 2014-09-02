// --------------------------------------------------
// HashTabber v2.2 by smutnyleszek@gmail.com
// http://hashtabber.smutnyleszek.com
// License CC0 1.0
// --------------------------------------------------


// --------------------------------------------------
// Class managing helper functions
// --------------------------------------------------

function hasClass(el, cl) {
    return el.className && new RegExp('(\\s|^)' + cl + '(\\s|$)').test(el.className);
}
function addClass(el, cl) {
    if (!hasClass(el, cl)) { el.className += ' ' + cl; }
}
function removeClass(el, cl) {
    var reg = new RegExp('(\\s|^)' + cl + '(\\s|$)');
    el.className = el.className.replace(reg, ' ').replace(/(^\s*)|(\s*$)/g, '');
}
function toggleClass(el, cl) {
    if (hasClass(el, cl)) { removeClass(el, cl); } else { addClass(el, cl); }
}


// --------------------------------------------------
// main HashTabber creator function
// --------------------------------------------------

function HashTabber(customOptions) {
    this.options = {
        classActive: 'active',
        classData: 'hashTabber-data',
        classNav: 'hashTabber-nav',
        dataDefault: 'data-hashtabber-default',
        dataId: 'data-hashtabber-id',
        dataPair: 'data-hashtabber-pair'
    };
    // check if there are any custom options
    if (customOptions) {
        // go through all the options and set new values if provided
        if (customOptions.classActive) { this.options.classActive = customOptions.classActive; }
        if (customOptions.classData) { this.options.classData = customOptions.classData; }
        if (customOptions.classNav) { this.options.classNav = customOptions.classNav; }
        if (customOptions.dataDefault) { this.options.dataDefault = customOptions.dataDefault; }
        if (customOptions.dataId) { this.options.dataId = customOptions.dataId; }
        if (customOptions.dataPair) { this.options.dataPair = customOptions.dataPair; }
    }
    this.helpers = {
        hashProber: function () {
            // get hash from window location and remove # character
            var hash = String(window.location.hash.replace('#', ''));
            var outcome = false;
            // if hash not empty
            // split it to array of parameters by "=" and "&"
            if (hash.length !== 0) {
                outcome = hash.split(/\=|&/);
            }
            return outcome;
        },
        idsGiver: function (options) {
            var a, b, c, d;
            var tabberId;
            var tabberDefault;
            var tabName;
            var navList;
            var navLiChildren;
            var dataList;
            var tabbers = document.querySelectorAll('.' + options.classNav);
            // loop through every instance of hashTabber (nav)
            for (a = 0; a < tabbers.length; a += 1) {
                // get current tabber id and default tab
                tabberId = tabbers[a].getAttribute(options.dataId);
                tabberDefault = '0';
                tabName = '';
                // check if -default html data is set
                if (tabbers[a].getAttribute(options.dataDefault)) {
                    tabberDefault = tabbers[a].getAttribute(options.dataDefault);
                }
                // loop through every nav element of current tabber
                navList = tabbers[a].querySelectorAll('.' + options.classNav + '>li');
                for (b = 0; b < navList.length; b += 1) {
                    // set current item name to loop index
                    // or custom -pair name if given
                    tabName = String(b);
                    if (navList[b].getAttribute(options.dataPair)) {
                        tabName = navList[b].getAttribute(options.dataPair);
                    }
                    // loop through all child nodes of li
                    // check for the first a node and add #link to it
                    navLiChildren = navList[b].childNodes;
                    for (c = 0; c < navLiChildren.length; c += 1) {
                        if (navLiChildren[c].nodeName === 'A') {
                            navLiChildren[c].setAttribute('href', '#' + tabberId + '=' + tabName);
                        }
                    }
                    // set default to active
                    if (tabName === tabberDefault) {
                        addClass(navList[b], options.classActive);
                    }
                }
                // find corresponding data element and lopp through its children
                dataList = document.querySelectorAll('.' + options.classData + '[' + options.dataId + '="' + tabberId + '"]' + '>li');
                for (d = 0; d < dataList.length; d += 1) {
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
            var a, b, c;
            var parameter;
            var value;
            var tabName;
            var tabberNavList;
            var tabberDataList;
            // loop through all hash parameters (every second item)
            for (a = 0; a < hashArray.length; a += 2) {
                // set the parameter and value
                parameter = hashArray[a];
                value = hashArray[a + 1];
                tabName = '';
                // check if hashlink exists in nav element
                if (document.querySelectorAll('.' + options.classNav + ' a[href*="#' + parameter + '=' + value + '"]').length > 0) {
                    // get the current tabber nav and data lists
                    tabberNavList = document.querySelectorAll('.' + options.classNav + '[' + options.dataId + '="' + parameter + '"]' + '>li');
                    tabberDataList = document.querySelectorAll('.' + options.classData + '[' + options.dataId + '="' + parameter + '"]' + '>li');
                    // clear active class of all nav elements and give it to the target one
                    for (b = 0; b < tabberNavList.length; b += 1) {
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
                    for (c = 0; c < tabberDataList.length; c += 1) {
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
        }
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
