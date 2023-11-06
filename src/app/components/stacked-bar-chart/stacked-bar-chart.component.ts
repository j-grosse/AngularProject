import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.sass'],
})
export class StackedBarChartComponent implements OnInit {
  public data: any[] = [
    { category: 'KW 40', value1: 10, value2: 8, value3: 0 },
    { category: 'KW 41', value1: 15, value2: 25, value3: 0 },
    { category: 'KW 42', value1: 20, value2: 30, value3: 0 },
    { category: 'KW 43', value1: 25, value2: 30, value3: 0 },
    { category: 'KW 44', value1: 30, value2: 30, value3: 0 },
  ];

  private containerId: string = '0';
  private margin: any;
  private width: number = 0;
  private height: number = 0;
  svg: any;

  createChart() {
    // Create an SVG container
    this.svg = d3
      .select(`#${this.containerId}`)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g') // add SVG elemens to group
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Define the stack generator
    const stack = d3
      .stack()
      .keys(Object.keys(this.data[0]).slice(1))
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    // Generate the stacked data
    const series = stack(this.data);

    // Set up scales and axes
    const x = d3
      .scaleBand()
      .domain(this.data.map((d) => d.category))
      .range([0, this.width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1])) as number])
      .range([this.height, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(this.data[0]).slice(1))
      .range(['#2ca02c', '#ff7f0e', '#1f77b4']);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Append the bars
    this.svg
      .selectAll('.stack')
      .data(series)
      .enter()
      .append('g')
      .attr('class', 'stack')
      .attr('fill', (d: any) => color(d.key))
      .selectAll('rect')
      .data((d: any) => d)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.data.category))
      .attr('y', (d: any) => y(d[1]))
      .attr('height', (d: any) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());

    // Append the horizontal axis
    this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis);

    // Append the vertical axis
    this.svg.append('g').call(yAxis);
  }

  ngOnInit(): void {
    this.containerId = 'chart-container';
    this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
    this.width = 600 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.createChart();
  }
}
