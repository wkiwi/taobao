<template>
    <div class="tab border-bottom">
        <div class="menu-wrapper" ref="menu-wrapper">
            <ul class="ul" ref="menu-ul">
                <li class="menu-item " v-for="(item,index) of tabs" :key="index" @click="selectTab(index,item.cat,$event)">
                    <span class="text " :class="{'active':number == index}">{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Bus from '@/assets/js/eventBus'
export default {
    name: '',
    data () {
        return {
            number: 0,
            tabs: [{'name': '精选', 'cat': '0'}, {'name': '女装', 'cat': '10'}, {'name': '男装', 'cat': '12'}, {'name': '鞋包配饰', 'cat': '5'}, {'name': '美妆', 'cat': '3'}, {'name': '母婴', 'cat': '2'}, {'name': '美食', 'cat': '6'}, {'name': '内衣', 'cat': '11'}, {'name': '数码家电', 'cat': '8'}, {'name': '鞋包配饰', 'cat': '5'}, {'name': '文体车品', 'cat': '7'}, {'name': '其他', 'cat': '9'}]
        }
    },
    components: {

    },
    mounted () {
        this._initTab()
    },
    methods: {
        _initTab () {
            this.$nextTick(() => {
                let ul = this.$refs['menu-ul']
                let lis = ul.getElementsByTagName('li') 
                console.log(lis)
                let width = 0
                for (let i = 0; i < lis.length; i++) {
                    width += lis[i].clientWidth
                }
                console.log(width)
                ul.style.width = parseInt(width) + 'px'
                if (!this.scrollTab) {
                        this.scrollTab = new BScroll(this.$refs['menu-wrapper'], {
                            click: true,
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        })
                } else {
                    this.scrollTab.refresh()
                }
            })
        },
        selectTab (index, cat, event) {
            // better-scroll 可以监听到此事件，浏览器原生不能监听到  防止pc端出现两次点击
            if (!event._constructed) {
                return
            }
            this.number = index
            console.log(cat)
            Bus.$emit('cat', cat)
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .tab
        width: 100%
        height: .8rem
        line-height: .8rem
        box-sizing: border-box
        padding: 0 .3rem 
        overflow: hidden
        font-size: .28rem
        background: #fff
        .menu-wrapper
            height: .8rem
            .ul
                height: .8rem
                .menu-item
                    float: left
                    padding: 0 .3rem
                    .text
                        display: block
                        height: .7rem
                        &.active
                            color: $RedColor
                            font-weight: 700
                            border-bottom: 2px solid  $RedColor
    .tab-content
        width: 100%
        overflow: hidden
</style>
