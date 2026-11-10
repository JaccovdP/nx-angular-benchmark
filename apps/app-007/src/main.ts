import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib097Component, summary$ } from '@bench/lib-097';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib097Component, AsyncPipe, JsonPipe],
  template: `<h1>app-007</h1><p>{{ summary$ | async | json }}</p><bench-lib-097 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
