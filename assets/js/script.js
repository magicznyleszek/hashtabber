function projectInterface() {
    this.init = init;
    function init() {
        // initialize your functions here
        doSomething();
    }
    // create your functions here
    function doSomething() {
        if(true === true) {
            console.log("truth");
        }
    }
}
var knowYourDinosaurs = new projectInterface();
knowYourDinosaurs.init();