import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  LucideAngularModule,
  LayoutDashboard,
  User,
  Sparkles,
  GraduationCap,
  Briefcase,
  Wrench,
  Award,
  Folder,
  Globe,
  LogOut,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Pencil,
  X,
  Zap,
  Check,
  Eye,
  FileText,
  Image,
  Upload
} from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { PortfolioService } from '../../services/portfolio.service';
import {
  PortfolioData,
  Profile,
  Highlight,
  Education,
  Experience,
  Skill,
  Certificate,
  Project
} from '../../models/portfolio.model';

type AdminTab = 'overview' | 'profile' | 'highlights' | 'education' | 'experiences' | 'skills' | 'certificates' | 'projects';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  // SVG Icons
  readonly LayoutDashboard = LayoutDashboard;
  readonly User = User;
  readonly Sparkles = Sparkles;
  readonly GraduationCap = GraduationCap;
  readonly Briefcase = Briefcase;
  readonly Wrench = Wrench;
  readonly Award = Award;
  readonly Folder = Folder;
  readonly Globe = Globe;
  readonly LogOut = LogOut;
  readonly RefreshCw = RefreshCw;
  readonly Save = Save;
  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Pencil = Pencil;
  readonly X = X;
  readonly Zap = Zap;
  readonly Check = Check;
  readonly Eye = Eye;
  readonly FileText = FileText;
  readonly Image = Image;
  readonly Upload = Upload;

  activeTab: AdminTab = 'overview';
  
  portfolio: PortfolioData | null = null;
  private portfolioSub?: Subscription;

  // Feedback notifications
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  isSaving: boolean = false;

  // Image previews
  profileImagePreview: string | null = null;
  aboutImagePreview: string | null = null;
  skillImagePreview: string | null = null;
  certificateImagePreview: string | null = null;

  // Edit / Form state models
  profileForm: Profile = {
    name: '',
    hero_tagline: '',
    about_title: '',
    about_text_1: '',
    about_text_2: '',
    connect_text: '',
    profile_image: '',
    about_image: '',
    resume_url: ''
  };

  // Highlights form
  newHighlightName: string = '';
  newHighlightSortOrder: number = 0;

  // Education modal
  showEducationModal: boolean = false;
  editingEducationId: number | null = null;
  educationForm: Education = { period: '', title: '', sub_title: '', sort_order: 0 };

  // Experience modal
  showExperienceModal: boolean = false;
  editingExperienceId: number | null = null;
  experienceForm: Experience = { period: '', is_current: false, title: '', company: '', sort_order: 0 };

  // Skill modal
  showSkillModal: boolean = false;
  editingSkillId: number | null = null;
  skillForm: Skill = { name: '', image_url: '', category: 'skill', sort_order: 0 };

  // Certificate modal
  showCertificateModal: boolean = false;
  editingCertificateId: number | null = null;
  certificateForm: Certificate = { title: '', image_url: '', issue_date: '', description: '', sort_order: 0 };

  // Project modal
  showProjectModal: boolean = false;
  editingProjectId: number | null = null;
  projectForm: {
    title: string;
    description: string;
    tech_input: string; // comma-separated for easier input
    images: string[];
    sort_order: number;
  } = {
    title: '',
    description: '',
    tech_input: '',
    images: [],
    sort_order: 0
  };
  projectImagePreviews: { name: string; url: string }[] = [];

  // Delete Confirmation Modal
  showDeleteModal: boolean = false;
  deleteTargetType: 'highlight' | 'education' | 'experience' | 'skill' | 'certificate' | 'project' | null = null;
  deleteTargetId: number | null = null;
  deleteTargetTitle: string = '';
  isDeleting: boolean = false;

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.portfolioSub = this.portfolioService.getPortfolio().subscribe(data => {
      if (data) {
        this.portfolio = data;
        if (data.profile) {
          this.profileForm = { ...data.profile };
        }
      }
    });

    // Make sure we fetch fresh data on dashboard entry
    this.portfolioService.loadPortfolio(true);
  }

  ngOnDestroy() {
    this.portfolioSub?.unsubscribe();
  }

  setTab(tab: AdminTab) {
    this.activeTab = tab;
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  refreshData() {
    this.portfolioService.loadPortfolio(true);
    this.showToast('Data diperbarui dari server', 'success');
  }

  // ===================== PROFILE & IMAGE UPLOADS =====================
  onProfileImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.profileForm.profile_image = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.showToast(`Gambar dipilih: ${file.name}. Pastikan file ada di folder public/`, 'success');
    }
  }

  onAboutImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.profileForm.about_image = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.aboutImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.showToast(`Gambar dipilih: ${file.name}. Pastikan file ada di folder public/`, 'success');
    }
  }

  onResumeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.profileForm.resume_url = file.name;
      this.showToast(`File CV dipilih: ${file.name}. Pastikan file ada di folder public/`, 'success');
    }
  }

  saveProfile() {
    this.isSaving = true;
    this.authService.updateProfile(this.profileForm).subscribe({
      next: () => {
        this.isSaving = false;
        this.showToast('Profile berhasil disimpan!', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.isSaving = false;
        this.showToast(err?.error?.message || 'Gagal menyimpan profile', 'error');
      }
    });
  }

  // ===================== HIGHLIGHTS =====================
  addHighlight() {
    if (!this.newHighlightName.trim()) {
      this.showToast('Nama highlight tidak boleh kosong', 'error');
      return;
    }
    this.isSaving = true;
    const payload = {
      name: this.newHighlightName.trim(),
      sort_order: this.newHighlightSortOrder || ((this.portfolio?.highlights?.length || 0) + 1)
    };
    this.authService.addHighlight(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.newHighlightName = '';
        this.newHighlightSortOrder = 0;
        this.showToast('Highlight berhasil ditambahkan!', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.isSaving = false;
        this.showToast(err?.error?.message || 'Gagal menambahkan highlight', 'error');
      }
    });
  }

  deleteHighlight(id: number | undefined) {
    if (!id || !confirm('Hapus highlight ini?')) return;
    this.authService.deleteHighlight(id).subscribe({
      next: () => {
        this.showToast('Highlight berhasil dihapus', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.showToast(err?.error?.message || 'Gagal menghapus highlight', 'error');
      }
    });
  }

  // ===================== EDUCATION =====================
  openAddEducation() {
    this.editingEducationId = null;
    this.educationForm = {
      period: '',
      title: '',
      sub_title: '',
      sort_order: (this.portfolio?.education?.length || 0) + 1
    };
    this.showEducationModal = true;
  }

  openEditEducation(edu: Education) {
    this.editingEducationId = edu.id || null;
    this.educationForm = { ...edu };
    this.showEducationModal = true;
  }

  saveEducation() {
    if (!this.educationForm.period || !this.educationForm.title || !this.educationForm.sub_title) {
      this.showToast('Semua field pendidikan wajib diisi', 'error');
      return;
    }
    this.isSaving = true;
    const req = this.editingEducationId
      ? this.authService.updateEducation(this.editingEducationId, this.educationForm)
      : this.authService.addEducation(this.educationForm);

    req.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEducationModal = false;
        this.showToast('Riwayat pendidikan berhasil disimpan!', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.isSaving = false;
        this.showToast(err?.error?.message || 'Gagal menyimpan pendidikan', 'error');
      }
    });
  }

  deleteEducation(id: number | undefined) {
    if (!id || !confirm('Hapus riwayat pendidikan ini?')) return;
    this.authService.deleteEducation(id).subscribe({
      next: () => {
        this.showToast('Riwayat pendidikan berhasil dihapus', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.showToast(err?.error?.message || 'Gagal menghapus pendidikan', 'error');
      }
    });
  }

  // ===================== EXPERIENCES =====================
  openAddExperience() {
    this.editingExperienceId = null;
    this.experienceForm = {
      period: '',
      is_current: false,
      title: '',
      company: '',
      sort_order: (this.portfolio?.experiences?.length || 0) + 1
    };
    this.showExperienceModal = true;
  }

  openEditExperience(exp: Experience) {
    this.editingExperienceId = exp.id || null;
    this.experienceForm = {
      ...exp,
      is_current: Boolean(exp.is_current)
    };
    this.showExperienceModal = true;
  }

  saveExperience() {
    if (!this.experienceForm.period || !this.experienceForm.title || !this.experienceForm.company) {
      this.showToast('Semua field pengalaman wajib diisi', 'error');
      return;
    }
    this.isSaving = true;
    const payload = {
      ...this.experienceForm,
      is_current: this.experienceForm.is_current ? 1 : 0
    };
    const req = this.editingExperienceId
      ? this.authService.updateExperience(this.editingExperienceId, payload)
      : this.authService.addExperience(payload);

    req.subscribe({
      next: () => {
        this.isSaving = false;
        this.showExperienceModal = false;
        this.showToast('Pengalaman kerja berhasil disimpan!', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.isSaving = false;
        this.showToast(err?.error?.message || 'Gagal menyimpan pengalaman', 'error');
      }
    });
  }

  deleteExperience(id: number | undefined) {
    if (!id || !confirm('Hapus pengalaman kerja ini?')) return;
    this.authService.deleteExperience(id).subscribe({
      next: () => {
        this.showToast('Pengalaman kerja berhasil dihapus', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.showToast(err?.error?.message || 'Gagal menghapus pengalaman', 'error');
      }
    });
  }

  // ===================== SKILLS =====================
  onSkillImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.skillForm.image_url = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.skillImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.showToast(`Logo skill dipilih: ${file.name}. Pastikan file ada di folder public/`, 'success');
    }
  }

  openAddSkill() {
    this.editingSkillId = null;
    this.skillImagePreview = null;
    this.skillForm = {
      name: '',
      image_url: '',
      category: 'skill',
      sort_order: (this.portfolio?.skills?.length || 0) + 1
    };
    this.showSkillModal = true;
  }

  openEditSkill(skill: Skill) {
    this.editingSkillId = skill.id || null;
    this.skillImagePreview = null;
    this.skillForm = { ...skill };
    this.showSkillModal = true;
  }

  saveSkill() {
    if (!this.skillForm.name || !this.skillForm.image_url) {
      this.showToast('Nama dan gambar/logo skill wajib dipilih', 'error');
      return;
    }
    this.isSaving = true;
    const req = this.editingSkillId
      ? this.authService.updateSkill(this.editingSkillId, this.skillForm)
      : this.authService.addSkill(this.skillForm);

    req.subscribe({
      next: () => {
        this.isSaving = false;
        this.showSkillModal = false;
        this.showToast('Skill berhasil disimpan!', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.isSaving = false;
        this.showToast(err?.error?.message || 'Gagal menyimpan skill', 'error');
      }
    });
  }

  deleteSkill(id: number | undefined) {
    if (!id || !confirm('Hapus skill ini?')) return;
    this.authService.deleteSkill(id).subscribe({
      next: () => {
        this.showToast('Skill berhasil dihapus', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.showToast(err?.error?.message || 'Gagal menghapus skill', 'error');
      }
    });
  }

  // ===================== CERTIFICATES =====================
  onCertificateImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.certificateForm.image_url = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.certificateImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.showToast(`Gambar sertifikat dipilih: ${file.name}. Pastikan file ada di folder public/`, 'success');
    }
  }

  openAddCertificate() {
    this.editingCertificateId = null;
    this.certificateImagePreview = null;
    this.certificateForm = {
      title: '',
      image_url: '',
      issue_date: '',
      description: '',
      sort_order: (this.portfolio?.certificates?.length || 0) + 1
    };
    this.showCertificateModal = true;
  }

  openEditCertificate(cert: Certificate) {
    this.editingCertificateId = cert.id || null;
    this.certificateImagePreview = null;
    this.certificateForm = { ...cert };
    this.showCertificateModal = true;
  }

  saveCertificate() {
    if (!this.certificateForm.title || !this.certificateForm.image_url) {
      this.showToast('Judul dan gambar sertifikat wajib dipilih', 'error');
      return;
    }
    this.isSaving = true;
    const req = this.editingCertificateId
      ? this.authService.updateCertificate(this.editingCertificateId, this.certificateForm)
      : this.authService.addCertificate(this.certificateForm);

    req.subscribe({
      next: () => {
        this.isSaving = false;
        this.showCertificateModal = false;
        this.showToast('Sertifikat berhasil disimpan!', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.isSaving = false;
        this.showToast(err?.error?.message || 'Gagal menyimpan sertifikat', 'error');
      }
    });
  }

  deleteCertificate(id: number | undefined) {
    if (!id || !confirm('Hapus sertifikat ini?')) return;
    this.authService.deleteCertificate(id).subscribe({
      next: () => {
        this.showToast('Sertifikat berhasil dihapus', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.showToast(err?.error?.message || 'Gagal menghapus sertifikat', 'error');
      }
    });
  }

  // ===================== PROJECTS =====================
  onProjectImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFilesCount = input.files.length;
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        if (!this.projectForm.images.includes(file.name)) {
          this.projectForm.images.push(file.name);
          const reader = new FileReader();
          reader.onload = (e) => {
            this.projectImagePreviews.push({
              name: file.name,
              url: e.target?.result as string
            });
          };
          reader.readAsDataURL(file);
        }
      }
      this.showToast(`${newFilesCount} gambar dipilih untuk project. Pastikan file ada di folder public/`, 'success');
      input.value = '';
    }
  }

  removeProjectImage(index: number) {
    const removedName = this.projectForm.images[index];
    this.projectForm.images.splice(index, 1);
    const prevIndex = this.projectImagePreviews.findIndex(p => p.name === removedName);
    if (prevIndex !== -1) {
      this.projectImagePreviews.splice(prevIndex, 1);
    }
  }

  getProjectImageUrl(imageName: string): string {
    const preview = this.projectImagePreviews.find(p => p.name === imageName);
    return preview ? preview.url : imageName;
  }

  openAddProject() {
    this.editingProjectId = null;
    this.projectImagePreviews = [];
    this.projectForm = {
      title: '',
      description: '',
      tech_input: '',
      images: [],
      sort_order: (this.portfolio?.projects?.length || 0) + 1
    };
    this.showProjectModal = true;
  }

  openEditProject(project: Project) {
    this.editingProjectId = project.id || null;
    this.projectImagePreviews = [];
    this.projectForm = {
      title: project.title,
      description: project.description || '',
      tech_input: (project.tech || []).join(', '),
      images: [...(project.images || [])],
      sort_order: project.sort_order || 0
    };
    this.showProjectModal = true;
  }

  saveProject() {
    if (!this.projectForm.title) {
      this.showToast('Judul project wajib diisi', 'error');
      return;
    }
    this.isSaving = true;

    const techArray = this.projectForm.tech_input
      ? this.projectForm.tech_input.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const payload = {
      title: this.projectForm.title,
      description: this.projectForm.description,
      tech: techArray,
      images: this.projectForm.images,
      sort_order: this.projectForm.sort_order
    };

    const req = this.editingProjectId
      ? this.authService.updateProject(this.editingProjectId, payload)
      : this.authService.addProject(payload);

    req.subscribe({
      next: () => {
        this.isSaving = false;
        this.showProjectModal = false;
        this.showToast('Project berhasil disimpan!', 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.isSaving = false;
        this.showToast(err?.error?.message || 'Gagal menyimpan project', 'error');
      }
    });
  }

  // ===================== MODAL DELETE CONFIRMATION =====================
  openDeleteConfirm(
    type: 'highlight' | 'education' | 'experience' | 'skill' | 'certificate' | 'project',
    id: number | undefined,
    title: string
  ) {
    if (!id) return;
    this.deleteTargetType = type;
    this.deleteTargetId = id;
    this.deleteTargetTitle = title;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.deleteTargetType = null;
    this.deleteTargetId = null;
    this.deleteTargetTitle = '';
    this.isDeleting = false;
  }

  executeDelete() {
    if (!this.deleteTargetType || !this.deleteTargetId) return;
    this.isDeleting = true;

    let req;
    switch (this.deleteTargetType) {
      case 'highlight':
        req = this.authService.deleteHighlight(this.deleteTargetId);
        break;
      case 'education':
        req = this.authService.deleteEducation(this.deleteTargetId);
        break;
      case 'experience':
        req = this.authService.deleteExperience(this.deleteTargetId);
        break;
      case 'skill':
        req = this.authService.deleteSkill(this.deleteTargetId);
        break;
      case 'certificate':
        req = this.authService.deleteCertificate(this.deleteTargetId);
        break;
      case 'project':
        req = this.authService.deleteProject(this.deleteTargetId);
        break;
    }

    req?.subscribe({
      next: () => {
        this.isDeleting = false;
        const itemType = this.deleteTargetType;
        this.cancelDelete();
        this.showToast(`Data ${itemType} berhasil dihapus!`, 'success');
        this.portfolioService.loadPortfolio(true);
      },
      error: (err) => {
        this.isDeleting = false;
        this.showToast(err?.error?.message || 'Gagal menghapus data', 'error');
      }
    });
  }
}
