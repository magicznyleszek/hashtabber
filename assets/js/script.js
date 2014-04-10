function projectInterface() {
    // --------------------------------------------------
    // declare a public run function
    // with all private stuff initialized inside of it
    // --------------------------------------------------

    this.run = run;
    function run() {
        var tabber = new HashTabber();
        tabber.run();
    }

}


// --------------------------------------------------
// create a public object and start its run function
// --------------------------------------------------

var hashTabberSoundsLikeDrugs = new projectInterface();
// run functions
hashTabberSoundsLikeDrugs.run();