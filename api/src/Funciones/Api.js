const axios = require('axios');

module.exports = getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=0f904c1a-e758-4fb7-a17d-c27a6e08102d`);
    const apiInfo = await apiUrl.data.map(d => {
        return {
            id: d.id,
            name: d.name,
            weight: [d.weight.metric].join().split(' ').filter(w => w !== '-').length === 1 ? 
                    [d.weight.metric].join().split(' ').filter(w => w !== '-').map(e => e === 'NaN' ? 25 : parseInt(e, 10)).pop() :
                    ([d.weight.metric].join().split(' ').filter(w => w !== '-').map(e => e === 'NaN' ? 0 : parseInt(e, 10))[0] +
                    [d.weight.metric].join().split(' ').filter(w => w !== '-').map(e => parseInt(e, 10))[1]) / 2,
            height: d.height.metric,
            image: d.image.url,
            temperament: [d.temperament].join().split(',').map(m => m.trim()),
            lifeSpan: d.life_span
        };
    });
    return apiInfo;
};

