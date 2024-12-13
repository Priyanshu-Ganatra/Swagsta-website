import Collection from "../models/collectionModel.js";

export const addNewCollection = async (req, res) => {
    try {
        const { userId, name } = req.body;

        const newCollection = new Collection({
            userId,
            name
        });

        await newCollection.save();
        res.status(201).json({ message: "Collection added successfully", success: true });
    } catch (error) {
        console.log("Error in addNewCollection controller", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find({ userId: req.params.id });
        res.status(200).json({ collections, success: true });
    } catch (error) {
        console.log("Error in getCollections controller", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}