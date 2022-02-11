import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'kt-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements OnInit {
  // Public properties
  viewLoading = false;

  cancelText = 'Cancelar';
  confirmText = 'Eliminar';

  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
   * @param data: any
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.cancelText = this.data.cancelText;
    this.confirmText = this.data.confirmText;
  }

  /**
   * Close dialog with false result
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Close dialog with true result
   */
  onYesClick(): void {
    /* Server loading imitation. Remove this */
    this.viewLoading = true;
    this.dialogRef.close(true);
  }
}
