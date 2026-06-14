import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  activeTab: string = 'edu';

  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}
