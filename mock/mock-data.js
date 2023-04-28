const axios = require('axios');

const YOUR_AUTHORIZATION_TOKEN = 'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJhdXRob3JpdGllc1wiOltcIjFcIl0sXCJpZFwiOjEsXCJ1c2VyVHlwZVwiOlwiQURNSU5cIixcInVzZXJuYW1lXCI6XCJyb290XCJ9IiwiY3JlYXRlZCI6MTY4MjM4OTA5MzQ2NywiZXhwIjoxNjgyOTkzODkzfQ.kJLPqHpz7TKp9eYsUlaX7jTebck6cnbQszMSXMvzKUfhouAMlZbLB_UMSDUbTRm40YwKdTg_kPDwE-VkNmmv7w';

const catSpecies = [
  {
    averageWeight: 4.5,
    coatLength: "10~20",
    color: "棕色、黑色",
    countryOfOrigin: "美国",
    lifeExpectancy: 12,
    speciesDescription: "美国短毛猫是一种中等体型的猫，体型健壮，毛发短而密，毛色多为棕色或黑色。",
    speciesName: "美国短毛猫",
    temperament: "温顺、友善、喜欢互动、对主人依赖、对陌生人有警觉",
  },
  {
    averageWeight: 3,
    coatLength: "15~25",
    color: "白色、黑色、橘色",
    countryOfOrigin: "土耳其",
    lifeExpectancy: 14,
    speciesDescription: "土耳其安哥拉猫是一种小型猫，拥有柔软的长毛和丰富的白、黑、橘色等毛色。",
    speciesName: "土耳其安哥拉猫",
    temperament: "活泼、善良、适应性强、对主人依赖、喜欢互动",
  },
];


async function addCatSpecies(cat) {
  try {
    const response = await axios.post('http://39.104.55.195:10001/imiao-cat/cat-species/add-new', null, {
      params: {
        averageWeight: cat.averageWeight,
        coatLength: cat.coatLength,
        color: cat.color,
        countryOfOrigin: cat.countryOfOrigin,
        lifeExpectancy: cat.lifeExpectancy,
        speciesDescription: cat.speciesDescription,
        speciesName: cat.speciesName,
        temperament: cat.temperament,
      },
      headers: {
        'Authorization': YOUR_AUTHORIZATION_TOKEN,
      },
    });
    console.log(`添加成功: ${cat.speciesName}`);
  } catch (error) {
    console.error(`添加失败: ${cat.speciesName} - 错误: ${error.message}`);
  }
}

async function addAllCatSpecies() {
  for (const cat of catSpecies) {
    await addCatSpecies(cat);
  }
  console.log('所有猫品种已添加');
}

addAllCatSpecies();
