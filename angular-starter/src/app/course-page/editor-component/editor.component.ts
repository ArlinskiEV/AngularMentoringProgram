import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';

import * as Quill from 'quill';
import * as katex from 'katex';

@Component({
  selector: 'test-editor',
  styleUrls: ['./editor.styles.css'],
  templateUrl: './editor.template.html',
})

export class EditorComponent implements OnInit, OnDestroy {
  public quill;

  constructor(private cdRef: ChangeDetectorRef) {}

  public ngOnInit() {

    const container = document.getElementById('editor');
    this.quill = new Quill(container, {theme: 'snow'});

    // this.quill.on('editor-change', function(eventName, ...args) {
    //   if (eventName === 'text-change') {
    //     // args[0] will be delta
    //   } else if (eventName === 'selection-change') {
    //     // args[0] will be old range
    //   }
    // });

    // window['katex'] = katex;

  }

  public set() {
    this.quill.setContents([
      { insert: 'Hello', attributes: { bold: true } },
      { insert: '\n', attributes: { align: 'center' } },
      // { insert: { formula: 'x^2' } },
      { insert: '\n', attributes: { align: 'center' } },
      { insert: 'World', attributes: { italic: true }},
      { insert: '\n', attributes: { align: 'center' } }
    ]);
  }

  public set2() {
    this.quill.setContents([{
      insert: {
        image: 'https://imgur.com/'
      },
      attributes: {
        duration: 600
      }
    }, {
      insert: 'Hello',
      attributes: {
        alt: 'Funny cat photo'
      }
    }, {
      insert: {
        video: 'https://youtube.com/'
      },
      attributes: {
        bold: true
      }
    }]);
  }

  public log() {
    console.log('------------------------------------------------');
    console.log(this.quill.getContents());
    console.log('------------------------------------------------');
  }

  public log2() {
    console.log('------------------------------------------------');
    console.log(this.quill.getText());
    console.log('------------------------------------------------');
  }

  public getHtml() {
    console.log(this.quillGetHTML());
  }

  public ngOnDestroy() {
    this.log();
  }

  private quillGetHTML() {
    const container = document.getElementById('editor');
    return container.getElementsByClassName('ql-editor')[0].innerHTML;
  }

}
