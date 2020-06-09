function crearProduccion(izquierdo, derecho) {
    return {
        ladoIzquierdo: izquierdo,
        ladoDerecho: derecho,
    };
}
function crearNoTerminal(exp) {
    return {
        noTerminal : exp.toUpperCase(),
    };
}
function crearTerminal(exp) {
    return {
        terminal : exp.toLowerCase(),
    };
}
function crearLambda() {
    return {
        lambda : "λ",
    };
}
const produccion1 = 
crearProduccion(crearNoTerminal('B'), [crearTerminal('b'), crearNoTerminal('C'), crearTerminal('b')]);
const produccion2 = 
crearProduccion(crearNoTerminal('B'), [crearTerminal('a'), crearNoTerminal('B'), crearTerminal('B')]);
const produccion3 = 
crearProduccion(crearNoTerminal('C'), [crearTerminal('a'), crearNoTerminal('C'), crearTerminal('d')]);
const produccion4 = 
crearProduccion(crearNoTerminal('C'), [crearNoTerminal('b')]);

let gramatica = [];
gramatica.push(produccion1);
gramatica.push(produccion2);
gramatica.push(produccion3);
gramatica.push(produccion4);
function isTerminal(nodo){
    //console.log(typeof nodo);
    return Object.keys(nodo).includes("terminal");
}
function isNoTerminal(nodo){
    return Object.keys(nodo).includes("noTerminal");
}
function isLambda(nodo){
    return Object.keys(nodo).includes("lambda");
}
function allStartWithTerminal(gramatica){
    return gramatica.filter(x => isTerminal( x.ladoDerecho[0] ) ).length === gramatica.length ;
}
function noterminalesUnique(gramatica){
    const todos = gramatica.map(x => x.ladoIzquierdo.noTerminal);
    return todos.filter((x, i, a) => a.indexOf(x) === i);    
}
function areEqualsProductions(produccion1, produccion2){
    return produccion1.ladoIzquierdo.noTerminal === produccion2.ladoIzquierdo.noTerminal
}
function sameFirstTerminal(produccion1, produccion2){        
    if(isTerminal(produccion1.ladoDerecho[0]) && isTerminal(produccion2.ladoDerecho[0])){
        return produccion1.ladoDerecho[0].terminal === produccion2.ladoDerecho[0].terminal
    }else
        return false;
}
function sameTerminalAndProduccion(gramatica){
    for (let i = 0; i < gramatica.length; i++) {
        let prod1 = gramatica[i];
        for (let j = 0; j < gramatica.length; j++) {
            if(i !== j){
                let prod2 = gramatica[j];
                let resp = sameFirstTerminal(prod1, prod2) && areEqualsProductions(prod1, prod2);
                if (resp){ return true; }
            }                     
        }    
    }
    return false;
}
function isGramaticaS(gramatica){
    return allStartWithTerminal(gramatica) && !sameTerminalAndProduccion(gramatica)
}
function conjuntoSeleccion(produccion, gramatica){
    return conjuntoSiguientes(produccion.ladoIzquierdo, gramatica);
}
function conjuntoSiguientes(noTerm, gramatica){
    let sig = [];
    if (noTerm.noTerminal === gramatica[0].ladoIzquierdo.noTerminal){
        sig.push('vacio');
    }
    for (let i = 0; i < gramatica.length; i++) {
        let ladoDerecho = gramatica[i].ladoDerecho
        for (let j = 0; j < ladoDerecho.length; j++) {
            if ( i !== j  && isNoTerminal(ladoDerecho[j])){
                if ( ladoDerecho[j].noTerminal === noTerm.noTerminal ){
                    if(j === ladoDerecho.length-1){
                        sig.push( conjuntoSiguientes(noTerm, gramatica) ).flat()
                    }else if( isTerminal(ladoDerecho[j+1]) ){
                        ladoDerecho.push(ladoDerecho[j+1].terminal );
                    }else if( isNoTerminal(ladoDerecho[j+1]) ){
                        if(isAnulable(gramatica, ladoDerecho[j+1]) ){
                            if(isTerminal(ladoDerecho[j+2]) ){
                                sig.push(primerosNoTerminal(gramatica, ladoDerecho[j+1])).flat();
                                sig.push(ladoDerecho[j+2].terminal);
                            }                            
                        }else{
                            sig.push(primerosNoTerminal(gramatica, ladoDerecho[j+1])).flat();
                        }                        
                    }
                }            
            }        
        }
        return sig.filter((x, i, a) => a.indexOf(x) === i);
    }
}
const valr =  conjuntoSiguientes(crearNoTerminal('B'), gramatica)
console.log(valr);
function isAnulable(gramatica, noTerm){
    return gramatica.filter(x => x.ladoIzquierdo.noTerminal === noTerm.noTerminal).filter(x => isLambda(x.ladoDerecho[0])).length >0 ;
}
function allStartWithTerminalOrLambda(gramatica){
    return gramatica.filter(x => isTerminal( x.ladoDerecho[0] ) || isLambda(x.ladoDerecho[0]) ).length === gramatica.length ;
}
function primerosNoTerminal(gramatica, noTerminal){
    const aux = gramatica.filter(x => x.ladoIzquierdo.noTerminal === noTerminal );
    return aux
}
function primerosProduccion(gramatica, produccion){
}
// recuerde cuando hay dos noterminales nulos

function isQ(gramatica){

}
function isLL1(){

}
