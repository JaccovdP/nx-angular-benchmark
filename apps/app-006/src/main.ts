import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib096Component, summary$ } from '@bench/lib-096';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib096Component, AsyncPipe, JsonPipe],
  template: `<h1>app-006</h1><p>{{ summary$ | async | json }}</p><bench-lib-096 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
