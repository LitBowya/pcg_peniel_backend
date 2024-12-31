import Asset from '../models/Asset.js';

// Assets
const addAsset = async (req, res) => {
    try {
        const { name, value } = req.body;
        const asset = await Asset.create({ name, value });
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message: `Error adding asset: ${error.message}` });
    }
};
const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const asset = await Asset.findByIdAndUpdate(id, updates, { new: true });
        if (!asset) return res.status(404).json({ message: 'Asset not found.' });
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ message: `Error updating asset: ${error.message}` });
    }
};
const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findByIdAndDelete(id);
        if (!asset) return res.status(404).json({ message: 'Asset not found.' });
        res.status(200).json({ message: 'Asset deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting asset: ${error.message}` });
    }
};
const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        if (!assets) return res.status(404).json({ message: 'Asset not found.' });
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: `Error fetching assets: ${error.message}` });
    }
};


export {addAsset, updateAsset, deleteAsset, getAssets}
