import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'kt-fetch-entity-dialog',
  templateUrl: './fetch-entity-dialog.component.html'
})
export class FetchEntityDialogComponent {
  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<FetchEntityDialogComponent>,
   * @param data: any
   */
  constructor(
    public dialogRef: MatDialogRef<FetchEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Close dialog with false result
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
