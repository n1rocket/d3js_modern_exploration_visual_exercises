const width = 800
const height = 500
const margin = {
  top: 10,
  bottom: 40,
  left: 40,
  right: 10,
}

// Defino SVG y Grupos:
const svg = d3.select("div#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

//Aplicamos una transformación para mover la posición de todo el grupo ya que quedaba pegado a la izquierda
const elementGroup = svg.append("g")
  .attr("id", "elementGroup")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  
const axisGroup = svg.append("g")
  .attr("id", "axisGroup")
  
const xAxisGroup = axisGroup.append("g")
  .attr("id", "xAxisGroup")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)

const yAxisGroup = axisGroup.append("g")
  .attr("id", "yAxisGroup")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

//Escalas
const x = d3.scaleBand().range([0, width - margin.left - margin.right])
  .padding(0.1) //Para separar en X
const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

//Definir ejes
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

d3.json("buildings.json").then( data => {
  console.log(data)

  //Transformar datos (Ya están preparados en este caso)

  //Dominio
  x.domain(data.map(d => d.name))
  //y.domain(d3.extent(data.map(d => d.height)))
  // Alternativa desde 0
  y.domain([0, d3.max(data.map(d => d.height))])

  // Dibujar
  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

  // Data binding
  elementGroup.selectAll("rect").data(data)
    .join("rect")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.height))
    .attr("height", d => height - margin.bottom - margin.top - y(d.height))
    .attr("width", x.bandwidth())

});

function addBuilding(group){
  group.attr("class", d => "tooltip")
      .attr("transform", d=> `translate(${x(d.height)}, 100)`)

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