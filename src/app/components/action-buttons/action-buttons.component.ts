import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  standalone: false,
  
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css'
})
export class ActionButtonsComponent {
  @Input() mode: string = 'default';
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  onEdit() {
    this.editClicked.emit(); // Notify the parent
  }

  onDelete() {
    this.deleteClicked.emit(); // Notify the parent
  }
  
}
