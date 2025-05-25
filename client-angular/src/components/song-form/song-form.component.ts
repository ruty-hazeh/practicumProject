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
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SongService } from '../../services/song.service';
import { FormsModule } from '@angular/forms';
import { Song } from '../../models/song';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
})
export class SongFormComponent implements OnChanges {
  @Input() songToEdit: Song | null = null;
  @Output() refresh = new EventEmitter<void>();

  name = '';
  genre = '';
  file: File | null = null;
  singerId :number=0;
  constructor(private songService: SongService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songToEdit'] && this.songToEdit) {
      this.name = this.songToEdit.name;
      this.genre = this.songToEdit.genre;
      this.singerId=+this.songToEdit.singerId;
      this.file = null; // לא משנה קובץ כברירת מחדל בעריכה
    }
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (this.file && !this.songToEdit) {
      this.name = this.file.name; 
    }
  }

  submit() {
    if (this.songToEdit) {
      // עדכון שיר קיים
      if (this.file) {
        console.log(this.songToEdit.songUrl)
        const oldFileName = this.songToEdit.songUrl.split('/').pop()!;

        const encodedFileName = encodeURIComponent(oldFileName);
        this.songService.deleteFile(encodedFileName).subscribe(() => { 
          
          
        this.songService.uploadFile(this.file!).subscribe(res => {
          const updatedSong = {
            ...this.songToEdit!,
            name: this.file!.name,
            genre: this.genre,
            fileName: this.file!.name,
            url: res.Url,
            singerId:this.singerId
          };
          this.songService.update(this.songToEdit!.id, updatedSong).subscribe(() => {
            this.clearForm();
            this.refresh.emit();
          });
        })
      });
      } else {
        // עדכון ללא שינוי קובץ
        const updatedSong = {
          ...this.songToEdit!,
          name: this.name,
          genre: this.genre,
          singerId:this.singerId,
        };
        this.songService.update(this.songToEdit!.id, updatedSong).subscribe(() => {
          this.clearForm();
          this.refresh.emit();
        });
      }
    } else {
      // הוספת שיר חדש - מחייב קובץ
      if (!this.file) {
        alert('יש לבחור קובץ לפני הוספת שיר חדש!');
        return;
      }
  
      this.songService.uploadFile(this.file).subscribe(res => {
        const song = {
          name: this.file!.name,
          genre: this.genre,
          fileName: this.file!.name,
          url: res.Url,
          singerId:this.singerId
        };
        this.songService.add(song).subscribe(() => {
          this.clearForm();
          this.refresh.emit();
        });
      });
    }
  }
  
  clearForm() {
    this.name = '';
    this.genre = '';
    this.file = null;
    this.singerId = 0,
    this.songToEdit = null;
  }
}
