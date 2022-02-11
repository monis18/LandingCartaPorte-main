import { FakeApiService } from '@layout';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

export const extModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  }),
  HttpClientInMemoryWebApiModule.forRoot(FakeApiService, {
    passThruUnknownUrl: true,
    dataEncapsulation: false
  }),
];
