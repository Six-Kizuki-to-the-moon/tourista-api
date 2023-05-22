import Trip from "../models/TripModel.js";

// Getting Trip ById
export const getTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            where: { id: req.params.id },
        });
        res.json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

// Membuat Trip Baru
export const createTrip = async (req, res) => {
    const { trip_name, trip_detail, trip_image, using_lodging } = req.body;
    try {
        const trip = await Trip.create({
            trip_name,
            trip_detail,
            trip_image,
            using_lodging,
        });
        res.json({ msg: "Trip Destination was Created", trip });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

// Mengedit Trip
export const updateTrip = async (req, res) => {
    const { trip_name, trip_detail, trip_image, using_lodging } = req.body;
    try {
        const updateTrip = await Trip.update(
            {
                trip_name,
                trip_detail,
                trip_image,
                using_lodging,
            },
            {
                where: { id: req.params.id },
                returning: true, // Mengembalikan data yang diperbarui
            }
        );
        res.json({ msg: "Trip Destination Update", updateTrip });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

// Menghapus Trip
export const deleteTrip = async (req, res) => {
    try {
        await UserProfile.destroy({
            where: { id: req.params.id },
        });
        res.json({ msg: "Trip Destination was deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

