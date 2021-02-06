const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
    category: { type: String, required: true },
    causes: { type: String, required: true },
    consequences: { type: String, required: true },
    controls: { type: Array, required: true },
    creation_date: { type: Date, default: Date.now },
    financial_impact: { type: Number, required: true },
    impact: { type: String, required: true },
    inherent_risk_exposure: { type: String, required: true },
    level: { type: String, required: true },
    likelihood: { type: String, required: true },
    organisationId: { type: String, required: true },
    residual_risk_exposure: { type: String, required: true },
    risk_owner: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        department: { type: String, required: true }
    },
    sub_category: { type: String, required: true },
    tags: { type: Array, required: true },
    title: { type: String, required: true },
    total_fcc_controls: { type: Number, required: true },
    total_fcc_treatments: { type: Number, required: true },
    treatments: { type: Array, required: true },
    comments: { type: String, required: false },
    isApproved: { type: String, default: false }

},
    { strict: true }
);

const Risk = mongoose.model("risk", riskSchema);

module.exports = Risk;