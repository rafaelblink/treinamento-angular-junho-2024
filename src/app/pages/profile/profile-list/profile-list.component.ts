import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {
  constructor(private profileService: ProfileService) {}
  profiles: any;

  ngOnInit() { //
    this.profileService.buscarTodos().subscribe(result => {
      this.profiles = result;
    }, error => {
      console.error(error);
    });
  }
  // deleteProfile(id: number) {
  //   this.profileService.excluir(id).subscribe(() => {
  //   this.profiles = this.profiles.filter((profile: any) =>
  //   profile.id !== id);
  //   });
  // }
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
