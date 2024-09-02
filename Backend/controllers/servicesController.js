import Services from "../models/servicesModel.js";

export const getData = async (req, res) => {
    try {
        const data = await Services.findOne();
        res.status(200).json(data === null ? { message: "No data found" } : data);
    } catch (error) {
        console.log("Error in getData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateData = async (req, res) => {
    try {
        let { title, description, services } = req.body;
        services = JSON.parse(services);

        const data = await Services.findOne();

        data.title = title;
        data.description = description;
        data.services = services;

        await data.save();
        res.status(200).json({ message: "Data updated successfully", data });
    } catch (error) {
        console.log("Error in updateData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const uploadData = async (req, res) => {
    try {
        let { title, description, services } = req.body;
        services = JSON.parse(services);

        const data = await Services.findOne();
        if (data) {
            return res.status(400).json({ message: "Data already exists, use updateData route" });
        }

        const newData = new Services({ title, description, services });
        await newData.save();
        res.status(200).json({ message: "Data uploaded successfully", data: newData });
    } catch (error) {
        console.log("Error in uploadData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}