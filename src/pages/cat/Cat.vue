<template>
    <div class="search-list">
        <cat-head class="header" :title="title"></cat-head>
        <div class="sort-wrapper">
            <sort class="sort"></sort>
        </div>
        <div class="wrapper" ref="wrapper">
            <goods :goodslist="goodsList"></goods>
        </div>
        <div class="bottom-tip" v-show="nodata">暂无数据</div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Goods from 'common/goods/Goods'
import CatHead from 'common/head/Head'
import BScroll from 'better-scroll'
import Sort from 'common/sort/Sort'
import Bus from '@/assets/js/eventBus'
export default {
    name: 'SearchList',
    data () {
        return {
            key: '',
            page: 1,
            goodsList: [],
            total: '',
            title: '',
            sortnumber: 1,
            cat: 0,
            nodata: false
        }
    },
    watch: {
        goodsList: function () {
            this._initScroll()
        }
    },
    created () {
        // this.key = this.$route.params.key
        // this.title = this.$route.params.title
        // console.log(this.title)
        // console.log(this.key)
        // console.log('created')
        // this.getSearchList(this.key)
        Bus.$on('sortnumber', sortnumber => {
            if (sortnumber !== this.sortnumber) {
                this.sortnumber = sortnumber 
                this.page = 1 
                this.nodata = false
                this.goodsList = []
                this.getSearchList(this.key)
            }
        })
    },
    components: {
        Goods,
        Sort,
        CatHead
    },
    methods: {
        _initScroll () {
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs['wrapper'], {
                            click: true,
                            pullUpLoad: {
                                        threshold: 50
                                    }
                        })
                        this.scroll.on('pullingUp', () => {
                            console.log('触底')
                            this.page++
                            !this.nodata && this.getSearchList(this.key)
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        getSearchList: function (key) {
            axios.get(process.env.API_ROOT + '/qingsoulist?app_key=OjRY3esp&v=1.0&sort=' + this.sortnumber + '&cat=' + this.cat + '&page=' + this.page + '&min_price=0&max_price=10000000&new=0&is_ju=0&is_ali=0&is_tqg=0')
            .then(this.handlegetSearchListSucc)  
        },
        handlegetSearchListSucc: function (res) {
            let data = res.data
            if (data.er_code === 10000) {
                if (this.page === 1) {
                    this.goodsList = data.data.list
                } else {
                    this.scroll.finishPullUp() // 告诉scroll已经加载完成
                    console.log(this.page)
                    this.goodsList.push.apply(this.goodsList, data.data.list)
                }
                this.total = data.data.total
                this.page * 100 < this.total ? (this.nodata = false) : (this.nodata = true)
                // console.log(this.goodsList)
            }
        }
    },
    mounted () {
        this._initScroll()
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
        if (from.path === '/detail') {
            // console.log('返回的的')
            to.meta.isBack = true
        } else {
            // console.log('新进入的')
            vm.cat = vm.$route.params.cat
            vm.title = vm.$route.params.title
            vm.nodata = false
            vm.page = 1
            vm.goodsList = []
            vm.getSearchList(vm.key)
        }
        })
    }
}
</script>

<style scoped lang="stylus">
    .header
        position: fixed
        top: 0
        left: 0
        right: 0
        z-index: 1000
    .sort-wrapper
        position: fixed
        top: .8rem
        left: 0
        right: 0
        z-index: 1000
    .wrapper
        position: absolute 
        top: 1.6rem
        left: 0
        bottom: 0
        right: 0
    .bottom-tip
        height: .8rem
        line-height: .8rem
        text-align: center
        font-size: .2rem
        color: #888 
        position: absolute
        bottom: 0
        width: 100%
        z-index: -1

</style>
