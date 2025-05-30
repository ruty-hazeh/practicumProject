// import { Component, EventEmitter, Output } from '@angular/core';
// import { SongService } from '../../services/song.service';
// import { FormsModule } from '@angular/forms';
// @Component({
//   standalone: true,
//   imports: [FormsModule],
//   selector: 'app-song-form',
//   templateUrl: './song-form.component.html',
// })
// export class SongFormComponent {
//   name = '';
//   genre = '';
//   file: File | null = null;
//   @Output() refresh = new EventEmitter<void>();

//   constructor(private songService: SongService) {}

//   onFileChange(event: any) {
//     this.file = event.target.files[0];
//   }

//   submit() {
//     if (this.file) {
//       this.songService.uploadFile(this.file).subscribe(res => {
//         const song = {
//           name: this.name,
//           genre: this.genre,
//           fileName: this.file!.name,
//           url: res.url
//         };
//         this.songService.add(song).subscribe(() => this.refresh.emit());
//       });
//     }
//   }
// }


// import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
// import { SongService } from '../../services/song.service';
// import { FormsModule } from '@angular/forms';
// import { Song } from '../../models/song';
// import { CommonModule } from '@angular/common';
// import { SingerService } from '../../services/singer.service';
// import { Singer } from '../../models/singer';

// @Component({
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   selector: 'app-song-form',
//   templateUrl: './song-form.component.html',
//   styleUrls: ['./song-form.component.css']
// })
// export class SongFormComponent implements OnChanges {
//   @Input() songToEdit: Song | null = null;
//   @Output() refresh = new EventEmitter<void>();

//   name = '';
//   genre = '';
//   file: File | null = null;
//   singerId: number = 0;
//   selectedFileName = '';
//   singers: Singer[] = [];
//   constructor(private songService: SongService,private singerService:SingerService) {}

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['songToEdit'] && this.songToEdit) {
//       this.name = this.songToEdit.name;
//       this.genre = this.songToEdit.genre;
//       this.singerId = +this.songToEdit.singerId;
//       this.file = null;
//       this.selectedFileName = '';
//     } else if (changes['songToEdit'] && !this.songToEdit) {
//       this.clearForm();
//     }
//   }

//   onFileChange(event: any) {
//     this.file = event.target.files[0];
//     this.selectedFileName = this.file ? this.file.name : '';
    
//     if (this.file && !this.songToEdit) {
//       this.name = this.file.name;
//     }
//   }

//   resetForm() {
//     this.songToEdit = null;
//     this.clearForm();
//     this.refresh.emit();
//   }

//   submit() {
//     if (this.songToEdit) {
//       // עדכון שיר קיים
//       if (this.file) {
//         console.log(this.songToEdit.songUrl);
//         const oldFileName = this.songToEdit.songUrl.split('/').pop()!;
//         const encodedFileName = encodeURIComponent(oldFileName);
        
//         this.songService.deleteFile(encodedFileName).subscribe(() => {
//           this.songService.uploadFile(this.file!).subscribe(res => {
//             const updatedSong = {
//               ...this.songToEdit!,
//               name: this.file!.name,
//               genre: this.genre,
//               fileName: this.file!.name,
//               url: res.Url,
//               singerId: this.singerId
//             };
//             this.songService.update(this.songToEdit!.id, updatedSong).subscribe(() => {
//               this.clearForm();
//               this.refresh.emit();
//             });
//           });
//         });
//       } else {
//         // עדכון ללא שינוי קובץ
//         const updatedSong = {
//           ...this.songToEdit!,
//           name: this.name,
//           genre: this.genre,
//           singerId: this.singerId,
//         };
//         this.songService.update(this.songToEdit!.id, updatedSong).subscribe(() => {
//           this.clearForm();
//           this.refresh.emit();
//         });
//       }
//     } else {
//       // הוספת שיר חדש - מחייב קובץ
//       if (!this.file) {
//         alert('יש לבחור קובץ לפני הוספת שיר חדש!');
//         return;
//       }

//       this.songService.uploadFile(this.file).subscribe(res => {
//         const song = {
//           name: this.file!.name,
//           genre: this.genre,
//           fileName: this.file!.name,
//           url: res.Url,
//           singerId: this.singerId
//         };
//         this.songService.add(song).subscribe(() => {
//           this.clearForm();
//           this.refresh.emit();
//         });
//       });
//     }
//   }

//   clearForm() {
//     this.name = '';
//     this.genre = '';
//     this.file = null;
//     this.singerId = 0;
//     this.selectedFileName = '';
//     // לא מאפסים את songToEdit כאן כי זה Input מהקומפוננטה האב
    
//     // איפוס שדה הקובץ בHTML
//     const fileInput = document.getElementById('file') as HTMLInputElement;
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   }

