import Batch from '../models/Batch.js';

// @desc    Get all batches for current user
// @route   GET /api/batches
export const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(batches || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new batch
// @route   POST /api/batches
export const createBatch = async (req, res) => {
  try {
    const { batchNumber, cropType, price, quantity, plantedLocation, farmLocation, plantingDate, harvestDate, areaSize, soilType, notes } = req.body;

    const batch = await Batch.create({
      user: req.user._id,
      batchNumber,
      cropType,
      price,
      quantity,
      plantedLocation,
      farmLocation,
      plantingDate,
      harvestDate,
      areaSize,
      soilType,
      notes,
    });

    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a batch
// @route   PUT /api/batches/:id
export const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });

    // Make sure user owns the batch
    if (batch.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this batch' });
    }

    const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a batch
// @route   DELETE /api/batches/:id
export const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });

    if (batch.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this batch' });
    }

    await Batch.findByIdAndDelete(req.params.id);
    res.json({ message: 'Batch removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
