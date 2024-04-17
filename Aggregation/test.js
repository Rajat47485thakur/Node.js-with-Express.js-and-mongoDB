const age = 35;
function first (age){

    function pari() {
        function ladu() {
            console.log(age + " years old");
        }
        return ladu();
    }
    return pari();
}
first(34);