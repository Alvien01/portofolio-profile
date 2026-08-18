import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/public-layout/public-layout.component').then(m => m.PublicLayoutComponent) 
  },
  { 
    path: 'admin/login', 
    loadComponent: () => import('./components/admin/login.component').then(m => m.AdminLoginComponent) 
  },
  { 
    path: 'admin/dashboard', 
    loadComponent: () => import('./components/admin/dashboard.component').then(m => m.AdminDashboardComponent) 
  },
  { path: '**', redirectTo: '' }
];
