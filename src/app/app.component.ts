import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeServiceService } from './shared/components/theme-service.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
	theme: 'dark' | 'light' = 'dark';
	themeSub: Subscription = new Subscription();

	constructor(
		private themeService: ThemeServiceService
	) {
		this.theme = this.themeService.getThemePreference();
		this.themeSub = this.themeService.onThemeChange.subscribe(theme => {
			if (theme) {
				this.theme = theme;
			}
		});
	}

	ngOnDestroy(): void {
		if (this.themeSub) {
			this.themeSub.unsubscribe();
		}
	}
}
