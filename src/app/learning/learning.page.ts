import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ApiService} from "../api.service";
import {VideoModele} from "./video-modele";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {
videos: VideoModele[] = [];
  constructor(private modalCtrl: ModalController,
              private apiService: ApiService,
              public _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideoPath(id: string) {
    return "https://www.youtube.com/embed/" + id;
  }

  getVideos() {
    this.apiService.getVideos().subscribe((res) => {
      if (res.ok) {
        this.videos = res.data;
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
