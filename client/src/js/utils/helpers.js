/**
 * @param start {number}
 * @param end {number}
 * @param step {number}
 * @returns {[]}
 */
export const range = (start, end, step = 1) => {
    let newArr = [];
    for(let i = start; i <= end; i += step){
        newArr.push(i);
    }
    return newArr;
};

export function throttle( delay, callback ) {
    var timeoutID;
    var lastExec = 0;
    var cancelled = false;

    function clearExistingTimeout(){
        if ( timeoutID ) {
            clearTimeout(timeoutID);
        }
    }

    function cancel () {
        clearExistingTimeout();
        cancelled = true;
    }

    function wrapper(){
        var self = this;
        var elapsed = Date.now() - lastExec;
        var args = arguments;

        if (cancelled) {
            return;
        }

        function exec(){
            lastExec = Date.now();
            callback.apply(self, args);
        }

        if(!timeoutID){
            exec();
        }

        clearExistingTimeout();

        if(elapsed > delay){
            exec();
        } else {
            timeoutID = setTimeout(exec, delay - elapsed);
        }

    }

    wrapper.cancel = cancel;

    return wrapper;
}
