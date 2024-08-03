import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { WorldBankService } from '../world-bank.service';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [],
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss'],
  providers: [WorldBankService]
})
export class WorldComponent {
  countryData: any;

  constructor(private http: HttpClient, private elRef: ElementRef, private worldBankService: WorldBankService, private cdr: ChangeDetectorRef) { }

  loadSVG(): void {
    this.http.get('assets/map-image.svg', {responseType: 'text'}).subscribe(svg => {
      const div = this.elRef.nativeElement.querySelector('.map');
      div.innerHTML = svg;
    })
  }

  onMapLoad(event: any): void {
    const svg = event.target.contentDocument;

    if (!svg) {
      console.error('failed to load svg');
      return;
    }

    console.log('svg loaded fine');
  }

  applyInitialStyles(): void {
    const svgElement = this.elRef.nativeElement.querySelector('svg');
    if (svgElement) {
      const countryPaths = svgElement.querySelectorAll('.country');
    }
  }
}
