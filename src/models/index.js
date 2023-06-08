import Users from './allModels/UserModel.js';
import UserProfile from './allModels/UserProfileModel.js';
import Trip from './allModels/TripModel.js';
import { TripDetail } from './allModels/TripDetailModel.js';
import DestinationPenginapan from './allModels/DestinationPenginapanModel.js';
import { Destination } from './allModels/DestinationModel.js';
import ReviewWisata from './allModels/ReviewWisataModel.js';
import ReviewPenginapan from './allModels/ReviewPenginapanModel.js';

const model = {};

model.Users = Users;
model.Trip = Trip;
model.UserProfile = UserProfile;
model.Destination = Destination;
model.DestinationPenginapan = DestinationPenginapan;
model.TripDetail = TripDetail;
model.ReviewWisata = ReviewWisata;
model.ReviewPenginapan = ReviewPenginapan;
export default model;