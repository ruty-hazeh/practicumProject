// singer-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { SingerService} from '../../services/singer.service';
import {Singer, SingerDTO } from '../../models/singer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
    imports: [FormsModule, CommonModule],
  styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  singers: Singer[] = [];
  newName: string = '';
  editId: number | null = null;
  editName: string = '';

  constructor(private singerService: SingerService) {}

  ngOnInit() {
    this.loadSingers();
  }

  loadSingers() {
    this.singerService.getAll().subscribe(data => this.singers = data);
  }

  addSinger() {
    if (!this.newName.trim()) return;
    const newSinger: SingerDTO = { name: this.newName.trim() };
    this.singerService.add(newSinger).subscribe(() => {
      this.newName = '';
      this.loadSingers();
    });
  }

  startEdit(singer: Singer) {
    this.editId = singer.id;
    this.editName = singer.name;
  }

  cancelEdit() {
    this.editId = null;
    this.editName = '';
  }

  saveEdit() {
    if (this.editId === null || !this.editName.trim()) return;
    const updatedSinger: SingerDTO = { name: this.editName.trim() };
    this.singerService.update(this.editId, updatedSinger).subscribe(() => {
      this.editId = null;
      this.editName = '';
      this.loadSingers();
    });
  }

  deleteSinger(id: number) {
    this.singerService.delete(id).subscribe(() => this.loadSingers());
  }
}
