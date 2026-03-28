import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  demoLink: string;
  images: string[];
  tech: string[];
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
      description: 'My personal portfolio built in Angular.',
      demoLink: 'https://demo.com',
      images: ['Screenshot (161).png', 'Screenshot (162).png'],
      tech: ['Angular', 'TypeScript', 'SCSS']
    },
    {
      title: 'Ruangbacaku',
      description: 'Website Blog built with Laravel 8 with Monolithic Architecture.',
      demoLink: 'https://ruangbacaku.com/',
      images: ['1725718114207.jpeg', 'Screenshot (165).png', 'Screenshot (166).png'],
      tech: ['Laravel', 'MySQL', 'Bootstrap']
    },
    {
      title: 'ERP Laravel',
      description: 'ERP system built with Laravel 8 with Monolithic Architecture.',
      demoLink: 'https://demo.com',
      images: ['Screenshot (156).png'],
      tech: ['Laravel', 'PostgreSQL', 'Livewire']
    },
    {
      title: 'Karmarbaca',
      description: 'Website Blog built with Laravel Backend & Angular Frontend.',
      demoLink: 'https://demo.com',
      images: ['Screenshot (168).png', 'Screenshot (167).png'],
      tech: ['Laravel', 'Angular', 'REST API']
    },
    {
      title: 'BGentertaiment',
      description: 'Entertainment Profile Website built with Laravel 10.',
      demoLink: 'https://demo.com',
      images: ['Screenshot (169).png', 'Screenshot (170).png', 'Screenshot (171).png'],
      tech: ['Laravel', 'Breeze', 'Tailwind']
    },
    {
      title: 'Sistem Informasi CRM',
      description: 'Sistem Informasi CRM built with Laravel 8.',
      demoLink: 'https://demo.com',
      images: ['1685954946989.jpeg'],
      tech: ['Laravel', 'AdminLT', 'MySQL']
    },
    {
      title: 'Glow Aesthetics Clinic',
      description: 'Clinic Profile Website built with Wordpress.',
      demoLink: 'https://demo.com',
      images: ['glow.indristudio.com_ (2).png', 'glow.indristudio.com_gallery_.png'],
      tech: ['Wordpress', 'Kadence', 'Elementor']
    },
    {
      title: 'Manajemen User',
      description: 'User Management & Payment Gateway built with Golang & Vue.',
      demoLink: 'https://demo.com',
      images: ['WhatsApp Image 2025-09-17 at 14.21.43_5edee526.jpg', 'localhost_5173_login.png'],
      tech: ['Golang', 'Vue JS', 'Payment Gateway']
    },
    {
      title: 'BGentertaiment Landing',
      description: 'Landing Page built with Astro JS & Tailwind CSS.',
      demoLink: 'https://demo.com',
      images: ['bgcosentertaiment.vercel.app_.png', 'bgcosentertaiment.vercel.app_ (1).png'],
      tech: ['Astro JS', 'Tailwind', 'Vercel']
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
