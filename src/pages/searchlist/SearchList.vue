<template>
    <div class="search-list">
        <div class="sort-wrapper">
            <sort class="sort"></sort>
        </div>
        <div class="wrapper" ref="wrapper">
            <goods :goodslist="goodsList"></goods>
        </div>
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
            sortnumber: 1
        }
    },
    watch: {
        goodsList: function () {
            this._initScroll()
        }
    },
    created () {
        this.key = this.$route.params.key
        // this.title = this.$route.params.title
        // console.log(this.title)
        console.log(this.key)
        this.getSearchList(this.key)
        Bus.$on('sortnumber', sortnumber => {
            if (sortnumber !== this.sortnumber) {
                this.sortnumber = sortnumber 
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
                            click: true
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        getSearchList: function (key) {
            axios.get('http://openapi.qingtaoke.com/search?s_type=1&key_word=' + key + '&app_key=OjRY3esp&page=1&v=1.0&sort=' + this.sortnumber)
            .then(this.handlegetSearchListSucc)  
        },
        handlegetSearchListSucc: function (res) {
            let data = res.data
            if (data.er_code === 10000) {
                this.goodsList = data.data.list
                this.total = data.data.total
                console.log(this.goodsList)
            }
        }
    },
    mounted () {
        this._initScroll()
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

</style>