//   // פונקציות עזר לתבנית
//   get isEditing(): boolean {
//     return this.songToEdit !== null;
//   }

//   get isFileRequired(): boolean {
//     return !this.songToEdit;
//   }

//   get hasSelectedFile(): boolean {
//     return this.selectedFileName !== '';
//   }

//   isFormValid(): boolean {
//     const hasRequiredFields = this.genre.trim() !== '' && this.singerId > 0;
//     const hasFileWhenNeeded = this.songToEdit !== null || this.file !== null;
//     return hasRequiredFields && hasFileWhenNeeded;
//   }
// }

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Song } from '../../models/song';
import { SongService } from '../../services/song.service';
import { SingerService } from '../../services/singer.service';
import { Singer } from '../../models/singer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-song-form',
  templateUrl: './song-form.component.html'
})
export class SongFormComponent implements OnChanges {
  @Input() selectedSong: Song | null = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() songSaved = new EventEmitter<void>();

  name: string = '';
  genre: string = '';
  singerName: string = '';
  file: File | null = null;
  selectedFileName: string = '';

  singers: Singer[] = [];

  constructor(
    private songService: SongService,
    private singerService: SingerService
  ) {}

  ngOnInit() {
    this.singerService.getAll().subscribe(singers => {
      this.singers = singers;
    });
  }

  ngOnChanges(): void {
    if (this.selectedSong) {
      this.name = this.selectedSong.name;
      this.genre = this.selectedSong.genre;
      const singer = this.singers.find(s => s.id === this.selectedSong?.singerId);
      this.singerName = singer ? singer.name : '';
      this.file = null;
      this.selectedFileName = '';
    } else {
      this.resetForm();
    }
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.selectedFileName = this.file ? this.file.name : '';
    if (this.file && !this.selectedSong) {
      this.name = this.file.name;
    }
  }

  onSubmit(): void {
    if (!this.name || !this.genre || !this.singerName) return;

    const singer = this.singers.find(s => s.name.trim().toLowerCase() === this.singerName.trim().toLowerCase());
    if (!singer) {
      alert("הזמר שהוזן לא נמצא ברשימת הזמרים");
      return;
    }

    if (this.selectedSong) {
      // עדכון
      if (this.file) {
        const oldFileName = this.selectedSong.songUrl.split('/').pop()!;
        const encodedFileName = encodeURIComponent(oldFileName);

        this.songService.deleteFile(encodedFileName).subscribe(() => {
          this.songService.uploadFile(this.file!).subscribe(res => {
            const updatedSong: Song = {
              ...this.selectedSong!,
              name: this.file!.name,
              genre: this.genre,
              songUrl: res.url,
              singerId: singer.id,
            
            };
            this.songService.update(this.selectedSong!.id, updatedSong).subscribe(() => {
              this.songSaved.emit();
              this.resetForm();
            });
          });
        });
      } else {
        const updatedSong: Song = {
          ...this.selectedSong!,
          name: this.name,
          genre: this.genre,
          singerId: singer.id,
         
        };
        this.songService.update(this.selectedSong!.id, updatedSong).subscribe(() => {
          this.songSaved.emit();
          this.resetForm();
        });
      }
    } else {
      // הוספה
      if (!this.file) {
        alert('יש לבחור קובץ לפני הוספת שיר חדש!');
        return;
      }
      this.songService.uploadFile(this.file).subscribe(res => {
        console.log("res from uploadFile:", res);
        const newSongDto = {
          name: this.file!.name,
          genre: this.genre,
          songUrl: res.url,
          singerId: singer.id,
          playlistId:null
        };
        console.log("newSongDto:", newSongDto);
        this.songService.add(newSongDto).subscribe(() => {
          this.songSaved.emit();
          this.resetForm();
        });
      });
    }
  }

  onCancel(): void {
    this.resetForm();
    this.formClosed.emit();
  }

  private resetForm(): void {
    this.name = '';
    this.genre = '';
    this.singerName = '';
    this.file = null;
    this.selectedFileName = '';
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  get isEditing(): boolean {
    return this.selectedSong !== null;
  }

  get isFileRequired(): boolean {
    return !this.selectedSong;
  }

  get hasSelectedFile(): boolean {
    return this.selectedFileName !== '';
  }
}
