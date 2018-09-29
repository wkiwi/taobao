<template>
    <div class="parameter" ref="parameter" >
        <div class="parameter-wrapper">
            <ul>
                <li v-for="(item,index) of itemProperties" :key="index" class="item border-bottom">
                    <span class="name">{{item.name}}</span>: <span class="value">{{item.value}}</span>
                </li>
            </ul>
        </div>
        <div class="close" @click="close($event)">确定</div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
    name: 'Parameter',
    props: {
        itemProperties: {
            type: Array
        },
        listShow: {
            type: Boolean
        }
    },
    created () {
        // this._initScroll()
    },
    data () {
        return {

        }
    },
    watch: {
        listShow: function () {
            if (!this.scroll) {
                this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.parameter, {
                    click: true
                    })
                })
            } else {
                this.scroll.refresh()
            }
        }
    },
    methods: {
        _initScroll () {
            console.log(123)
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.parameter, {
                            click: true
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        close (event) {
            if (!event._constructed) {
                return
            }
            this.$emit('hide', false)
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .parameter
        position: fixed
        top: 6rem
        bottom: 0
        left: 0
        right: 0
        z-index: 500
        width: 100%
        background: #ffffff
        overflow: hidden
        .parameter-wrapper
            padding: .2rem .2rem 1rem .2rem
            .item
                font-size: .24rem
                line-height: .6rem
                &:last-child
                    &::before
                        border: none
                .name
                    color: #333
                .value
                    color: #888
        .close
            position: fixed
            bottom: 0
            left: 0
            width: 100%
            background: $RedColor
            color: #fff
            text-align: center
            line-height: 1rem
</style>
