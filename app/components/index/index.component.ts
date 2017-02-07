import {
  Component,
  Input
} from '@angular/core';

/* shared */
import {
  CONFIG
} from '../../shared/config';
import {
  CarouselComponent
} from '../commons/carousel';
import {
  PropertyFinderApi
} from '../../shared/propertyfinder';

@Component({
  selector: 'index',
  templateUrl: 'app/components/index/' + CONFIG.MIN + 'index.component.html',
  styleUrls: ['app/components/index/index.component.css']
})
export class IndexComponent {
  constructor(private _propertyFinderApi : PropertyFinderApi) {
    window.addEventListener("DOMContentLoaded", function(event) {
     console.log("DOM fully loaded and parsed");
   })
  }

  private _carousel;
  private _data = [];

  ngOnInit() {
    let self = this;

    let interval = setInterval(function() {
      if(document.readyState === 'complete') {
        clearInterval(interval);
        self.getData.call(self);
      }
    }, 1000);
  }

  getData() {
    let self = this;
    this._propertyFinderApi.getOne()
    .subscribe(response => {
      response()
      .done(response => {
        self._data      = response.data;
        self._carousel  = new CarouselComponent({numSlides: response.data.length});
      })
      .fail(error => {

      })
    })
  }

  next() {
    this._carousel.next();
  }

  previous() {
    this._carousel.previous();
  }
}
