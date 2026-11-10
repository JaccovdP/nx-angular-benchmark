import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib093Component, summary$ } from '@bench/lib-093';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib093Component, AsyncPipe, JsonPipe],
  template: `<h1>app-003</h1><p>{{ summary$ | async | json }}</p><bench-lib-093 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
