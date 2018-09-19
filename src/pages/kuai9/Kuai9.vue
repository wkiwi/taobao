<template>
    <div class="page">
        <tab></tab>
        <sort></sort>
        <div class="scroll" ref="scroll">
            <goods :goodslist="goodsList"></goods>
        </div>
        <!-- <nice-title :type="1">9kuai9</nice-title> -->
    </div>
</template>

<script type="text/ecmascript-6">
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
            goodsList: []
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
                this.getGoods()
            }
        })
        Bus.$on('cat', cat => {
            if (cat !== this.cat) {
                this.cat = cat
                this.getGoods()
            }
        })
    },
    components: {
        NiceTitle,
        Sort,
        Tab,
        Goods
    },

    methods: {
        getGoods: function () {
            axios.get('/api/Top100.json?sort=' + this.sortnumber + '&cat=' + this.cat)
            .then(this.handlegetGoods100Succ)  
        },
        handlegetGoods100Succ: function (res) {
            console.log(res.data)
            let data = res.data
            if (data.er_code === 10000) {
                this.goodsList = data.data
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
