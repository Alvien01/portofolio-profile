import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CertificatesComponent } from '../certificates/certificates.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { PortfolioService } from '../../services/portfolio.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    CertificatesComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss'
})
export class PublicLayoutComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  constructor(
    private portfolioService: PortfolioService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.sub = this.portfolioService.getPortfolio().subscribe(data => {
      if (data && data.profile) {
        this.seoService.updateSeoData({
          title: `${data.profile.name} | Fullstack Web Developer & SEO Specialist`,
          description: data.profile.hero_tagline || 'Portfolio resmi Alfin Ardiansyah - Fullstack Web Developer.',
          image: data.profile.profile_image
            ? (data.profile.profile_image.startsWith('http')
                ? data.profile.profile_image
                : `https://portofolio-alfin.site/${data.profile.profile_image}`)
            : undefined
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
