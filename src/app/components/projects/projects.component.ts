import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/portfolio.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  currentImageIndex: number = 0;
  private sub?: Subscription;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.sub = this.portfolioService.getPortfolio().subscribe(data => {
      if (data && data.projects) {
        this.projects = data.projects.map((p: any) => ({
          ...p,
          images: this.parseImages(p.images),
          tech: this.parseTech(p.tech, p.tech_stack),
          currentImageIndex: 0
        }));
      }
    });
  }

  private parseTech(tech: any, techStack: any): string[] {
    if (Array.isArray(tech) && tech.length > 0) return tech;
    if (typeof tech === 'string' && tech.trim()) {
      try {
        const parsed = JSON.parse(tech);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      return tech.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (typeof techStack === 'string' && techStack.trim()) {
      try {
        const parsed = JSON.parse(techStack);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      return techStack.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  }

  private parseImages(images: any): string[] {
    if (Array.isArray(images)) return images.filter(Boolean);
    if (typeof images === 'string' && images.trim()) {
      try {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      return [images];
    }
    return [];
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openModal(project: Project) {
    this.selectedProject = project;
    this.currentImageIndex = project.currentImageIndex || 0;
  }

  closeModal() {
    this.selectedProject = null;
  }

  prevImage() {
    if (this.selectedProject && this.selectedProject.images && this.selectedProject.images.length > 0) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.selectedProject.images.length) %
        this.selectedProject.images.length;
    }
  }

  nextImage() {
    if (this.selectedProject && this.selectedProject.images && this.selectedProject.images.length > 0) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.selectedProject.images.length;
    }
  }

  prevCardImage(project: Project, event: Event) {
    event.stopPropagation();
    if (project.images && project.images.length > 1) {
      const currentIndex = project.currentImageIndex || 0;
      project.currentImageIndex = (currentIndex - 1 + project.images.length) % project.images.length;
    }
  }

  nextCardImage(project: Project, event: Event) {
    event.stopPropagation();
    if (project.images && project.images.length > 1) {
      const currentIndex = project.currentImageIndex || 0;
      project.currentImageIndex = (currentIndex + 1) % project.images.length;
    }
  }

  getCardImage(project: Project): string {
    if (!project.images || project.images.length === 0) {
      return '';
    }
    const idx = project.currentImageIndex || 0;
    return project.images[idx] || project.images[0] || '';
  }
}
