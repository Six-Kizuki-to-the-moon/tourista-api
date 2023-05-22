import UserProfile from "../models/UserProfileModel.js";

export const getUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findOne({
            where: { id: req.params.id, email: req.email }, // Hanya mencari profil dengan id yang cocok dan email yang cocok dengan email yang terkait dengan token
        });

        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }

        res.json(userProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const createUserProfile = async (req, res) => {
    const { name, address, email, photo_profile, user_lat, user_lot } = req.body;

    try {
        const existingProfile = await UserProfile.findOne({ where: { email } });

        if (existingProfile) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const userProfile = await UserProfile.create({
            name,
            address,
            email,
            photo_profile,
            user_lat,
            user_lot,
        });

        res.json({ msg: "User profile created", userProfile });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateUserProfile = async (req, res) => {
    const { name, address, photo_profile, user_lat, user_lot } = req.body;

    try {
        const [rowsAffected] = await UserProfile.update(
            {
                name,
                address,
                photo_profile,
                user_lat,
                user_lot,
            },
            {
                where: { id: req.params.id },
                returning: true,
            }
        );

        if (rowsAffected === 0) {
            return res.status(404).json({ error: "User profile not found" });
        }

        const updatedUserProfile = await UserProfile.findOne({
            where: { id: req.params.id },
        });

        res.json({ msg: "User profile updated", updatedUserProfile });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const deleteUserProfile = async (req, res) => {
    try {
        const deletedUserProfile = await UserProfile.destroy({
            where: { id: req.params.id, email: req.email }, // Hanya menghapus profil dengan id yang cocok dan email yang cocok dengan email yang terkait dengan token
        });

        if (deletedUserProfile === 0) {
            return res.status(404).json({ error: "User profile not found" });
        }

        res.json({ msg: "User profile deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
