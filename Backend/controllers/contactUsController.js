import ContactUs from "../models/contactUsModel.js";

export const getData = async (req, res) => {
    try {
        const data = await ContactUs.findOne();
        res.status(200).json(data === null ? { message: "No data found" } : data);
    } catch (error) {
        console.log("Error in getData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateData = async (req, res) => {
    try {
        let { address, phoneNumbers, emails } = req.body;

        if(!address && !phoneNumbers && !emails) {
            return res.status(400).json({ message: "Please provide atleast one field to update" });
        }

        const data = await ContactUs.findOne();
        if (!data) {
            return res.status(404).json({ message: "No data found to update" });
        }

        if (address) data.address = address;
        if(phoneNumbers) data.phoneNumbers = phoneNumbers;
        if(emails) data.emails = emails;
        await data.save();
        res.status(200).json({ message: "Data updated successfully", data });
    } catch (error) {
        console.log("Error in updateData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const uploadData = async (req, res) => {
    try {
        let { address, phoneNumbers, emails } = req.body;
        emails = JSON.parse(emails)
        phoneNumbers = JSON.parse(phoneNumbers)

        const data = await ContactUs.findOne();
        if (data) {
            return res.status(400).json({ message: "Data already exists. Use update route" });
        }

        const newData = new ContactUs({ address, phoneNumbers, emails });
        await newData.save();

        res.status(201).json({ message: "Data uploaded successfully", data: newData });
    }
    catch (error) {
        console.log("Error in uploadData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}