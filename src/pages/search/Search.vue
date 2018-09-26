<template>
    <div class="search">
        <div class="search-header">
            <router-link to="/" tag="i" class="icon-4 font" ></router-link>
            <div class="input-wrapper">
                <i class="icon-16 search-icon"></i>
                <input class="input" type="text" placeholder="请输入要搜索的内容" v-model="searchvalue">
            </div>
            <span class="btn" @click="search">搜索</span>
        </div>
        <div class="search-content">
            <div class="list">
  				<div class="title" v-if="historyKey.length > 0" >
                      <h5 class="left">历史搜索</h5>
                      <h5 class="right" @click="clearkey()">清空</h5>	
                </div>
  				<div class="keyword"  v-if="historyKey.length > 0">
  				    <span  v-for="(it,index) of historyKey" @click="searchkey(it)" :key="index">{{it}}</span>
  		        </div>
  			</div>
  			<div class="list">
  				<h5>热门推荐</h5>
  				<div class="keyword" id="key">
  				<span v-for="(item,index) of keyword" @click="searchkey(item.word)" :key="index" >{{item.word}}</span>
  				</div>
  			</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import {saveKeyToLocal, loadKeyFromLocal, clearKeyToLocal} from '@/assets/js/Store'
export default {
    name: 'Search',
    data () {
        return {
            searchvalue: '',
            history_title: 1,
            historyKey: [],
            keyword: []
        }
    },
    created () {
        this.loadekey()
        this.getHotKeyWords()
    },
    methods: {
        clearkey: function () {
            clearKeyToLocal('keywords', '清除')
            this.loadekey()
        },
        searchkey: function (key) {
            saveKeyToLocal('keywords', key)
            this.loadekey()
            this.$router.push({name: 'SearchList', params: {'key': key}})
        },
        search: function () {
            this.searchvalue !== '' && this.searchvalue !== undefined && this.searchvalue !== null && saveKeyToLocal('keywords', this.searchvalue)
            this.loadekey()
            this.$router.push({name: 'SearchList', params: {'key': this.searchvalue}})
        },
        loadekey: function () {
            let keywords = loadKeyFromLocal('keywords', [])
            this.historyKey = keywords
            console.log(keywords)
        },
        getHotKeyWords: function () {
            axios.get('http://openapi.qingtaoke.com/hot?app_key=OjRY3esp&v=1.0&t=1')
            .then(this.handlegetHotKeyWordsSucc)  
        },
        handlegetHotKeyWordsSucc: function (res) {
            let data = res.data
            if (data.er_code === 10000) {
                this.keyword = data.data.slice(0, 20)
            }
        }
    }
}
</script>

<style scoped lang="stylus">
    .search
        .search-header
            height: .8rem
            width: 100%
            background: #f5f5f5
            display: flex
            .font
                line-height: .8rem
                padding: 0 .2rem
            .btn
                padding: .2rem
                line-height: .4rem
            .input-wrapper
                flex:  1
                margin: .1rem  0  .1rem  0
                padding-left: .6rem
                background: #fff
                position: relative
                border-radius: .08rem
                overflow: hidden
                .search-icon
                    position: absolute 
                    top: 50%
                    width: .28rem
                    height: .28rem
                    top: .15rem
                    left: .2rem
                .input
                    width: 100%
                    height: 100%
                    border: none
                    outline: none
                    &:focus
                        border: none
        .search-content
            padding: .1rem .2rem
            .list
                overflow:hidden
                margin-bottom: .4rem
                font-size: .2rem
                .title
                    overflow: hidden
                    margin: .2rem 0
                    .left
                        float: left 
                    .right
                        float: right
                .keyword
                    span 
                        background-color:#eee
                        margin: .2rem .14rem 0 0
                        padding:0.08rem 0.15rem
                        float:left
                        border-radius: .1rem
                        color:#000
                        font-size: .16rem
            
</style>
