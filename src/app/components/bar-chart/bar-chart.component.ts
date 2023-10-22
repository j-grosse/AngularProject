import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass'],
})
export class BarChartComponent implements OnInit {
  public data = [
    { Framework: 'Applications', Stars: '22', Released: '2023' },
    { Framework: 'Rejections', Stars: '9', Released: '2023' },
  ];

  public ratio = (parseInt(this.data[1].Stars) / parseInt(this.data[0].Stars)).toFixed(2);

  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  // select the DOM element and insert a new SVG via [<g>]
  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  // function for drawing the bars
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.Framework))
      .padding(0.3);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(40,10)rotate(0)')
      // .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size','15px');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 50]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Framework))
      .attr('y', (d: any) => y(d.Stars))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Stars))
      .attr('fill', '#219C90');
  }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }
}
