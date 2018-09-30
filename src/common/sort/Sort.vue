<template>
    <div class="sort border-bottom">
        <ul class="sort-wrapper">
            <li @click="_sort(1,$event)" class="item" :class="{'active':type == 1}">综合 <span class="btn"><i class="font icon--1" :class="{'active':sort == true}"></i><i class="font icon--" :class="{'active':sort == false}"></i></span></li>
            <li @click="_sort(2,$event)" class="item" :class="{'active':type == 2}">销量 <span class="btn"><i class="font icon--1" :class="{'active':sort == true}"></i><i class="font icon--" :class="{'active':sort == false}"></i></span></li>
            <li @click="_sort(3,$event)" class="item" :class="{'active':type == 3}">最新 <span class="btn"><i class="font icon--1" :class="{'active':sort == true}"></i><i class="font icon--" :class="{'active':sort == false}"></i></span></li>
            <li @click="_sort(4,$event)" class="item" :class="{'active':type == 4}">价格 <span class="btn"><i class="font icon--1" :class="{'active':sort == true}"></i><i class="font icon--" :class="{'active':sort == false}"></i></span></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import Bus from '@/assets/js/eventBus'
export default {
    name: 'Sort',
    data () {
        return {
            type: 1, /* 按钮类型 */
            sort: false, /* 升降类型 */
            index: 1 /* 缓存上次按钮类型 */
           /* sortnumber: 1  真实接口需要的数据 */
        }
    },
    computed: {
        sortnumber () {
            let i = 1
            if (this.type === 1) {
                this.sort === true ? i = 8 : i = 1
            } else if (this.type === 2) {
                 i = 3
            } else if (this.type === 3) {
                this.sort === true ? i = 9 : i = 2
            } else if (this.type === 4) {
                this.sort === true ? i = 4 : i = 7
            }
            // console.log(i)
            return i
        }
    },
    methods: {
        _sort (type, event) {
            // if (!event._constructed) {
            //     return
            // }
            if (this.index !== type) { // 点击同一按钮 切换排序方式
                this.type = type
                this.index = type
            } else {
                this.sort = !this.sort
            }
            Bus.$emit('sortnumber', this.sortnumber)
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .sort
        height: .75rem
        line-height: .75rem
        background: #fff
        .sort-wrapper
            display: flex
            .item
                flex: 4
                text-align: center
                &.active
                    color: $RedColor
                    .font
                        &.active
                            color: $RedColor
                .btn
                    position: relative
                    font-size: .2rem
                    display: inline-block
                    vertical-align: middle
                    color: #888
                    .font 
                        display: block
                        width: .2rem
                        height: .2rem
</style>
