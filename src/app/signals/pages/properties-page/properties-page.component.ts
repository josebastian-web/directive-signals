import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public counter = signal(10);
  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }`);

  public userChangeEffect = effect( () => {
    console.log( `${ this.user().first_name } - ${ this.counter() }`);
  });

  ngOnInit(): void {
    // Evidencia de que se autodestruye el effect
    /* setInterval( () => {
      this.counter.update( current => current + 1);
      if ( this.counter() == 15)
        this.userChangeEffect.destroy()
    }, 1000); */
  }

  ngOnDestroy(): void {
    /* this.userChangeEffect.destroy(); */
  }

  increaseBy( value: number ) {
    this.counter.update( current => current + value );
  }

  onFieldUpdated(field: keyof User, value: string) {
    /* this.user.set({
      ...this.user(),
      [field]: value,
    }) */

    /* this.user.update( current => ({
      ...current,
      [field]: value,
    })) */

    this.user.update( current => {

      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }

      return structuredClone(current);
    });
  }

}
