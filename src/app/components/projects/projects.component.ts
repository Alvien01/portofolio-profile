import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  demoLink: string;
  images: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'My personal portfolio built in Angular JS.',
      demoLink: 'https://demo.com',
      images: ['Screenshot (161).png', 'Screenshot (162).png'],
    },
    {
      title: 'Ruangbacaku',
      description:
        'Website Blog built with Laravel 8 with Monolithic Architecture.',
      demoLink: 'https://ruangbacaku.com/',
      images: [
        '1725718114207.jpeg',
        'Screenshot (165).png',
        'Screenshot (166).png',
      ],
    },
    {
      title: 'ERP Laravel',
      description:
        'ERP system built with Laravel 8 with Monolithic Architecture.',
      demoLink: 'https://demo.com',
      images: ['Screenshot (156).png'],
    },
    {
      title: 'Karmarbaca',
      description:
        'Website Blog built with Laravel 8 for Backend & Angular JS for Frontend',
      demoLink: 'https://demo.com',
      images: ['Screenshot (168).png','Screenshot (167).png'],
    },
     {
      title: 'BGentertaiment',
      description:
        'Entertaiment Profile Website build with Laravel 10 & Breeze with Monolithic Architecture',
      demoLink: 'https://demo.com',
      images: ['Screenshot (169).png','Screenshot (170).png','Screenshot (171).png'],
    },
         {
      title: 'Sistem Informasi CRM ',
      description:
        'Sistem Informasi CRM build with Laravel 8 with Monolithic Architecture',
      demoLink: 'https://demo.com',
      images: ['1685954946989.jpeg'],
    },
  ];
  selectedProject: Project | null = null;
  currentImageIndex: number = 0;

  openModal(project: Project) {
    this.selectedProject = project;
    this.currentImageIndex = 0;
  }

  closeModal() {
    this.selectedProject = null;
  }

  prevImage() {
    if (this.selectedProject) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.selectedProject.images.length) %
        this.selectedProject.images.length;
    }
  }

  nextImage() {
    if (this.selectedProject) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.selectedProject.images.length;
    }
  }
}
