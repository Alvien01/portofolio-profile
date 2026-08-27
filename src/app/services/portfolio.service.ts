import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { PortfolioData, Profile, Highlight, Education, Experience, Skill, Certificate, Project } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'https://portofolio-alfin-backend.vercel.app/api/portfolio';

  private portfolioData$ = new BehaviorSubject<PortfolioData>(this.getFallbackData());
  private loaded = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /** Load portfolio data from API (call once at app init, or with force=true to reload) */
  loadPortfolio(force: boolean = false): void {
    if (this.loaded && !force) return;

    // Cache-busting query parameter (Simple GET request without preflight headers)
    const timestamp = Date.now();
    const url = `${this.apiUrl}?_t=${timestamp}`;

    this.http.get<{ success: boolean; data: PortfolioData }>(url).pipe(
      tap(res => {
        if (res && res.success && res.data) {
          this.portfolioData$.next(res.data);
          this.loaded = true;
        }
      }),
      catchError(err => {
        console.warn('API error, using local fallback:', err);
        this.loaded = true;
        return of(null);
      })
    ).subscribe();
  }

  /** Observable of full portfolio data */
  getPortfolio(): Observable<PortfolioData> {
    return this.portfolioData$.asObservable();
  }

  /** Get current snapshot of portfolio data */
  getPortfolioSnapshot(): PortfolioData {
    return this.portfolioData$.getValue();
  }

  private getFallbackData(): PortfolioData {
    return {
      profile: {
        name: 'Alfin Ardiansyah',
        hero_tagline: 'Crafting premium digital experiences through Web Development, SEO, and Creative Content Blog.',
        about_title: "Hi, I'm Alfin Ardiansyah",
        about_text_1: 'A passionate Web Developer specialized in Laravel and Angular. I also can be a Fullstack or Backend Developer where I enjoy building modern web applications with clean design, optimized performance, and user-friendly interfaces.',
        about_text_2: 'With strong problem-solving skills and continuous learning mindset, I aim to deliver impactful digital solutions that help businesses grow.',
        connect_text: "Let's connect and create something amazing together!",
        profile_image: 'profile.jpg',
        about_image: '1732717869809.jpeg',
        resume_url: 'CV-Alfin-Ardiansyah.pdf'
      },
      highlights: [
        { name: 'SEO Analyst' },
        { name: 'Content Writer' },
        { name: 'Web Developer' },
        { name: 'Event Organizer' }
      ],
      education: [
        { period: '2021 – 2025', title: 'ITN Malang', sub_title: 'Teknik Informatika' },
        { period: '2018 – 2021', title: 'SMKN 1 Boyolangu Tulungagung', sub_title: 'Teknik Komputer dan Jaringan (TKJ)' }
      ],
      experiences: [
        { period: 'Februari 2026 – Sekarang', is_current: true, title: 'Fullstack Website Developer & Shopify Developer', company: 'PT Jitu Property' },
        { period: 'Agustus 2024 – Sekarang', is_current: true, title: 'Freelance Content Writer', company: 'Ruangbacaku' },
        { period: 'September 2025 – April 2026', is_current: false, title: 'Fullstack Web Developer', company: 'PT Cubiconia' },
        { period: 'September 2024 – Maret 2025', is_current: false, title: 'Content Writer', company: 'Siklinik' }
      ],
      skills: [
        { name: 'Angular', image_url: 'Angular_gradient.png', category: 'framework' },
        { name: 'Laravel', image_url: 'Laravel.png', category: 'framework' },
        { name: 'Tailwind CSS', image_url: 'Tailwind-removebg-preview.png', category: 'framework' },
        { name: 'CSS', image_url: 'css-removebg-preview.png', category: 'skill' },
        { name: 'PHP', image_url: 'PHP.png', category: 'skill' },
        { name: 'HTML', image_url: 'HTML-removebg-preview.png', category: 'skill' },
        { name: 'RESTful API', image_url: 'API-removebg-preview.png', category: 'skill' },
        { name: 'Content Writer', image_url: 'Content Writer.png', category: 'skill' },
        { name: 'SEO Specialist', image_url: 'SEO-removebg-preview.png', category: 'skill' },
        { name: 'CodeIgniter', image_url: 'png-transparent-codeigniter-hd-logo-removebg-preview.png', category: 'framework' },
        { name: '.NET Framework', image_url: 'NET-removebg-preview.png', category: 'framework' },
        { name: 'MySQL', image_url: 'mysql-logo-png-image-11660514413jvwkcjh4av-removebg-preview.png', category: 'skill' },
        { name: 'Golang', image_url: 'images__3_-removebg-preview.png', category: 'skill' },
        { name: 'Vue.js', image_url: 'images__2_-removebg-preview.png', category: 'framework' },
        { name: 'JavaScript', image_url: 'Unofficial_JavaScript_logo_2.svg.png', category: 'skill' },
        { name: 'Astro.js', image_url: '1_nLbfO_PdTSpeCdZQuUr8RQ-removebg-preview.png', category: 'framework' }
      ],
      certificates: [
        { title: 'Full Stack Developer Intership - Jitu Property', image_url: '1726059585873.jpeg' },
        { title: 'Peserta IFFES IOT - ITN Malang', image_url: 'Screenshot (160).png' },
        { title: 'Getting Started with Node-Red HTTP  - Indobot', image_url: 'Screenshot (157).png' },
        { title: 'Coding Camp Laravel Class - HariSenin', image_url: 'CodingCamp.png' },
        { title: 'Asisten Labolatorium Mobile Programming - ITN Malang', image_url: 'Serti Alfin2.png' },
        { title: 'Koordinator Praktikum Pemrograman Visual - ITN Malang', image_url: 'Serti Alfin.png' }
      ],
      projects: [
        { title: 'Portfolio Website', description: 'My personal portfolio built in Angular.', images: ['Screenshot (161).png', 'Screenshot (162).png'], tech: ['Angular', 'TypeScript', 'SCSS'] },
        { title: 'Ruangbacaku', description: 'Website Blog built with Laravel 8 with Monolithic Architecture.', images: ['1725718114207.jpeg', 'Screenshot (165).png', 'Screenshot (166).png'], tech: ['Laravel', 'MySQL', 'Bootstrap'] },
        { title: 'ERP Laravel', description: 'ERP system built with Laravel 8 with Monolithic Architecture.', images: ['Screenshot (156).png'], tech: ['Laravel', 'PostgreSQL', 'Livewire'] },
        { title: 'Karmarbaca', description: 'Website Blog built with Laravel Backend & Angular Frontend.', images: ['Screenshot (168).png', 'Screenshot (167).png'], tech: ['Laravel', 'Angular', 'REST API'] },
        { title: 'BGentertaiment', description: 'Entertainment Profile Website built with Laravel 10.', images: ['Screenshot (169).png', 'Screenshot (170).png', 'Screenshot (171).png'], tech: ['Laravel', 'Breeze', 'Tailwind'] },
        { title: 'Sistem Informasi CRM', description: 'Sistem Informasi CRM built with Laravel 8.', images: ['1685954946989.jpeg'], tech: ['Laravel', 'AdminLT', 'MySQL'] },
        { title: 'Glow Aesthetics Clinic', description: 'Clinic Profile Website built with Wordpress.', images: ['glow.indristudio.com_ (2).png', 'glow.indristudio.com_gallery_.png'], tech: ['Wordpress', 'Kadence', 'Elementor'] },
        { title: 'Manajemen User', description: 'User Management & Payment Gateway built with Golang & Vue.', images: ['WhatsApp Image 2025-09-17 at 14.21.43_5edee526.jpg', 'localhost_5173_login.png'], tech: ['Golang', 'Vue JS', 'Payment Gateway'] },
        { title: 'BGentertaiment Landing', description: 'Landing Page built with Astro JS & Tailwind CSS.', images: ['bgcosentertaiment.vercel.app_.png', 'bgcosentertaiment.vercel.app_ (1).png'], tech: ['Astro JS', 'Tailwind', 'Vercel'] },
        { title: 'Makandeket', description: 'a website used to search for restaurant recommendations in the area.', images: ['makandeket.com_.png', 'makandeket.com_restoran.png'], tech: ['Laravel', 'Bootstrap 5', 'MySQL'] },
        { title: 'Aratu no Matsuri', description: 'Landing Page & Portofolio Website Event Organizer to introduce about Aratu no Matsuri & Arashi Project. Built using NuxtJS as Frontend and ExpressJS as Backend', images: ['arashi-project.vercel.app_.png'], tech: ['Nuxt JS', 'Tailwind', 'Express JS', 'Vercel'] },
        { title: 'SIPETANI', description: 'A website for a farmer product forecasting system using the Holt Winters & Stock Recommendation method. Built using Laravel 12.', images: ['sipetani.project-kevin.my.id_dashboard.png', 'sipetani.project-kevin.my.id_hasil-peramalan_product_id=all&tipe_periode=bulanan.png'], tech: ['Laravel', 'Tailwind', 'MySQL', 'Cloudfare Tunnel'] },
        { title: 'ERP POS SaaS', description: 'SaaS ERP & POS built in Laravel 13 with Livewire with MySQL Database.', images: ['erp-project.test_login.png', 'erp-project.test_login (1).png', 'erp-project.test_pos.png', 'erp-project.test_pos (1).png'], tech: ['Laravel', 'Livewire', 'Tailwind', 'MySQL'] },
        { title: 'Slam Team', description: 'Slam Team is a profile and management website for SLAM shooting club members.', images: ['slamteam.vercel.app_.png'], tech: ['Laravel', 'Angular JS', 'Tailwind', 'MySQL'] }
      ]
    };
  }
}
