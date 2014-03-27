function projectInterface() {
    // declare a public run function
    this.run = run;
    function run() {
        // initialize all functions here
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
                        // get the distinct id of current tabber
                        var distinctName = $(this).attr('id');
                        // loop through every nav element of current tabber
                        $(this).find(tabber.options.nav).find('>li').each(function(index, item) {
                            // add #link to every one of these
                            $(item).find('>a').attr('href', '#' + distinctName + '=' + index);
                        });
                    });
                    return true;
                },
                tabSwiper: function (hash) {
                    // find #link grandpa element
                    var grandpa = $('a[href="#' + hash + '"]').parents(tabber.options.container);
                    // get the index number from hash
                    var number = hash.split('=')[1];

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

        // // for activating target element and it's data element
        // function activateItem(_target) {
        //     // get item parent node
        //     var navList = $(_target.delegateTarget.parentNode);
        //     // get clicked item index
        //     var itemIndex = navList.find('>li').index(_target.delegateTarget);
        //     // get the proper data element for the switcher
        //     var dataList = navList.parent().find(options.data);
        //     // clear the active classes for all elements
        //     dataList.find('>li').removeClass(options.activeClass);
        //     navList.find('>li').removeClass(options.activeClass);
        //     // add active class to according li element from switcher
        //     $(dataList.find('>li')[itemIndex]).addClass(options.activeClass);
        //     $(navList.find('>li')[itemIndex]).addClass(options.activeClass);
        // }
        // // check if content switcher exists
        // if ($(options.container).length > 0) {
        //     // trigger on click
        //     $(options.navigation).find('>li').click(activateItem);
        //     // activate first element on start
        //     $(options.navigation).find('>li')[0].click();
        // }



    }
}
// create a public object
var hashTabberSoundsLikeDrugs = new projectInterface();
// run functions
hashTabberSoundsLikeDrugs.run();