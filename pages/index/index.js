import request from "../../utils/request"

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [], //轮播图数据
        recommendList: [], //推荐歌单
        topList: [], //排行榜数据,
        // playList: [], //歌单详情
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const bannerListData = await request("/banner", {
            type: 2
        })
        this.setData({
            bannerList: bannerListData
        })

        //获取推荐歌单
        const recommendList = await request("/personalized", {
            limit: 10
        })
        this.setData({
            recommendList: recommendList.result
        })

        //获取排行榜数据
        request("/toplist").then(res => {
            // console.log("res.list.slice(0, 5): ", res.list.slice(0, 5));
            return (res.list.slice(0, 5))
        }).then(res => {
            let promiseAll = []
            res.forEach(item => {
                promiseAll.push(request("/playlist/detail", {
                    id: item.id
                }).then(list => {
                    return list.playlist
                }))
            })
            return Promise.all(promiseAll)
        }).then(list => {
            // console.log('list: ', list);
            let topList = []
            list.forEach(item => {
                let topListItem = {
                    name: item.name,
                    tracks: item.tracks.slice(0, 3)
                }
                this.setData({
                    topList: this.data.topList.concat(topListItem)
                })

            })

        }).catch(e => {
            console.log(e);
        })
        /**
         * 需求分析:
         *  1.需要根据idx的值获取对应的数据
         *  2.idx的取值范围是0-20, 我们需要0-4
         *  3.发送5次请求
         */
    },
    //每日推荐  跳转至recommendSong回调
    toRecommendSong(){
        wx.navigateTo({
          url: '/pages/recommendSong/recommendSong',
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