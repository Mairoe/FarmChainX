import mongoose from 'mongoose';

const batchSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  batchNumber: { type: String, required: true, unique: true },
  cropType: { type: String, required: true },
  price: { type: String },
  quantity: { type: String },
  plantedLocation: { type: String },
  farmLocation: { type: String },
  plantingDate: { type: Date },
  harvestDate: { type: Date },
  areaSize: { type: String },
  soilType: { type: String },
  notes: { type: String },
  status: { type: String, default: 'Active' },
}, { timestamps: true });

const Batch = mongoose.model('Batch', batchSchema);
export default Batch;
