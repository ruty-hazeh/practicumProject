// import { Component, OnInit } from '@angular/core';
// import { SongService } from '../../services/song.service';
// import { Song } from '../../models/song';
// import { SongFormComponent } from '../song-form/song-form.component';
// import { CommonModule } from '@angular/common';
// @Component({
//   standalone: true,
//   imports: [SongFormComponent,CommonModule],
//   selector: 'app-song-list',
//   templateUrl: './song-list.component.html',
// })
// export class SongListComponent implements OnInit {
//   songs: Song[] = [];

//   constructor(private songService: SongService) {}

//   ngOnInit(): void {
//     this.loadSongs();
//   }

//   loadSongs(): void {
//     this.songService.getAll().subscribe(data => {
//       this.songs = data;
//       console.log('שירים שהתקבלו:', this.songs);
//     });
//   }

//   deleteSong(id: number, fileName: string) {
//     this.songService.delete(id).subscribe(() => {
//       this.songService.deleteFile(fileName).subscribe(() => this.loadSongs());
//     });
//   }

//   download(fileName: string) {
//     this.songService.downloadFile(fileName).subscribe(blob => {
//       const a = document.createElement('a');
//       a.href = URL.createObjectURL(blob);
//       a.download = fileName;
//       a.click();
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';
import { SongFormComponent } from '../song-form/song-form.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [SongFormComponent, CommonModule],
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  songToEdit: Song | null = null;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.songService.getAll().subscribe(data => {
      this.songs = data;
      console.log('שירים שהתקבלו:', this.songs);
    });
  }

  deleteSong(id: number, fileName: string) {
    this.songService.delete(id).subscribe(() => {
      this.songService.deleteFile(fileName).subscribe(() => this.loadSongs());
    });
    this.loadSongs();
  }

  download(fileName: string) {
    this.songService.downloadFile(fileName).subscribe(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
    });
  }

  editSong(song: Song) {
    this.songToEdit = { ...song }; // יוצרים עותק כדי לערוך מבלי להשפיע מיידית
  }

  onRefresh() {
    this.songToEdit = null; // מאפסים את העריכה
    this.loadSongs();
  }
}

