"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { CustomerType } from "@/types/customer/customerType";

interface TopTagsChartProps {
  data: CustomerType[];
}

export default function TopTagsChart({ data }: TopTagsChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // 태그 카운트를 저장할 객체 초기화 (count와 color 포함)
    const tagCounts: Record<string, { count: number; color: string }> = {};
    data.forEach((customer) => {
      customer.customerTags.forEach((tag) => {
        if (!tagCounts[tag.tagName]) {
          tagCounts[tag.tagName] = { count: 0, color: tag.tagColor };
        }
        tagCounts[tag.tagName].count += 1;
      });
    });

    // 상위 5개의 태그 데이터를 처리
    const sortedTags = Object.entries(tagCounts)
      .map(([tagName, { count, color }]) => ({ tagName, count, color }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // 차트의 크기와 여백 설정
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // SVG 요소를 생성하고 이전 내용을 지움
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
      )
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove(); // 이전 내용을 제거

    const chartArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 스케일 설정
    const barWidth =
      sortedTags.length < 5 ? (width / 5) * sortedTags.length : width;
    const x = d3
      .scaleBand()
      .domain(sortedTags.map((d) => d.tagName))
      .range([0, barWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(sortedTags, (d) => d.count) || 0])
      .nice()
      .range([height, 0]);

    // x축 추가
    chartArea
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // y축 추가
    chartArea.append("g").call(d3.axisLeft(y));

    // 태그 색상으로 막대 추가
    chartArea
      .selectAll(".bar")
      .data(sortedTags)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.tagName)!)
      .attr("y", (d) => y(d.count)!)
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count)!)
      .attr("fill", (d) => `var(--${d.color.toLowerCase()}-100)`); // 태그의 배경색 사용

    // 각 막대 위에 레이블 추가
    chartArea
      .selectAll(".label")
      .data(sortedTags)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.tagName)! + x.bandwidth() / 2)
      .attr("y", (d) => y(d.count)! - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.count)
      .attr("class", "label");

    // 컴포넌트가 언마운트될 때 차트 정리
    return () => {
      svg.selectAll("*").remove();
    };
  }, [data]);

  return <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />;
}
