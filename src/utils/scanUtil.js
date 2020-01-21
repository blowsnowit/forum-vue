
/**
 * 扫描导入
 * @param files 扫描的文件列表。
 * @param exclude 排除的文件目录
 * @param isUpperCase 是否首字母大写
 */
export const requireContextDo = (files,exclude=[],isUpperCase=true) => {
  const modules = {};
  for (let key of files.keys()){
    if (exclude.includes(key)) continue;
    let module = files(key).default || files(key);
    //获取模块名称
    let arr = key.split("/");
    let name = module.name || arr[arr.length - 2];
    if (isUpperCase){
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    modules[name] = module;
  }
  return modules;
}
