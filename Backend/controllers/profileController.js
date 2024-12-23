import Collection from "../models/collectionModel.js";

export const addNewCollection = async (req, res) => {
    try {
        const { userId, name } = req.body;

        const newCollection = new Collection({
            userId,
            name
        });

        await newCollection.save();
        res.status(201).json({ message: "Collection added successfully", newCollection, success: true });
    } catch (error) {
        console.log("Error in addNewCollection controller", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find({ userId: req.params.id })
            .populate({
                path: 'creatives.creativeId', // Specify the path to populate
                model: 'Creative', // The model to use for the reference
            });

        res.status(200).json({ collections, success: true });
    } catch (error) {
        console.log("Error in getCollections controller:", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const removeFromCollection = async (req, res) => {
    try {
        const { creativeId, collectionId } = req.params;

        if(!creativeId || !collectionId) {
            return res.status(400).json({ message: "Please provide both creativeId and collectionId", success: false });
        }

        await Collection.findByIdAndUpdate(collectionId, {
            $pull: { creatives: { creativeId } }
        });

        res.status(200).json({ message: "Removed from collection successfully", success: true });

    } catch (error) {
        console.log("Error in removeFromCollection controller:", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const deleteCollection = async (req, res) => {
    try {
        const { collectionId } = req.params;

        if(!collectionId) {
            return res.status(400).json({ message: "Please provide collectionId", success: false });
        }

        await Collection.findByIdAndDelete(collectionId);

        res.status(200).json({ message: "Collection deleted successfully", success: true });

    } catch (error) {
        console.log("Error in deleteCollection controller:", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}