const getApiInfo = require('./Api');
const getDbInfo = require('./Bd');

module.exports = getAllDogs = async () => {
    const dbInfo = await getDbInfo();
    const apiInfo = await getApiInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
};