import DestinationWisata from "../models/allModels/DestinationWisataModel.js";

export const getDestinationWisataById = async (req, res) => {
  const destinationWisataId = req.params.id;

  try {
    const destinationWisata = await DestinationWisata.findByPk(destinationWisataId);

    if (!destinationWisata) {
      return res.status(404).json({ msg: "Destination Wisata not found" });
    }

    res.json(destinationWisata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const createDestinationWisata = async (req, res) => {
  const { trip_name_type, name_wisata } = req.body;

  try {
    const destinationWisata = await DestinationWisata.create({
      trip_name_type,
      name_wisata,
    });

    res.json(destinationWisata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateDestinationWisata = async (req, res) => {
  const { trip_name_type, name_wisata } = req.body;
  const destinationWisataId = req.params.id;

  try {
    const destinationWisata = await DestinationWisata.findByPk(destinationWisataId);

    if (!destinationWisata) {
      return res.status(404).json({ msg: "Destination Wisata not found" });
    }

    await destinationWisata.update({
      trip_name_type,
      name_wisata,
    });

    res.json({ msg: "Destination Wisata updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteDestinationWisata = async (req, res) => {
  const destinationWisataId = req.params.id;

  try {
    const destinationWisata = await DestinationWisata.findByPk(destinationWisataId);

    if (!destinationWisata) {
      return res.status(404).json({ msg: "Destination Wisata not found" });
    }

    await destinationWisata.destroy();
    res.json({ msg: "Destination Wisata deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};