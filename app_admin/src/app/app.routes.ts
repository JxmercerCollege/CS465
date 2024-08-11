import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component'; // Adjust the import path if needed
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

export const routes: Routes = [
  { path: 'add-trip', component: AddTripComponent },
  { path: 'edit-trip', component: EditTripComponent }, 
  { path: '', component: TripListingComponent, pathMatch: 'full'}
];
