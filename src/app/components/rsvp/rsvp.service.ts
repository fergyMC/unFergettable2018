import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { RSVP } from './rsvp';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class RsvpService {
    url = 'https://script.google.com/macros/s/AKfycbzoPQoLokSVqlN1tQ4k5o5jN3GdY0VvOW2rv5g2Grm1okgZ52k/exec'

    constructor(private http: HttpClient) { }

  /*Submit Data to google sheet*/
  submitToForms(rsvp: RSVP) {

    return this.http.get(this.url, {params: {Name: rsvp.name, Email:rsvp.email, RSVP: rsvp.attending, NumberInParty: rsvp.numInParty}}).pipe(catchError(this.handleError));    

  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
