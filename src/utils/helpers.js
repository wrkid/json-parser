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
    category: data[nameMap.category] ?? '',
    shop: data[nameMap.shop] ?? '',
    pictureFileName: data[`${nameMap[`pictureFileName_${osType}`]}`] ?? '',
    iconFileName: data[nameMap.iconFileName] ?? '',
    description: data[nameMap.description] ?? '',
    webLink: data[`${nameMap[`webLink_${osType}`]}`] ?? ''
  }
}

export const levellAllMarket = (data = {}, osType = 'web') => {
  let market = {}

  if (osType === 'mobile') {
    market = {
      shop: data[nameMap.shop] ?? '',
      iconFileName: data[nameMap.iconFileName] ?? '',
      webLink: data[`${nameMap[`webLink_${osType}`]}`] ?? ''
    }
  } else if (osType === 'web') {
    market = {
      shop: data[nameMap.shop] ?? '',
      bannerFileName: data[nameMap.bannerFileName] ?? '',
      webLink: data[`${nameMap[`webLink_${osType}`]}`] ?? ''
    }
  }

  return market
}

export const levelMediumMarket = (data = {}, osType = 'web') => {
  return {
    shop: data[nameMap.shop] ?? '',
    iconFileName: data[nameMap.iconFileName] ?? '',
    webLink: data[`${nameMap[`webLink_${osType}`]}`] ?? '',
    description: data[nameMap.description] ?? ''
  }
}