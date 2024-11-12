"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface TopTagsChartProps {
  data: { tagName: string; count: number; color: string }[];
}

export default function TopTagsChart({ data }: TopTagsChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const containerWidth = Math.min(svg.parentElement?.clientWidth || 500, 500);
    const containerHeight = svg.parentElement?.clientHeight || 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = containerWidth - margin.right - margin.left;
    const height = containerHeight - margin.top - margin.bottom;

    const d3Svg = d3.select(svg);
    d3Svg.selectAll("*").remove();

    d3Svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
      )
      .attr("preserveAspectRatio", "xMidYMid meet");

    const chartArea = d3Svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.tagName))
      .range([0, width])
      .padding(0.1);
    const maxCount = d3.max(data, (d) => d.count) || 0;
    const y = d3
      .scaleLinear()
      .domain([0, maxCount + 1])
      .nice()
      .range([height, 0]);

    chartArea
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    chartArea.append("g").call(d3.axisLeft(y).ticks(1));

    chartArea.append("g").call(
      d3
        .axisLeft(y)
        .ticks(maxCount + 1)
        .tickFormat(d3.format("d")),
    );

    chartArea
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.tagName)!)
      .attr("y", (d) => y(d.count)!)
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count)!)
      .attr("fill", (d) => `var(--${d.color.toLowerCase()}-100)`);

    chartArea
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.tagName)! + x.bandwidth() / 2)
      .attr("y", (d) => y(d.count)! - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.count)
      .attr("class", "label");
  }, [data]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
}
