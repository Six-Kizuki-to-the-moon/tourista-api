import Users from './allModels/UserModel.js';
import UserProfile from './allModels/UserProfileModel.js';
import DestinationWisata from './allModels/DestinationWisataModel.js';
import DestinationPenginapan from './allModels/DestinationPenginapanModel.js';
import Trip from './allModels/TripModel.js';
const model = {};

model.Users = Users;
model.Trip = Trip;
model.UserProfile = UserProfile;
model.DestinationWisata = DestinationWisata;
model.DestinationPenginapan = DestinationPenginapan;
export default model;