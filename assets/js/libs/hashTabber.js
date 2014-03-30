// --------------------------------------------------
// hashTabber 0.2 by smutnyleszek@gmail.com
// http://hashtabber.smutnyleszek.com
// License CC0 1.0
// --------------------------------------------------

function hashTabber() {
    this.options = {
        container: '.hashTabber',
        nav: '.hashTabber-nav',
        data: '.hashTabber-data',
        activeClass: 'active',
        tab: 'data-defaultTab',
    };
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
                        navList[b].classList.add(options.activeClass);
                    }
                }
                var dataList = containerList[a].querySelectorAll(options.data + '>li');
                for (var d = 0; d < navList.length; d++) {
                    if (d === defaultTab) {
                        dataList[d].classList.add(options.activeClass);
                    }
                }
            }
            return true;
        },
        tabSwiper: function (options, hash) {
            // check if link exists
            if (document.querySelector('a[href="#' + hash + '"]') != null) {
                // find #link grandpa element
                var grandpa = document.querySelector('a[href="#' + hash + '"]').parentNode.parentNode.parentNode;
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
                        parentNavList[e].classList.add(options.activeClass);
                    } else {
                        parentNavList[e].classList.remove(options.activeClass);
                    }
                }
                // clear active class of all data elements and give it to the target one
                for (var f = 0; f < parentDataList.length; f++) {
                    if (f === number) {
                        parentDataList[f].classList.add(options.activeClass);
                    } else {
                        parentDataList[f].classList.remove(options.activeClass);
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
    }
}