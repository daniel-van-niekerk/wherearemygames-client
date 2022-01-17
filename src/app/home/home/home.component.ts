import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeServiceService } from 'src/app/shared/components/theme-service.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	checked: boolean = true;
	themeSub: Subscription = new Subscription();
	theme!: 'dark' | 'light';
	logo = 'assets/images/logo-dark.png';

	constructor(
		private themeService: ThemeServiceService
	) {
		this.setThemeVariables(themeService.getThemePreference());

		this.themeSub = this.themeService.onThemeChange.subscribe(theme => {
			if (theme) {
				this.setThemeVariables(theme);
			}
		})
	}

	setThemeVariables(theme: 'dark' | 'light') {
		this.theme = theme;
		this.logo = theme === 'dark' ? 'assets/images/logo-dark.png' : 'assets/images/logo-light.png';
		this.checked = this.theme === 'dark';
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		if (this.themeSub) {
			this.themeSub.unsubscribe();
		}
	}

	onThemePreferenceSelected(event: Event) {
		const isChecked = (<HTMLInputElement>event.target).checked
		this.themeService.setThemePreference(isChecked ? 'dark' : 'light');
	}

}
