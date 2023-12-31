// pages/recommendSong/recommendSong.js
import request from "../../utils/request"
import PubSub from "pubsub-js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: "", //日
        month: "", //月
        recommendList: [], //推荐列表数据
        index: 0, //点击音乐的下标
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //判断用户是否登录
        let userInfo = wx.getStorageSync('userInfo')
        if (!userInfo) {
            wx.showToast({
                title: '请先登录',
                icon: "none",
                success: () => {
                    wx.navigateTo({
                        //跳转登录
                        url: '/pages/login/login',
                    })
                }
            })
        }
        //更新日期的状态
        this.setData({
            day: new Date().getDay(),
            month: new Date().getMonth() + 1
        })
        //获取每日推荐数据
        this.getRecommendList()

        //订阅来自songDetail页面发布的消息
        PubSub.subscribe("switchType", (msg, type) => {
            // console.log(msg, type);
            let {
                recommendList,
                index
            } = this.data
            if (type == "pre") {
                //上一首
                (index == 0) && (index = recommendList.length)
                index -= 1
            } else {
                //下一首
                (index == recommendList.length - 1) && (index = -1)
                index += 1
            }
            //更新对应的下标
            this.setData({
                index
            })
            let musicId = recommendList[index].id
            //将音乐ID回传给songDetail页面
            PubSub.publish("musicId", musicId)
        })
    },

    //获取用户每日推荐的数据
    async getRecommendList() {
        let recommendListData = await request("/recommend/songs")
        this.setData({
            recommendList: recommendListData.data.dailySongs
        })
    },
    //跳转至songDetail页面
    toSongDetail(e) {
        let {
            song,
            index
        } = e.currentTarget.dataset;
        this.setData({
            index
        })
        //路由跳转传参:query参数
        wx.navigateTo({
            //不能直接将song对象作为参数传递,长度过长会被截取掉
            url: '/pages/songDetail/songDetail?musicId=' + song.id,

        })
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})