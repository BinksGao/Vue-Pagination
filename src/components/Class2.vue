<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
     beforeRouteLeave(to, from, next) {
      if (this.change_nosave) {
        this.$confirm("您填写的内容未保存，确定离开吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          next();
        });
      } else {
        next();
      }
    },
    data () {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        change_nosave: true
      }
    }
  }
</script>

<style scoped>

</style>