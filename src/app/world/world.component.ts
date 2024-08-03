import { AfterViewInit, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WorldBankService } from '../world-bank.service';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss'],
  providers: [WorldBankService]
})
export class WorldComponent implements AfterViewInit {
  countryData: any;

  constructor(private http: HttpClient, private worldBankService: WorldBankService, private cdr: ChangeDetectorRef, private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.loadSVG();
  }

  loadSVG(): void {
    this.http.get('assets/map-image.svg', {responseType: 'text' }).subscribe(svg => {
      const div = this.elRef.nativeElement.querySelector('.map');
      div.innerHTML = svg;

      this.applyInitialStyles()
    })
  }

  onMapLoad(event: any): void {
    const svg = event.target.contentDocument;

    if (!svg) {
      console.error('failed to load svg');
      return; 
    } 
    
    console.log('svg loaded fine');

    svg.addEventListener('click', this.onMapClick.bind(this));
  }

  applyInitialStyles(): void {
    const svgElement = this.elRef.nativeElement.querySelector('svg');
    if (svgElement) {
      const countryPaths = svgElement.querySelectorAll('.country');
      // countryPaths?.forEach((path: SVGElement) => path.setAttribute('style', 'fill: blue; stroke: white;'))
    }
  }

  onMapClick(event: any): void {
    const countryCode = event.target.id;
    console.log(`Country Clicked: ${countryCode}`);

    if (countryCode) {
      this.resetHighlights();

      this.worldBankService.getCountryData(countryCode).subscribe({
        next: data => {
          let newData = JSON.stringify(data, null, 2);
          console.log(`Data received: ${newData}`);
          this.countryData = data[1][0];
          console.log(`Country Data Set: ${this.countryData}`);
          this.cdr.detectChanges();
          this.highlightCountry(countryCode);
        },
        error: err => {
          console.error(`Error fetching country data: ${err}`);
        },
        complete: () => {
          console.log(`Data fetch complete`);
        }
      }
        
      );
    }
  }

  highlightCountry(countryCode: string): void {
    const svgElement = this.elRef.nativeElement.querySelector('svg');
    if (svgElement) {
      const countryPath = svgElement.querySelector(`#${countryCode}`);
      if (countryPath) {
        countryPath.classList.add('highlight');
      }
    }
  }

  resetHighlights(): void {
    const svgElement = this.elRef.nativeElement.querySelector('svg');
    if (svgElement) {
      const hightlightedPaths = svgElement.querySelectorAll('.highlight');
      hightlightedPaths.forEach((path: SVGElement) => path.classList.remove('highlight'));
    }
  }
}
