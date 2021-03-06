// import { Component, OnInit, Input, OnChanges } from '@angular/core';
//
// @Component({
//   selector: 'app-child',
//   templateUrl: './child.component.html',
//   styleUrls: ['./child.component.css']
// })
// export class ChildComponent implements OnInit, OnChanges {
//   @Input() data: {name: string, value: number}[] = [];
//   constructor() {
//   }
//
//   ngOnInit() {
//   }
//
//   ngOnChanges(){
//     let info: {name: string, value: number}[]=[];
//     console.log("changed");
//     // console.log(this.data[0].value);
//     for(let i=0; i<this.data.length; i++){
//       info[i] = this.data[i];
//     }
//     for(let i=0; i<info.length; i++){
//       console.log("name: ", info[i].name, "value: ", info[i].value);
//     }
//   }
// }

import { Component, ElementRef, NgZone, OnDestroy, OnInit, Input, OnChanges } from '@angular/core';
import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges {
  @Input() data: [{name: string, value: number}];
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log("change detected");
            let self = this;
            let d3 = this.d3;
            let d3ParentElement: any;
            let svg: any;
            let name: string;
            let yVal: number;
            let colors = [];
            let padding: number = 25;
            let width: number = 500;
            let height: number = 150;
            let xScale: any;
            let yScale: any;
            let xAxis: any;
            let yAxis: any;

    if (this.parentNativeElement !== null) {
      d3.select("svg").remove();
      svg = d3.select(this.parentNativeElement)
          .append('svg')        // create an <svg> element
          .attr('width', width) // set its dimensions
          .attr('height', height);

      colors = ['#C9302C', '#F0AD4E', '#5CB85C', '#337AB7'];

      xScale = d3.scaleBand()
          .domain(this.data.map(function(d){ return d.name; }))
          .range([0, 200]);

      yScale = d3.scaleLinear()
          .domain([0,d3.max(this.data, function(d) {return d.value})])
          .range([100, 0]);

      xAxis = d3.axisBottom(xScale) // d3.js v.4
          .ticks(5)
          .scale(xScale);

      yAxis = d3.axisLeft(xScale) // d3.js v.4
          .scale(yScale)
          .ticks(7);

        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (padding) + "," + padding + ")")
        .call(yAxis);

	       svg.append('g')            // create a <g> element
         .attr('class', 'axis')   // specify classes
	       .attr("transform", "translate(" + padding + "," + (height - padding) + ")")
         .call(xAxis);            // let the axis do its thing

      var rects = svg.selectAll('rect')
          .data(this.data);
          rects.size();

      var newRects = rects.enter();

      newRects.append('rect')
          .attr('x', function(d,i) {
            return xScale(d.name );
          })
          .attr('y', function(d) {
              return yScale(d.value);
            })
	        .attr("transform","translate(" + (padding -5  + 25) + "," + (padding - 5) + ")")
          .attr('height', function(d) {
              return height - yScale(d.value) - (2*padding) + 5})
          .attr('width', 10)
          .attr('fill', function(d, i) {
            return colors[i];
          });
     }
   }
 }
