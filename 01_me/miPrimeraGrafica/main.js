console.log("Hola mundo")

let array1 = [0,1,2,3,4,5,6]
let dict = {
    name: "Pedro",
    age: 22
}

d3.select('.cabeza').style('color', "yellow")
d3.select('.cabeza').attr('style', "color:blue")

let name = "Armando"
const lastname = "Bueno"

function add(n1, n2){
    return n1 + n2
}

console.log(add(1,5))

console.log(array1[1])
console.log(dict.name)

//Mapas y arrow functions
newArray = array1.map( d => d + 1)

console.log(newArray)

console.log(`formateado: ${add(3,4)}`)