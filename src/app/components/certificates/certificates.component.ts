import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';
import { Certificate } from '../../models/portfolio.model';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit, OnDestroy {
  certificates: Certificate[] = [];
  selectedCertificate: Certificate | null = null;
  private sub?: Subscription;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.sub = this.portfolioService.getPortfolio().subscribe(data => {
      this.certificates = data.certificates || [];
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openModal(cert: Certificate) {
    this.selectedCertificate = cert;
  }

  closeModal() {
    this.selectedCertificate = null;
  }
}
