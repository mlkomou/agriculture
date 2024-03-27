import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LanguageService {
  public languages: string[] = ['fr', 'en'];
  curentLang;
  defaultLang = 'fr';

  constructor(public translate: TranslateService) {
    let browserLang: string;
    translate.addLangs(this.languages);
    browserLang = navigator.language.substring(0, 2);
    this.curentLang = navigator.language.substring(0, 2);
    translate.use(browserLang);

    // translate.use(browserLang.match(/fr|en/) ? browserLang : 'fr');
  }

  public setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.curentLang = lang;
    this.translate.use(lang);
    // localStorage.setItem('lang', lang);
  }

  getCurrentLanguage(): string {
    return navigator.language.substring(0, 2);
  }
}
