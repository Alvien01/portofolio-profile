import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent {
  certificates = [
    {
      title: 'Full Stack Developer Intership - Jitu Property', image: '1726059585873.jpeg',},
    { title: 'Peserta IFFES IOT - ITN Malang', image: 'Screenshot (160).png' },
    { title: 'Getting Started with Node-Red HTTP  - Indobot', image: 'Screenshot (157).png' },
    { title: 'Coding Camp Laravel Class - HariSenin', image: 'CodingCamp.png' },
    { title: 'Asisten Labolatorium Mobile Programming - ITN Malang', image: 'Sertifikat Aslab.jpg' },
    { title: 'Koordinator Praktikum Pemrograman Visual - ITN Malang', image: 'Sertifikat Koor Praktikum.jpg' },
  ];

  selectedCertificate: any = null;

  openModal(cert: any) {
    this.selectedCertificate = cert;
  }

  closeModal() {
    this.selectedCertificate = null;
  }
}
