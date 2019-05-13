import { Component } from "@angular/core";
import { UserService } from '../../services';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less']
})
export class HeaderComponent {
  constructor(public user: UserService) { }
}
