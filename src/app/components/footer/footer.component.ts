import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Github, Linkedin, Instagram, X } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly Github = Github;
  readonly Linkedin = Linkedin;
  readonly Instagram = Instagram;
  readonly X = X;
  
  showModal: boolean = false;
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  openModal() {
    this.showModal = true;
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }
  
  closeModal() {
    this.showModal = false;
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }
  
  handleLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Silakan isi email dan password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Backend endpoint POST /api/admin/login requires { email, password }
    this.authService.login({ email: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.token) {
          this.closeModal();
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Login gagal. Periksa kembali email dan password.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error:', err);
        this.errorMessage = err?.error?.message || 'Login gagal. Periksa kredensial akun Anda.';
      }
    });
  }
}