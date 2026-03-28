import { Component, HostListener } from '@angular/core';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;
  readonly MenuIcon = Menu;
  readonly XIcon = X;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu(state?: boolean) {
    this.isMenuOpen = state !== undefined ? state : !this.isMenuOpen;
  }

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
