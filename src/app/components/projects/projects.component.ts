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
      images: ['Screenshot (168).png', 'Screenshot (167).png'],
    },
    {
      title: 'BGentertaiment',
      description:
        'Entertaiment Profile Website build with Laravel 10 & Breeze with Monolithic Architecture',
      demoLink: 'https://demo.com',
      images: [
        'Screenshot (169).png',
        'Screenshot (170).png',
        'Screenshot (171).png',
      ],
    },
    {
      title: 'Sistem Informasi CRM ',
      description:
        'Sistem Informasi CRM build with Laravel 8 with Monolithic Architecture',
      demoLink: 'https://demo.com',
      images: ['1685954946989.jpeg'],
    },
    {
      title: 'Glow Aesthetics Clinic',
      description:
        'Clinic Profile Website build with Wordpress 6.8.2 & Kedence Pro Themes for Client',
      demoLink: 'https://demo.com',
      images: ['glow.indristudio.com_ (2).png', 'glow.indristudio.com_gallery_.png'],
    },
    {
      title: 'Manajemen User',
      description:
        'User Manajemen & Payment Gateway build with Golang for Backend & Vue JS Vite as Frontend',
      demoLink: 'https://demo.com',
      images: ['WhatsApp Image 2025-09-17 at 14.21.43_5edee526.jpg', 'localhost_5173_login.png'],
    },
        {
      title: 'BGentertaiment Landing',
      description:
        'Landing Page build with Astro JS & Tailwind CSS',
      demoLink: 'https://demo.com',
      images: ['bgcosentertaiment.vercel.app_.png', 'bgcosentertaiment.vercel.app_ (1).png'],
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
