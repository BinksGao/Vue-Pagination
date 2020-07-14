<template>
    <div>
        <nav>
            <ul class="pagination">
                <li>
                    <span>共{{total}}页</span>
                </li>
                <li :class="{ disabled: pageIndex == 1 }">
                    <a href="javascript:;" @click="setCurrent(pageIndex - 1)">上页</a>
                </li>
                <li :class="{ disabled: pageIndex == 1 }">
                    <a href="javascript:;" @click="setCurrent(1)">首页</a>
                </li>
                <li v-for="p in grouplist" :class="{ active: pageIndex == p.val }" :key="p.id">
                    <a href="javascript:;" @click="setCurrent(p.val)">{{ p.text }}</a>
                </li>
                <li :class="{ disabled: pageIndex == page }">
                    <a href="javascript:;" @click="setCurrent(page)">尾页</a>
                </li>
                <li :class="{ disabled: pageIndex == page }">
                    <a href="javascript:;" @click="setCurrent(pageIndex + 1)">下页</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: this.currentPage,
    };
  },
  props: {
    total: {
      // 数据总条数
      type: Number,
      default: 0,
    },
    pageSize: {
      // 每页显示条数
      type: Number,
      default: 10,
    },
    currentPage: {
      // 当前页码
      type: Number,
      default: 1,
    }, 
    pagegroup: {
      // 分页条数
      type: Number,
      default: 5,
      coerce: function(v) {
        v = v > 0 ? v : 5;
        return v % 2 === 1 ? v : v + 1;
      },
    },
  },
  computed: {
    page: function() {
      // 总页数
      return Math.ceil(this.total / this.pageSize);
    },
    grouplist: function() {
      // 获取分页页码
      var len = this.page,
        temp = [],
        list = [],
        count = Math.floor(this.pagegroup / 2),
        center = this.pageIndex;
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({ text: this.page - len, val: this.page - len });
        }
        return temp;
      }
      while (len--) {
        temp.push(this.page - len);
      }
      var idx = temp.indexOf(center);
      idx < count && (center = center + count - idx);
      this.pageIndex > this.page - count && (center = this.page - count);
      temp = temp.splice(center - count - 1, this.pagegroup);
      do {
        var t = temp.shift();
        list.push({
          text: t,
          val: t,
        });
      } while (temp.length);
      if (this.page > this.pagegroup) {
        this.pageIndex > count + 1 &&
          list.unshift({ text: "...", val: list[0].val - 1 });
        this.pageIndex < this.page - count &&
          list.push({ text: "...", val: list[list.length - 1].val + 1 });
      }
      return list;
    },
  },
  methods: {
    setCurrent: function(idx) {
      if (this.pageIndex != idx && idx > 0 && idx < this.page + 1) {
        this.pageIndex = idx;
        this.$emit("pagechange", this.pageIndex);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  overflow: hidden;
  margin: 0 auto;
  float: right;
  height: 50px;
  margin-top: 20px;
}
li {
  float: left;
  height: 30px;
  border-radius: 5px;
  margin: 3px;
  color: #666;
  list-style: none;
}
li:hover {
  background: #ccceee;
}
li:hover a {
  color: #fff;
}
span{
    line-height: 30px;
    font-size: 14px;
    
}
a {
  width: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
}
</style>
