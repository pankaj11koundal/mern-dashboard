import News from "../models/News.js";
import getCountryIso3 from 'country-iso-2-to-3';
import countries from 'country-list';

export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (e) {
    res.status(404).json({ message: error.message });
  }
};

export const getList = async (req, res) => {
  try {
    // sort is an object which looks like { 'feild: '_id', 'sort': 'title'}
    const { page = 1, pageSize = 25, sort = null, search = "" } = req.query;

    // formated sort should look like { _id: -1}
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed === "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const list = await News.find({
      $or: [
        { sector: new RegExp(search, "i") },
        { topic: new RegExp(search, "i") },
        { pestle: new RegExp(search, "i") },
        { source: new RegExp(search, "i") },
        { title: new RegExp(search, "i") },
        { insight: new RegExp(search, "i") },
      ],
    })
      .sort(sortFormatted)
      .skip(pageSize * page)
      .limit(pageSize);

    const total = await News.countDocuments({
      $or: [
        { sector: new RegExp(search, "i") },
        { topic: new RegExp(search, "i") },
        { pestle: new RegExp(search, "i") },
        { source: new RegExp(search, "i") },
        { title: new RegExp(search, "i") },
        { insight: new RegExp(search, "i") },
      ],
    });

    res.status(200).json({
        list,
        total,
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};


export const getGeography = async (req, res) => {
  try {
    const news = await News.find();

    const mappedLocations = news.reduce((acc, { country }) => {
      if (country !== ''){  
        const countryISO2 = countries.getCode(country);
        const countryISO3 = getCountryIso3(countryISO2);
        
        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        
        acc[countryISO3]++;
      }
      return acc;
    });

    const formatedLocations = Object.entries(mappedLocations).map(([country, count]) => {
      return { id: country, value: count };
    })

    res.status(200).json(formatedLocations);

  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}