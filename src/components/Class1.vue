<template>
    <div>
          <el-table
            :data="lists"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="日期">
            </el-table-column>
            <el-table-column
            prop="age"
            label="年龄">
            </el-table-column>
            <el-table-column
            prop="sex"
            label="性别">
            </el-table-column>
            <el-table-column
            prop="home"
            label="地址">
            </el-table-column>
            <el-table-column
            prop="education"
            label="学历">
            </el-table-column>
            <el-table-column
            label="操作">
            </el-table-column>
        </el-table>
        <v-pagination :total="total" :current-page="pageIndex" @pagechange="pagechange"></v-pagination>
    </div>
</template>

<script>
import pagination from "@/components/Page";
import { getList } from "../api/api.js";
import axios from "axios";
export default {
  components: {
    "v-pagination": pagination,
  },
  data() {
    return {
      total: 150, // 记录总条数
      pageSize: 10, // 每页显示条数
      pageIndex: 1, // 当前的页数,
      lists: [],
    };
  },
  mounted() {
    let  data = {
        pageIndex: 1, 
        pageSize: 10
    } 
    this.getList(data)
  },
  methods: {
    getList (data) {
        axios
        .post("http://localhost:8080/list", {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
        })
        .then((res) => {
          if ((res.status = 200)) {
            this.total = res.data.data.total;
            this.lists = res.data.data.student;
            console.log(this.lists)
          }
        });
    },
    pagechange: (currentPage) => {
      let data = {
          pageSize: 10,
          pageIndex: currentPage
      }
      this.getList(data)
    },
  },
};
</script>

<style scoped>
</style>