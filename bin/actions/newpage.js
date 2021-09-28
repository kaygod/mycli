const Mustache = require('mustache');
const path = require("path");
const fse = require("fs-extra");

/**
 * 创建新页面
 */
async function newPage(page_name){ //创建的页面名称
  try {
    const packageJson = await fse.readFile("./package.json");
    const { template } = JSON.parse(packageJson.toString());// 获取模板名称
    const fn = eval(`${template}Handler`);
    fn && fn(page_name,template);
  } catch (error) {
     console.log("\n请在项目根路径下执行此命令!\n");
     throw error;
  }
}

/**
 * 创建vue模板的新页面
 */
const vue3Handler = async (page_name,template)=>{
  console.log(path.join(__dirname,`../template/${template}/index`));
  let template_content =  await fse.readFile(path.join(__dirname,`../template/${template}/index`));
  template_content = template_content.toString();
  const result = Mustache.render(template_content,{
    page_name
  });
  //开始创建文件 
  await fse.writeFile(path.join("./src/views",`${page_name}.vue`), result);
  console.log("\n页面创建成功!\n");
} 


module.exports = newPage;