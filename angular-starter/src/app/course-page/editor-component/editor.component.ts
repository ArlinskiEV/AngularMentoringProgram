import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

import * as Quill from 'quill';

@Component({
  selector: 'test-editor',
  styleUrls: ['./editor.styles.css'],
  templateUrl: './editor.template.html',
})

export class EditorComponent implements OnInit {
  public quill;

  constructor(private cdRef: ChangeDetectorRef) {}

  public ngOnInit() {

    const container = document.getElementById('editor');
    this.quill = new Quill(container, {theme: 'snow'});
  }

}
