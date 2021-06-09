const axios = require("axios");

const main = async () => {
  const data = await axios.get(
    "https://service-f973foaz-1258628808.bj.apigw.tencentcs.com/release/building/zijing01"
  );
  console.log(data);
};

main();
