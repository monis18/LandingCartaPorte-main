import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from '@utils';

@Injectable()
export class BlackListService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService,
  ) { }

}
