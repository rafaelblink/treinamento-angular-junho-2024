import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Pessoa } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'app-profile-create-update',
  templateUrl: './profile-create-update.component.html',
  styleUrls: ['./profile-create-update.component.css']
})
export class ProfileCreateUpdateComponent {
  profileId: String;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService, 
    private router: Router
    ) {
    this.profileId = route.snapshot.params['id'];
  }
  
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    age: new FormControl(0, [Validators.required, Validators.min(0)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    ativo: new FormControl(false),
    pais: new FormControl('', Validators.required),
    nivelExperiencia: new FormControl(0, [Validators.required, Validators.min(0)])
  })

  ngOnInit() {
    if (this.profileId) {
      this.profileService.buscarPorId(Number(this.profileId)).subscribe((profile: Pessoa) => {
        this.profileForm.patchValue({
          name: profile.name,
          role: profile.role,
          age: profile.age,
          email: profile.email,
          ativo: profile.ativo,
          pais: profile.pais,
          nivelExperiencia: profile.nivelExperiencia
        });
      });
    }
  }

  onSubmit() {
    const profile = this.profileForm.value as Pessoa;
    // console.log(profile)
    this.profileService.cadastrar(profile).subscribe(result => {
      // console.log(result)
      Swal.fire({
        title: 'Pessoa cadastrada com sucesso!',
        text: 'PARABENS!!',
        icon: 'success',
      })
      this.router.navigateByUrl('/profile')
    });
  }
}
