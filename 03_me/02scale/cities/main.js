const width = 800
const height = 250
const margin = 30 // la mitad a cada lado

const svg = d3.select("div#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

//Aplicamos una transformación para mover la posición de todo el grupo ya que quedaba pegado a la izquierda
const elementGroup = svg.append("g").attr("transform", `translate(${margin / 2},0)`)
const axisGroup = svg.append("g").attr("transform", `translate(${margin / 2}, ${height - margin})`)

// La escala necesita Rango y dominio
// Rango
const x = d3.scaleLinear().range([0, width - margin])
const xAxis = d3.axisBottom().scale(x)

d3.json("cities.json").then(data => {
    console.log(data)

    // Dominio
    x.domain(d3.extent(data.map(d => d.distance)))
    axisGroup.call(xAxis)

    // A pintar
    let elements = elementGroup.selectAll("g").data(data)
    elements.enter()
        .append("g")
        .call(addCity)
            
})

function addCity(group){
    group.attr("class", d => "tooltip")
        .attr("transform", d=> `translate(${x(d.distance)}, 100)`)

    group.append("circle")
        .attr("r", 10)

    group.append("text")
        .attr("class", "city")
        .text(d=> d.city)
        .attr("transform", `rotate(-90)`)
        .attr("x", -25)
        .attr("y", 4)
        //.attr("text-anchor", "middle")//Por CSS

    group.append("text")
        .attr("class", "tooltiptext")
        .text(d => d.distance)
        //.attr("x", -20)
        .attr("y", -14)
        .attr("text-anchor", "middle")
}

    //1 forma
    // elementGroup.selectAll("circle").data(data)
    //     .join('circle')
    //         .attr('class', d => d.city)
    //         .attr('cx', d => x(d.distance))
    //         .attr('cy', height / 3)
    //         .attr('r', 10)
    //         .style('fill', '#000');

    // Primera forma sencilla, pero formato complejo
    // elementGroup.selectAll("text").data(data)
    //     .join("text")
    //     .attr("class", "city")
    //     .text(d => d.city)
    //     .attr("x", d => x(d.distance))
    //     .attr("y", 20)