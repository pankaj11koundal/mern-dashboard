import News from "../models/News.js";

const getDashboardDetails = async (req, res) => {
    try {
        const counts = await News.aggregate([
            {
                $facet: {
                    count2015: [
                        {
                            $match: {
                                published: { $regex: "2015" }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    count2016: [
                        {
                            $match: {
                                published: { $regex: "2016" }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    count2017: [
                        {
                            $match: {
                                published: { $regex: "2017" }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ]
                }
            }
        ]);

        const mostOccurredTopic = await News.aggregate([
            {
                $group: {
                    _id: "$topic",
                    count: { $sum: 1 } 
                }
            },
            {
                $sort: { count: -1 } 
            },
            {
                $limit: 1 
            }
        ]);

        const data = [counts[0]];
        data.push({topic: mostOccurredTopic});

        res.status(200).json({
            topic: mostOccurredTopic[0],
            count2015: counts[0].count2015[0].count,
            count2016: counts[0].count2016[0].count,
            count2017: counts[0].count2017[0].count,
        });
    } catch (e) {
        res.status(404).json(e);
    }
}

export default getDashboardDetails;