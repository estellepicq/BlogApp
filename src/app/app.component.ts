import { Component } from '@angular/core';

import { Post } from './post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts: Post[];

  constructor() {
    this.posts = [
      {
        title: 'Toulouse: il se fait abattre de 46 balles dans le corps pour avoir demandé un pain au chocolat',
        content: 'C’est une histoire qu’on préférerait être une blague. Mais la tragédie, elle, est bien réelle. Hier aux alentours de 16H15, dans une boulangerie du centre ville de Toulouse, Benjamin Malot, un jeune touriste parisien de 26 ans a été brutalement mis à mort. Son crime ? Avoir demandé à la boulangère un « pain au chocolat » et non une « chocolatine » comme on l’appelle dans le Sud-Ouest.',
        loveIts: 3,
        created_at: '20/03/2013'
      },
      {
        title: '91% des octogénaires favorables à ce que vous répétiez ce que vous venez de dire',
        content: 'Des sociologues ont récemment démontré que l’immense majorité des octogénaires est d’accord pour dire qu’il faut que vous répétiez ce que vous venez d’exprimer.',
        loveIts: -1,
        created_at: '19/06/2018'
      },
      {
        title: 'Malgré les avertissements, il court à la piscine : 86 morts',
        content: 'Villejuif – Ce mardi, un individu au bord d’une piscine se serait mis à courir malgré l’interdiction et aurait ainsi provoqué la mort de 86 personnes.',
        loveIts: 0,
        created_at: '16/12/2016'
      }
    ]
  }

}
