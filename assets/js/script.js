function projectInterface() {
    // --------------------------------------------------
    // declare a public run function
    // with all private stuff initialized inside of it
    // --------------------------------------------------

    this.run = run;
    function run() {
        hashTabber();
    }


    // --------------------------------------------------
    // hashTabber
    // --------------------------------------------------

    function hashTabber() {
        // declarations
        var tabber = {
            options: {
                container: '.hashTabber',
                nav: '.hashTabber-nav',
                data: '.hashTabber-data',
                activeClass: 'active',
                tab: 'data-defaultTab',
            },
            helpers: {
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
                idsGiver: function () {
                    // loop through every instance of hashTabber
                    $(tabber.options.container).each(function () {
                        // get the distinct id of current tabber and default tab
                        var distinctName = $(this).attr('id');
                        var defaultTab = 0;
                        // check if defaultTab html data is set
                        if ($(this).attr(tabber.options.tab)) {
                            defaultTab = parseInt($(this).attr(tabber.options.tab),10);
                        }
                        // loop through every nav element of current tabber
                        $(this).find(tabber.options.nav).find('>li').each(function(index, item) {
                            // add #link to every one of these
                            $(item).find('>a').attr('href', '#' + distinctName + '=' + index);
                            // set default to active
                            if (index === defaultTab) {
                                $(item).addClass(tabber.options.activeClass);
                            }
                        });
                        $(this).find(tabber.options.data).find('>li').each(function(index, item) {
                            // set default to active
                            if (index === defaultTab) {
                                $(item).addClass(tabber.options.activeClass);
                            }
                        });
                    });
                    return true;
                },
                tabSwiper: function (hash) {
                    // find #link grandpa element
                    var grandpa = $('a[href="#' + hash + '"]').parents(tabber.options.container);
                    // get the index number from hash
                    var number;
                    if (hash) {
                        number = hash.split('=')[1];
                    } else {
                        number = 0;
                    }
                    // get the parent nav and data lists
                    var parentNav = grandpa.find(tabber.options.nav);
                    var parentData = grandpa.find(tabber.options.data);
                    // clear active class of all nav elements and give it to the target one
                    $(parentNav.find('>li')).removeClass(tabber.options.activeClass);
                    $(parentNav.find('>li')[number]).addClass(tabber.options.activeClass);
                    
                    // clear active class of all data elements and give it to the target one
                    $(parentData.find('>li')).removeClass(tabber.options.activeClass);
                    $(parentData.find('>li')[number]).addClass(tabber.options.activeClass);

                    return true;
                }
            },
        };
        // create ids for every link element in hashTabber navigation
        tabber.helpers.idsGiver();

        // run for the first time on page load
        tabber.helpers.tabSwiper(tabber.helpers.hashProber());

        $(window).bind('hashchange', function () {
            tabber.helpers.tabSwiper(tabber.helpers.hashProber());
        });
    }

}


// --------------------------------------------------
// create a public object and start its run function
// --------------------------------------------------

var hashTabberSoundsLikeDrugs = new projectInterface();
// run functions
hashTabberSoundsLikeDrugs.run();