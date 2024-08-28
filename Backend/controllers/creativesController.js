import Creative from "../models/creativesModel.js";

export const addCreative = async (req, res) => {
    try {
        const { title, techDetails, coverImg, category, price, otherImages, credits, storyLine, featured } = req.body;

        const parsedOtherImages = JSON.parse(otherImages);
        const parsedCredits = JSON.parse(credits);

        const newCreative = new Creative({
            title,
            techDetails,
            coverImg,
            category,
            price,
            otherImages: parsedOtherImages,
            credits: parsedCredits,
            storyLine,
            featured,
        });

        await newCreative.save();

        res.status(201).json({ message: "Creative added successfully" });
    } catch (error) {
        console.log("Error in addCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const likeCreative = async (req, res) => {
    try {
        const { id, username } = req.body;

        const creative = await Creative.findById(id);

        if (!creative) {
            return res.status(404).json({ message: "Creative not found" });
        }

        if (creative.likedBy.includes(username)) {
            creative.likedBy = creative.likedBy.filter((uname) => uname !== username);
            creative.likes -= 1;
        } else {
            creative.likedBy.push(username);
            creative.likes += 1;
        }

        await creative.save();

        res.status(200).json({ message: "Creative liked successfully", creative });
    } catch (error) {
        console.log("Error in likeCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllCreatives = async (req, res) => {
    try {
        const creatives = await Creative.find();

        res.status(200).json(creatives);
    } catch (error) {
        console.log("Error in getAllCreatives controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getCreative = async (req, res) => {

    try {
        const { id } = req.params;

        const creative = await Creative.findById(id);

        if (!creative) {
            return res.status(404).json({ message: "Creative not found" });
        }

        res.status(200).json(creative);
    }
    catch (error) {
        console.log("Error in getCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCreative = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, likes, price, credits, techDetails, coverImg, category, featured, storyLine, otherImages } = req.body;

        const parsedOtherImages = JSON.parse(otherImages);
        const parsedCredits = JSON.parse(credits);

        const creative = await Creative.findById(id);

        if (!creative) {
            return res.status(404).json({ message: "Creative not found" });
        }

        creative.title = title;
        creative.likes = likes;
        creative.price = price;
        creative.credits = parsedCredits;
        creative.techDetails = techDetails;
        creative.coverImg = coverImg;
        creative.category = category;
        creative.featured = featured;
        creative.storyLine = storyLine;
        creative.otherImages = parsedOtherImages;

        await creative.save();

        res.status(200).json({ message: "Creative updated successfully" });
    } catch (error) {
        console.log("Error in updateCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCreative = async (req, res) => {
    try {
        const { id } = req.params;

        const creative = await Creative.findById(id);

        if (!creative) {
            return res.status(404).json({ message: "Creative not found" });
        }

        await creative.remove();

        res.status(200).json({ message: "Creative deleted successfully" });
    } catch (error) {
        console.log("Error in deleteCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}