import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LucideAngularModule, GraduationCap, Briefcase, Sparkles, Calendar } from 'lucide-angular';
import { PortfolioService } from '../../services/portfolio.service';
import { Profile, Highlight, Education, Experience } from '../../models/portfolio.model';

export interface TimelineUnifiedItem {
  id?: number;
  type: 'experience' | 'education';
  title: string;
  subtitle: string;
  period: string;
  is_current?: boolean;
  sort_order?: number;
  yearSortValue: number;
}

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
  readonly Sparkles = Sparkles;
  readonly Calendar = Calendar;

  activeFilter: 'all' | 'experience' | 'education' = 'all';
  profile: Profile | null = null;
  highlights: Highlight[] = [];
  education: Education[] = [];
  experiences: Experience[] = [];

  timelineItems: TimelineUnifiedItem[] = [];
  filteredTimeline: TimelineUnifiedItem[] = [];

  private sub?: Subscription;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.sub = this.portfolioService.getPortfolio().subscribe(data => {
      this.profile = data.profile;
      this.highlights = data.highlights || [];
      this.education = data.education || [];
      this.experiences = data.experiences || [];
      this.buildTimeline();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  setFilter(filter: 'all' | 'experience' | 'education') {
    this.activeFilter = filter;
    this.applyFilter();
  }

  get experienceCount(): number {
    return this.timelineItems.filter(i => i.type === 'experience').length;
  }

  get educationCount(): number {
    return this.timelineItems.filter(i => i.type === 'education').length;
  }

  private buildTimeline() {
    const items: TimelineUnifiedItem[] = [];

    // Map Work Experiences
    this.experiences.forEach(exp => {
      items.push({
        id: exp.id,
        type: 'experience',
        title: exp.title,
        subtitle: exp.company,
        period: exp.period,
        is_current: Boolean(exp.is_current),
        sort_order: exp.sort_order ?? 0,
        yearSortValue: this.calculateYearWeight(exp.period, Boolean(exp.is_current))
      });
    });

    // Map Education
    this.education.forEach(edu => {
      items.push({
        id: edu.id,
        type: 'education',
        title: edu.title,
        subtitle: edu.sub_title,
        period: edu.period,
        is_current: false,
        sort_order: edu.sort_order ?? 0,
        yearSortValue: this.calculateYearWeight(edu.period, false)
      });
    });

    // Sort:
    // 1. Current active positions first
    // 2. Highest yearSortValue first (newest to oldest)
    // 3. Secondary fallback sort_order
    items.sort((a, b) => {
      if (a.is_current && !b.is_current) return -1;
      if (!a.is_current && b.is_current) return 1;
      if (b.yearSortValue !== a.yearSortValue) {
        return b.yearSortValue - a.yearSortValue;
      }
      return (a.sort_order ?? 0) - (b.sort_order ?? 0);
    });

    this.timelineItems = items;
    this.applyFilter();
  }

  private applyFilter() {
    if (this.activeFilter === 'all') {
      this.filteredTimeline = [...this.timelineItems];
    } else {
      this.filteredTimeline = this.timelineItems.filter(item => item.type === this.activeFilter);
    }
  }

  private calculateYearWeight(period: string, isCurrent: boolean): number {
    if (isCurrent) return 999999;
    const matches = period.match(/\b(20\d\d|19\d\d)\b/g);
    if (matches && matches.length > 0) {
      const numbers = matches.map(m => parseInt(m, 10));
      return Math.max(...numbers);
    }
    return 0;
  }
}
