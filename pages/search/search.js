// pages/search/search.js
import request from "../../utils/request"
let isSend = false //函数节流使用
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent: "", //placeholder的内容
        hotList: [], //热搜榜数据
        searchContent: "", //用户输入的表单项数据
        searchList: [], //关键字模糊匹配的数据
        historyList: [], //搜索历史记录
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取初始化数据
        this.getInitData()
        //获取历史记录
        this.getSearchHistory()
    },
    //获取初始化的数据
    async getInitData() {
        let placeholderData = await request("/search/default")
        let hotListData = await request("/search/hot/detail")
        // console.log('placeholderData: ', placeholderData);
        this.setData({
            placeholderContent: placeholderData.data.showKeyword,
            hotList: hotListData.data
        })

    },
    //表单项内容发生改变的回调
    handleInputChange(e) {
        // console.log(e);
        //更新searchContent的状态数据
        this.setData({
            searchContent: e.detail.value.trim()
        })
        if (!this.data.searchContent) {
            this.setData({
                searchList: []
            })
        }
        //函数节流
        if (isSend) return
        isSend = true
        this.getSearchList()
        setTimeout(() => {
            isSend = false
        }, 300);
    },
    //获取搜索数据的功能函数
    async getSearchList() {
        if (!this.data.searchContent) return
        let {
            searchContent,
            historyList
        } = this.data
        //发请求 获取关键字模糊匹配数据
        let searchListData = await request("/search", {
            keywords: this.data.searchContent,
            limit: 10
        })
        // console.log('searchListData: ', searchListData);
        this.setData({
            searchList: searchListData.result.songs
        })
        //将搜索的关键字添加到搜索历史记录中
        if (historyList.indexOf(searchContent) !== -1) {
            historyList.splice(historyList.indexOf(searchContent), 1)
        }
        historyList.unshift(searchContent)
        this.setData({
            historyList
        })
        wx.setStorageSync('searchHistory', historyList)
    },
    //获取本地历史记录的功能函数
    getSearchHistory() {
        let historyList = wx.getStorageSync('searchHistory')
        if (historyList) {
            this.setData({
                historyList
            })
        }
    },
    //清空搜索内容
    clearSearchContent() {
        // console.log("clear");
        this.setData({
            searchContent:"",
            searchList:[],
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