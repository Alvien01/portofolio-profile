import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  author?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultTitle = 'Alfin Ardiansyah | Fullstack Web Developer & SEO Specialist';
  private defaultDescription = 'Portfolio resmi Alfin Ardiansyah - Fullstack Web Developer berpengalaman dengan keahlian Laravel, Angular, Express.js, RESTful API, dan SEO Optimization.';
  private defaultKeywords = 'Alfin Ardiansyah, Web Developer, Fullstack Developer, Laravel, Angular, Express.js, TypeScript, SEO Specialist, ITN Malang, Portfolio Alfin';
  private defaultImage = 'https://portofolio-alfin.site/profile.jpg';
  private defaultUrl = 'https://portofolio-alfin.site/';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private dom: Document
  ) {}

  /** Set comprehensive SEO metadata */
  updateSeoData(config: SeoConfig): void {
    const title = config.title || this.defaultTitle;
    const description = config.description || this.defaultDescription;
    const keywords = config.keywords || this.defaultKeywords;
    const image = config.image || this.defaultImage;
    const url = config.url || this.defaultUrl;
    const author = config.author || 'Alfin Ardiansyah';
    const type = config.type || 'website';

    // Page Title
    this.titleService.setTitle(title);

    // Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ name: 'author', content: author });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: type });
    this.metaService.updateTag({ property: 'og:site_name', content: 'Alfin Ardiansyah Portfolio' });
    this.metaService.updateTag({ property: 'og:locale', content: 'id_ID' });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: image });
    this.metaService.updateTag({ name: 'twitter:url', content: url });

    // Update Canonical URL
    this.setCanonicalUrl(url);
  }

  /** Dynamically set canonical link tag in head */
  setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.dom.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
