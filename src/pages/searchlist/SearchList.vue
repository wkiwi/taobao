<template>
    <div class="search-list">
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
        Sort
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
            axios.get('http://openapi.qingtaoke.com/search?s_type=1&key_word=' + key + '&app_key=OjRY3esp&page=1&v=1.0&sort=' + this.sortnumber + '&page=' + this.page)
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
                console.log(this.total)
                this.page * 100 < this.total ? (this.nodata = false) : (this.nodata = true)
                console.log(this.nodata)
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
            vm.key = vm.$route.params.key
            // console.log(vm.$route.params.cat)
            if (vm.$route.params.cat) {
                vm.cat = vm.$route.params.cat
            }
            vm.page = 1 
            vm.nodata = false
            vm.goodsList = []
            vm.getSearchList(vm.key)
        }
        })
    }
}
</script>

<style scoped lang="stylus">
    .sort-wrapper
        position: fixed
        top: 0
        left: 0
        right: 0
        z-index: 1000
    .wrapper
        position: absolute 
        top: .8rem
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
