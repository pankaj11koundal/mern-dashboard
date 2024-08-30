import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
    {
        end_year: { type: String, default: "" },
        intensity: { type: Number, default: "" },
        sector: { type: String },
        topic: { type: String, default: true },
        insight: { type: String },
        url: { type: String, default: "" },
        region: { type: String, default: " " },
        start_year: { type: String, default: "" },
        impact: { type: String, default: "" },
        added: { type: Date, required: true },
        published: { type: String, default: "" },
        country: { type: String, default: "" },
        relevance: { type: Number, default: "" },
        pestle: { type: String, default: "" },
        source: { type: String, default: "" },
        title: { type: String, required: true },
        likelihood: { type: Number, default: "" }
    }
);

const News = mongoose.model('news', NewsSchema);
export default News;