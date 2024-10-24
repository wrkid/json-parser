// мапа названия полей в Excel таблице
const nameMap = {
  shop: 'shop',
  category: 'category',
  pictureFileName_web: 'pictureFileName_web',
  pictureFileName_mobile: 'pictureFileName_mobile',
  iconFileName: 'iconFileName',
  bannerFileName: 'bannerFileName',
  description: 'description',
  webLink_mobile: 'webLink_mobile',
  webLink_web: 'webLink_web'
}

const fieldValue = (data = {}, field = '', osType = '') => {
  const map = {
    category: data[nameMap.category] ?? '',
    shop: data[nameMap.shop] ?? '',
    pictureFileName: data[`${nameMap[`pictureFileName_${osType}`]}`] ?? '',
    iconFileName: data[nameMap.iconFileName] ?? '',
    description: data[nameMap.description] ?? '',
    webLink: data[`${nameMap[`webLink_${osType}`]}`] ?? '',
    bannerFileName: data[nameMap.bannerFileName] ?? ''
  }

  return map[field]
}

export const toSortByCategories = (array) => {
  const categoriesMap = new Set();
  const marketsByCategories = [];

  array.forEach((el) => categoriesMap.add(el.category));

  categoriesMap.forEach((category) => {
    const filteredMarketsByCategory = array.filter((market) => market.category === category);

    const categoryMarkets = [];

    filteredMarketsByCategory.forEach((el) => {
      categoryMarkets.push(el);
    });

    marketsByCategories.push({ category, markets: categoryMarkets });
  });

  return marketsByCategories
}

export const levelTopMarket = (data = {}, osType = '') => {
  return {
    category: fieldValue(data, 'category', osType),
    shop: fieldValue(data, 'shop', osType),
    pictureFileName: fieldValue(data, 'pictureFileName', osType),
    iconFileName: fieldValue(data, 'iconFileName', osType),
    description: fieldValue(data, 'description', osType),
    webLink: fieldValue(data, 'webLink', osType)
  }
}

export const levellAllMarket = (data = {}, osType = 'web') => {
  let market = {}

  if (osType === 'mobile') {
    market = {
      shop: fieldValue(data, 'shop', osType),
      iconFileName: fieldValue(data, 'iconFileName', osType),
      webLink: fieldValue(data, 'webLink', osType)
    }
  } else if (osType === 'web') {
    market = {
      shop: fieldValue(data, 'shop', osType),
      bannerFileName: fieldValue(data, 'bannerFileName', osType),
      webLink: fieldValue(data, 'webLink', osType)
    }
  }

  return market
}

export const levelMediumMarket = (data = {}, osType = 'web') => {
  return {
    shop: fieldValue(data, 'shop', osType),
    iconFileName: fieldValue(data, 'iconFileName', osType),
    webLink: fieldValue(data, 'webLink', osType),
    description: fieldValue(data, 'description', osType)
  }
}