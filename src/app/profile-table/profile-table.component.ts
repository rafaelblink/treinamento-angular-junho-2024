import { Component, Input } from '@angular/core';
import { Pessoa } from '../interfaces/menu-item';
import Swal from 'sweetalert2';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.css']
})
export class ProfileTableComponent {
  @Input() profiles: Pessoa[] = [];

  constructor(private profileService: ProfileService) {}

  deleteProfile(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.excluir(id).subscribe(() => {
          this.profiles = this.profiles.filter((profile: any) => profile.id !== id);
          Swal.fire(
            'Excluído!',
            'O contato foi excluído.',
            'success'
          );
        });
      }
    });
}
}
