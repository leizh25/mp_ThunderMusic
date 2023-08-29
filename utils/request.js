//发送ajax请求


/**
 * 
 * 1.封装功能函数
 *      1.功能点明确
 *      2.函数内部应该保留固定代码(静态的)
 *      3. 将动态的数据抽取成形参, 由使用者根据自身的情况动态的传入实参
 *      4.一个良好的功能函数应该设置形参的默认值(es6的形参默认值即可)
 * 
 *  2.封装功能组件
 *      1.功能点明确
 *      2.组件内部保留静态的代码
 *      3.将动态的数据抽取成props参数,由使用者自身的情况以标签属性的形式动态的传入props数据
 *      4.一个良好的组件爱你应该设置组价的必要性以数据类型
 *      props:{
 *          msg:{
 *              required:true,
 *              default:默认值,
 *              type:String
 *          }
 *      }
 */
import config from "./config"
export default (url, data = {}, method = "GET") => {
    return new Promise((resolve, reject) => {
        //1.new Promise的初始化promise实例状态为pending
        console.log("请求: ",url);
        wx.request({
            url: config.host + url,
            data,
            success: res => {
                console.log("成功");
                resolve(res.data) //修改Promise的状态为成功状态
            },
            fail: err => {
                console.log("失败 ");
                reject(err) //修改Promise的状态为失败状态
            }
        })
    })

}