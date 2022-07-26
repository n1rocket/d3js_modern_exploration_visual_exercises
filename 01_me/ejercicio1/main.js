const height = 500
const width = 800
const colors = ["#440154", "#482475", "#414487", "#355f8d", "#2a788e", "#21908d", "#22a884", "#42be71", "#7ad151", "#bddf26", "#bddf26"]

const svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)

function addCircles() {
    for (let index = 0; index < 6; index++) {
        svg.append("circle")
        .attr("cx", Math.random() * width)
        .attr("cy", Math.random() * height)
        .attr("r", (2 + (Math.random() * 20)))
        .attr("fill", colors[Math.floor(Math.random() * colors.length )])
        .on("click", () => {
            this.target.remove()
        })
    }
}

d3.select("#circleBtn").on("click", addCircles)