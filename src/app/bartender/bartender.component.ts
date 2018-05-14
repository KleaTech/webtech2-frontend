import {Component, OnInit, ViewChild} from '@angular/core';
import {BartenderModel} from './bartender.model';
import {BartenderService} from './bartender.service';

@Component({
  selector: 'app-bartender',
  providers: [BartenderService],
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.css']
})
export class BartenderComponent implements OnInit {

  errorMessage: string;
  @ViewChild('orderChild') order;
  bartenders: BartenderModel[];
  name: string;

  constructor(private bartenderService: BartenderService) { }

  getBartenders() {
    this.bartenderService.list().subscribe(
      bartenders => this.bartenders = bartenders,
      error => this.errorMessage = error
    );
  }

  onAddClicked() {
    console.log('Adding bartender: ' + this.name);
    this.bartenderService.add(new BartenderModel(this.name, null)).subscribe(
      response => {
        console.log(response);
        if (response === 'Success') { this.getBartenders(); }
      }
    );
  }

  ngOnInit() {
    this.getBartenders();
  }

}
