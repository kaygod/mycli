const inquirer = require('inquirer');
const { download } = require("../download");
const { updatePackage } = require("../updatePackage");
const { start } = require("../startProject");
const path = require("path");
const { config } = require("../repo");

async function createProject(appName,options){

    const prompList = [
        {
            type: 'input',
            name: 'description',
            message: '请输入项目描述信息:',
        }
    ];

    let template_name;

    if(!options.template){
        prompList.push({
            type:"list",
            message:"请选择一个模板下载:",
            name:"template_name",
            choices:Object.keys(config)
        })
    }

    const { template_name:template_value ,description } = await inquirer.prompt(prompList);

    if(options.template){
        template_name = options.template;
    }else{
        template_name = template_value;
    }

    const project_dir = path.join(process.cwd(),appName); //新键项目的路径

    try {
        await download(template_name,project_dir);
        await updatePackage(project_dir,{name:appName,description,template:template_name}); //修改package.json
        start(project_dir,template_name);// 启动项目    
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = createProject;