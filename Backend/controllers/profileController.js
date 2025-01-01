import Collection from "../models/collectionModel.js";
import User from "../models/userModel.js";
import Address from "../models/addressModel.js";

export const updateUserData = async (req, res) => {
    try {
        let { fullName, email, password, mobile, whatsapp, dob, addresses, isWhatsappNumberSameAsMobile, addressesToDelete } = req.body;

        const userData = {
            fullName,
            mobile: Number(mobile),
            whatsapp: isWhatsappNumberSameAsMobile ? Number(mobile) : Number(whatsapp),
            isWhatsappNumberSameAsMobile,
            dob: dob ? dob : null
        };

        // Only update email if changed
        if (email !== req.user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists",
                    success: false
                });
            }
            userData.email = email;
        }

        // Only update password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            userData.password = hashedPassword;
        }

        // remove all addresses that have all fields empty
        addresses = addresses.filter(addr => addr.lineOne || addr.lineTwo || addr.city || addr.state || addr.country);

        // Handle addresses to delete
        if (addressesToDelete) {
            await Address.deleteMany({ _id: { $in: addressesToDelete } });
        }

        // Handle addresses
        const addressIds = await Promise.all(addresses.map(async (addr) => {
            if (addr._id) {
                await Address.findByIdAndUpdate(addr._id, {
                    lineOne: addr.lineOne,
                    lineTwo: addr.lineTwo,
                    city: addr.city,
                    state: addr.state,
                    country: addr.country
                });
                return addr._id;
            } else {
                const newAddress = new Address({
                    lineOne: addr.lineOne,
                    lineTwo: addr.lineTwo,
                    city: addr.city,
                    state: addr.state,
                    country: addr.country
                });
                await newAddress.save();
                return newAddress._id;
            }
        }));

        userData.addresses = addressIds;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            userData,
            { new: true }
        ).populate('addresses');

        res.status(200).json({ success: true, updatedUser });
    } catch (error) {
        console.log("Error in updateUserData controller:", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

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
        const collections = await Collection.find({ userId: req.user._id })
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

        if (!creativeId || !collectionId) {
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

        if (!collectionId) {
            return res.status(400).json({ message: "Please provide collectionId", success: false });
        }

        await Collection.findByIdAndDelete(collectionId);

        res.status(200).json({ message: "Collection deleted successfully", success: true });

    } catch (error) {
        console.log("Error in deleteCollection controller:", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}