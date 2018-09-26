<template>
    <div class="page">
        <tab></tab>
        <sort></sort>
        <div class="scroll" ref="scroll">
            <goods :goodslist="goodsList"></goods>
        </div>
        <!-- <nice-title :type="1">9kuai9</nice-title> -->
        <tab-bar></tab-bar>
    </div>
</template>

<script type="text/ecmascript-6">
import TabBar from '../tabBar/TabBar'
import axios from 'axios'
import BScroll from 'better-scroll'
import NiceTitle from 'common/nicetitle/NiceTitle'
import Goods from 'common/goods/Goods'
import Sort from 'common/sort/Sort'
import Tab from 'common/tab/Tab'
import Bus from '@/assets/js/eventBus'
export default {
    name: 'kuai9',
    data () {
        return {
            sortnumber: 1,
            cat: 0,
            goodsList: [],
            page: 1
        }
    },
    watch: {
        goodsList: function () {
            this._initScroll()
        }
    },
    created () {
        this.getGoods()
        /* 获取子组件的selectType的更新 */
        Bus.$on('sortnumber', sortnumber => {
            if (sortnumber !== this.sortnumber) {
                this.sortnumber = sortnumber 
                this.goodsList = []
                this.getGoods()
            }
        })
        Bus.$on('cat', cat => {
            if (cat !== this.cat) {
                this.cat = cat
                this.goodsList = []
                this.getGoods()
            }
        })
    },
    components: {
        NiceTitle,
        Sort,
        Tab,
        Goods,
        TabBar
    },

    methods: {
        getGoods: function () {
            axios.get('http://openapi.qingtaoke.com/qingsoulist?app_key=OjRY3esp&v=1.0&max_price=10&sort=' + this.sortnumber + '&cat=' + this.cat + '&page=' + this.page)
            .then(this.handlegetGoods100Succ)  
        },
        handlegetGoods100Succ: function (res) {
            console.log(res.data)
            let data = res.data
            if (data.er_code === 10000 && data.data.list) {
                this.goodsList = data.data.list
            }
        },
        _initScroll () {
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.scroll, {
                            click: true
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        }
    },
    mounted () {
        this._initScroll()
    }
}
</script>

<style scoped lang="stylus">
    .page
        .scroll
            position: absolute
            width: 100%
            top: 1.55rem
            left: 0
            bottom: 1rem
            z-index: -1
            .bottom-tip
                height: .8rem
                line-height: .8rem
                text-align: center
                font-size: .2rem
                color: #888 
</style>
