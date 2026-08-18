import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LucideAngularModule, GraduationCap, Briefcase } from 'lucide-angular';
import { PortfolioService } from '../../services/portfolio.service';
import { Profile, Highlight, Education, Experience } from '../../models/portfolio.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  readonly GraduationCap = GraduationCap;
  readonly Briefcase = Briefcase;
  activeTab: string = 'edu';
  profile: Profile | null = null;
  highlights: Highlight[] = [];
  education: Education[] = [];
  experiences: Experience[] = [];
  private sub?: Subscription;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.sub = this.portfolioService.getPortfolio().subscribe(data => {
      this.profile = data.profile;
      this.highlights = data.highlights || [];
      this.education = data.education || [];
      this.experiences = data.experiences || [];
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}
