/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import {
  Http,
  HttpModule,
  XHRBackend,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
class RemoteService {
  constructor(private http: Http) {}

  fetchViaHttp(): Observable<any> {
    return this.http.get('/somendpoint/people.json').map(x => x.json());
  }
}

describe('RemoteService', () => {
  let service: RemoteService;
  let mockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        RemoteService,
        MockBackend,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    // inject the service
    service = TestBed.get(RemoteService);
    mockBackend = TestBed.get(MockBackend);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it(
    'should return the json',
    async(() => {
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(
          new Response(new ResponseOptions({ body: '{ "name": "Juri" }' }))
        );
      });

      service.fetchViaHttp().subscribe(data => {
        expect(data.name).toBe('Juri');
      });
    })
  );
});
