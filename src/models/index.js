import Users from './allModels/UserModel.js';
import UserProfile from './allModels/UserProfileModel.js';
import Trip from './allModels/TripModel.js';
import DestinationWisata from './allModels/DestinationWisataModel.js';
import DestinationPenginapan from './allModels/DestinationPenginapanModel.js';
import DestinationDetail from './allModels/DestinationDetailModel.js';
import ReviewWisata from './allModels/ReviewWisataModel.js';
import ReviewPenginapan from './allModels/ReviewPenginapanModel.js';

const model = {};

model.Users = Users;
model.Trip = Trip;
model.UserProfile = UserProfile;
model.DestinationWisata = DestinationWisata;
model.DestinationPenginapan = DestinationPenginapan;
model.DestinationDetail = DestinationDetail;
model.ReviewWisata = ReviewWisata;
model.ReviewPenginapan = ReviewPenginapan;
export default model;