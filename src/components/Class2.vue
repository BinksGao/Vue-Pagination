<template>
  <div>
    <el-table :data="lists" border="" style="width: 100%">
      <el-table-column prop="name" label="日期"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="home" label="地址"></el-table-column>
      <el-table-column prop="education" label="学历"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="danger"
            size="small"
          >删除</el-button>
        </template>
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
    let data = {
      pageIndex: 1,
      pageSize: 10,
    };
    this.getList(data);
  },
  methods: {
    getList(data) {
      axios
        .post("http://localhost:8080/list", {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
        })
        .then((res) => {
          if ((res.status = 200)) {
            this.total = res.data.data.total;
            this.lists = res.data.data.student;
          }
        });
    },
    pagechange: function(currentPage) {
      let data = {
        pageSize: 10,
        pageIndex: currentPage,
      };
      this.pageIndex = currentPage
      this.getList(data);
    },
    deleteRow(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i].id === item.id) {
              this.lists.splice(i, 1)
              this.total--
            }
            if (this.lists.length === 0) {
              let data = {
                pageSize: 10,
                pageIndex: this.pageIndex++,
              };
              this.getList(data);
            }
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>