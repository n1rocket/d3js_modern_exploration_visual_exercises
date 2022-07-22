const width = 800
const height = 500
const margin = {
  top: 10,
  bottom: 40,
  left: 40,
  right: 10,
}

// Defino SVG y Grupos:
const svg = d3.select("#chart")
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
  .attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)

const yAxisGroup = axisGroup.append("g")
  .attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

//Escalas
const x = d3.scaleLinear().range([0, width - margin.left - margin.right])
const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])
const z = d3.scaleLinear().range([4, 40]) //Tamaño min y max de radio a dibujar

//Definir ejes
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

// Data
d3.csv("data.csv").then( data => {
  console.log(data)

  //Transformamos
  data.map( d => {
    d.GDPpc = +d.GDPpc
    d.lifeExpectancy = +d.lifeExpectancy
    d.population = +d.population
  })

  //Dominio
  x.domain(d3.extent(data.map(d => d.lifeExpectancy)))
  y.domain(d3.extent(data.map(d => d.GDPpc)))
  z.domain(d3.extent(data.map(d => d.population)))

  // Dibujar
  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

  //Databinding
  elementGroup.selectAll("circle").data(data)
    .enter()
    .append("circle")
      .attr("class", d => d.continent)
      .attr("cx", d => x(d.lifeExpectancy))
      .attr("cy",  d => y(d.GDPpc))
      .attr("r", d => z(d.population))
});