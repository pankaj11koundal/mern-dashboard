import News from '../models/News.js'

const years = ['2015', '2016', '2017'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const getOverviewLineChart = async ( req, res ) => {
    try {
        const results = await Promise.all(
            months.map(async (month) => {
                return await Promise.all(
                    years.map(async (year) => {
                        const count = await News.countDocuments({
                            published: { $regex: new RegExp(`${month}.*${year}`) }
                        });
                        return { month, [`countOf${year}`]: count };
                    })
                );
            })
            
        );

        const flattenedResult = results.reduce((acc, curr) => {
            curr.forEach(item => {
                const existing = acc.find(el => el.month === item.month);
                if (existing) {
                    existing.countOf2015 += item.countOf2015 || 0;
                    existing.countOf2016 += item.countOf2016 || 0;
                    existing.countOf2017 += item.countOf2017 || 0;
                } else {
                    acc.push({
                        month: item.month,
                        countOf2015: item.countOf2015 || 0,
                        countOf2016: item.countOf2016 || 0,
                        countOf2017: item.countOf2017 || 0
                    });
                }
            });
            return acc;
        }, []);

        res.status(200).json(flattenedResult);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDailyBarChart = async (req, res) => {
    try {
        const result = await News.aggregate([
            {
                $match: {
                    pestle: { $ne: "" },
                }
            },
            {
                $group: {
                    _id: {
                        pestle: "$pestle", 
                    },
                    avgIntensity: { $avg: "$intensity" },
                    avgRelevance: { $avg: "$relevance" },
                    avgLikelihood: { $avg: "$likelihood" }
                }
            },
            {
                $project: {
                    pestle: "$_id.pestle",
                    Intensity: { $round: ["$avgIntensity", 0] }, 
                    Relevance: { $round: ["$avgRelevance", 0] }, 
                    Likelihood: { $round: ["$avgLikelihood", 0] }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.status(200).json(result);
    }catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPieChar = async(req, res) => {
    try {
        const result = await News.aggregate([
            {
                $facet: {
                    sectorCounts: [
                        { $match: { sector: { $ne: "" } } }, // Exclude empty sectors
                        { $group: { _id: "$sector", value: { $sum: 1 } } },
                        { $sort: { count: -1 } } // Sort by count in descending order
                    ],
                    pestleCounts: [
                        { $match: { pestle: { $ne: "" } } }, // Exclude empty pestles
                        { $group: { _id: "$pestle", value: { $sum: 1 } } },
                        { $sort: { count: -1 } } // Sort by count in descending order
                    ]
                }
            }
        ]); 

        res.status(200).json(result[0]);
    } catch(e) {
        res.status(404).json(e)
    }
}
