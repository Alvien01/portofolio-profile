import { Component } from '@angular/core';

import { LucideAngularModule, Github, Linkedin, Instagram } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly Github = Github;
  readonly Linkedin = Linkedin;
  readonly Instagram = Instagram;
}
