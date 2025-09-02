import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  demoLink: string;
  image: string;
}
@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'My personal portfolio Build in Angular JS.',
      demoLink: 'https://demo.com',
      image: 'Screenshot (155).png',
    },
        {
      title: 'Ruangbacaku',
      description: 'Website Blog Build in Laravel 8 with Monolithic Architecture.',
      demoLink: 'https://ruangbacaku.com/',
      image: '1725718114207.jpeg',
    },
    {
      title: 'ERP Laravel',
      description: 'ERP system built with Laravel 8 with Monolithic Architecture.',
      demoLink: 'https://demo.com',
      image: 'Screenshot (156).png',
    },
  ];
}
