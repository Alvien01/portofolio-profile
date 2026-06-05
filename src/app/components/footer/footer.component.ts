import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LucideAngularModule, Github, Linkedin, Instagram, X } from 'lucide-angular';

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
  
  // You can add a button or link to open the modal from your component
  // For demonstration, let's open it automatically when component loads
  // or you can call this.openModal() from somewhere else
  
  ngOnInit() {
    // Uncomment if you want modal to open automatically
    // setTimeout(() => this.openModal(), 1000);
  }
  
  openModal() {
    this.showModal = true;
    this.username = '';
    this.password = '';
  }
  
  closeModal() {
    this.showModal = false;
    this.username = '';
    this.password = '';
  }
  
  handleLogin() {
    if (this.username && this.password) {
      console.log('Login attempt with:', { username: this.username, password: this.password });
      // Here you would typically call an authentication service
      alert(`Login attempted with username: ${this.username}`);
      this.closeModal();
    } else {
      alert('Please fill in both username and password fields');
    }
  }
}