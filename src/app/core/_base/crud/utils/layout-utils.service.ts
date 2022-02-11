// Angular
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Partials for CRUD
// tslint:disable-next-line: max-line-length
import { ActionNotificationComponent, ConfirmDialogComponent, FetchEntityDialogComponent } from '../../../../views/partials/content/crud';

export enum MessageType {
  Create,
  Read,
  Update,
  Delete
}

@Injectable()
export class LayoutUtilsService {

  /**
   * Service constructor
   *
   * @param snackBar: MatSnackBar
   * @param dialog: MatDialog
   */
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  /**
   * Showing (Mat-Snackbar) Notification
   *
   * @param message: string
   * @param type: MessageType
   * @param duration: number
   * @param showCloseButton: boolean
   * @param showUndoButton: boolean
   * @param undoButtonDuration: number
   * @param verticalPosition: 'top' | 'bottom' = 'top'
   */
  showActionNotification(
    message: string,
    type: MessageType = MessageType.Create,
    duration: number = 10000,
    showCloseButton: boolean = false,
    showUndoButton: boolean = false,
    undoButtonDuration: number = 3000,
    verticalPosition: 'top' | 'bottom' = 'top'
  ) {
    const data = {
      message,
      snackBar: this.snackBar,
      showCloseButton,
      showUndoButton,
      undoButtonDuration,
      verticalPosition,
      type,
      action: 'Undo'
    };
    return this.snackBar.openFromComponent(ActionNotificationComponent, {
      duration,
      data,
      verticalPosition
    });
  }

  /**
   * Showing Confirmation (Mat-Dialog) before Entity Removing
   *
   * @param title: stirng
   * @param description: stirng
   * @param waitDesciption: string
   */
  deleteElement(title: string = '', description: string = '', confirmText: string = 'Aceptar', cancelText: string = 'Cancelar') {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { title, description, confirmText, cancelText },
      width: '440px'
    });
  }

  confirmElement(title: string = '', description: string = '', confirmText: string = 'Aceptar', cancelText: string = 'Cancelar') {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { title, description, confirmText, cancelText },
      width: '440px'
    });
  }

  errorElement(title: string = '', description: string = '', confirmText: string = 'Aceptar', cancelText = null) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { title, description, confirmText, cancelText },
      width: '440px'
    });
  }

  fetchElements(items: any[], title: string = '', description: string = '', confirmText: string = 'Aceptar', cancelText = null) {
    return this.dialog.open(FetchEntityDialogComponent, {
      data: { items, title, description, confirmText },
      width: '400px'
    });
  }
}
