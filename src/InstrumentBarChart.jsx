import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function InstrumentBarChart({ scores }) {
  const ref = useRef();

  useEffect(() => {
    let data = Object.entries(scores).map(([name, value]) => ({ name, value }));
    data = data.sort((a, b) => b.value - a.value).slice(0, 5);
    const margin = { top: 40, right: 30, bottom: 60, left: 30 };
    const width = 60 * data.length + margin.left + margin.right;
    const height = 320;

    d3.select(ref.current).selectAll("*").remove();
    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.22);

    const maxValue = data.length > 0 ? Math.max(...data.map(d => d.value)) : 100;
    const y = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-30)")
      .attr("text-anchor", "end")
      .style("font-size", "13px");

    svg.selectAll("rect.bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", "#28a9e1");


  }, [scores]);

  return (
    <div style={{ margin: "2rem auto", maxWidth: 400, background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", padding: '2rem' }}>
      <h2 style={{ fontSize: 20, margin: "0 0 10px 0", color: "#361F0B", textAlign: 'center' }}>Instrument Compatibility</h2>
      <svg ref={ref}></svg>
    </div>
  );
}
