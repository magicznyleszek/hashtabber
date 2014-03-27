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
        var options = {
            container: '.hashTabber',
            navigation: '.hashTabber-navigation',
            data: '.hashTabber-data',
            activeClass: 'active'
        };

        // for activating target element and it's data element
        function activateItem(_target) {
            // get item parent node
            var navList = $(_target.delegateTarget.parentNode);
            // get clicked item index
            var itemIndex = navList.find('>li').index(_target.delegateTarget);
            // get the proper data element for the switcher
            var dataList = navList.parent().find(options.data);
            // clear the active classes for all elements
            dataList.find('>li').removeClass(options.activeClass);
            navList.find('>li').removeClass(options.activeClass);
            // add active class to according li element from switcher
            $(dataList.find('>li')[itemIndex]).addClass(options.activeClass);
            $(navList.find('>li')[itemIndex]).addClass(options.activeClass);
        }
        // check if content switcher exists
        if ($(options.container).length > 0) {
            // trigger on click
            $(options.navigation).find('>li').click(activateItem);
            // activate first element on start
            $(options.navigation).find('>li')[0].click();
        }



    }
}
// create a public object
var hashTabberSoundsLikeDrugs = new projectInterface();
// run functions
hashTabberSoundsLikeDrugs.run();